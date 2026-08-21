<?php
// Almacen compartido del listado de resenas de la zona privada.
//
// POR QUE LOS DATOS NO ESTAN EN ESTA CARPETA:
// el deploy por git BORRA el directorio web entero antes de subir el build.
// Medido el 21-ago-2026: un fichero guardado aqui dentro desaparecio en el
// siguiente push. Los datos viven en 'datos-afondo', un directorio hermano
// del directorio web, que sobrevive al deploy y ademas NO es accesible desde
// internet: nombres y telefonos de clientes solo se leen por este fichero.
//
// El acceso lo protege el mismo codigo de la zona privada. Eso deja fuera a
// cualquiera que llegue por casualidad, pero no a quien lea el JavaScript de
// la web: ahi el codigo va escrito. Es el mismo nivel de proteccion que ya
// tenia la pantalla, ni mas ni menos.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

const CODIGO         = 'Jaimitopiensa';
const MAX_CUERPO     = 1048576; // 1 MB
const MAX_ENTRADAS   = 2000;
const MAX_BORRADOS   = 4000;
const MAX_CAMPO      = 200;
const MAX_POR_TANDA  = 500;

function salir(int $estado, array $cuerpo): void
{
    http_response_code($estado);
    echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Texto de cliente: valido en UTF-8, sin bytes nulos y recortado.
function texto(mixed $v): ?string
{
    if (!is_string($v)) return null;
    if (strpos($v, "\0") !== false) return null;
    if (!preg_match('//u', $v)) return null; // UTF-8 roto
    $v = trim($v);
    return mb_substr($v, 0, MAX_CAMPO, 'UTF-8');
}

function saneaEntrada(mixed $e): ?array
{
    if (!is_array($e)) return null;

    $id = $e['id'] ?? null;
    if (!is_string($id) || !preg_match('/^[A-Za-z0-9._-]{1,64}$/', $id)) return null;

    $fecha = $e['fechaISO'] ?? null;
    if (!is_string($fecha) || !preg_match('/^\d{4}-\d{2}-\d{2}T[\d:.]{5,15}Z?$/', $fecha)) return null;

    $tel = $e['telefonoNormalizado'] ?? null;
    if (!is_string($tel) || !preg_match('/^\d{6,20}$/', $tel)) return null;

    $campos = [];
    foreach (['nombre', 'negocio', 'telefono', 'servicio'] as $c) {
        $v = texto($e[$c] ?? '');
        if ($v === null) return null;
        $campos[$c] = $v;
    }

    return [
        'id'                  => $id,
        'nombre'              => $campos['nombre'],
        'negocio'             => $campos['negocio'],
        'telefono'            => $campos['telefono'],
        'telefonoNormalizado' => $tel,
        'servicio'            => $campos['servicio'],
        'fechaISO'            => $fecha,
    ];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    salir(405, ['ok' => false, 'error' => 'metodo']);
}

$crudo = file_get_contents('php://input', false, null, 0, MAX_CUERPO + 1);
if ($crudo === false || strlen($crudo) > MAX_CUERPO) {
    salir(413, ['ok' => false, 'error' => 'cuerpo']);
}

$peticion = json_decode($crudo, true);
if (!is_array($peticion)) {
    salir(400, ['ok' => false, 'error' => 'json']);
}

$codigoEnviado = $peticion['codigo'] ?? null;
if (!is_string($codigoEnviado) || !hash_equals(CODIGO, $codigoEnviado)) {
    usleep(300000); // frena el probar codigos a lo bruto
    salir(403, ['ok' => false, 'error' => 'codigo']);
}

$nuevasCrudas = is_array($peticion['nuevas'] ?? null) ? $peticion['nuevas'] : [];
$borrarCrudos = is_array($peticion['borrar'] ?? null) ? $peticion['borrar'] : [];
if (count($nuevasCrudas) > MAX_POR_TANDA || count($borrarCrudos) > MAX_POR_TANDA) {
    salir(413, ['ok' => false, 'error' => 'tanda']);
}

$dir = dirname(__DIR__) . '/datos-afondo';
if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
    salir(500, ['ok' => false, 'error' => 'directorio']);
}

$fh = @fopen($dir . '/resenas.json', 'c+');
if ($fh === false) {
    salir(500, ['ok' => false, 'error' => 'abrir']);
}
if (!flock($fh, LOCK_EX)) {
    fclose($fh);
    salir(500, ['ok' => false, 'error' => 'bloqueo']);
}

$guardado = json_decode((string) stream_get_contents($fh), true);
$entradas = is_array($guardado['entradas'] ?? null) ? $guardado['entradas'] : [];
$borrados = is_array($guardado['borrados'] ?? null) ? $guardado['borrados'] : [];

// 1) Borrados primero, y se quedan anotados: si no, el aparato que todavia
//    tenga la entrada la volveria a subir en su siguiente sincronizacion y
//    lo borrado reaparaceria solo.
foreach ($borrarCrudos as $id) {
    if (is_string($id) && preg_match('/^[A-Za-z0-9._-]{1,64}$/', $id)) {
        $borrados[] = $id;
    }
}
$borrados = array_values(array_unique($borrados));
$fuera    = array_flip($borrados);

$entradas = array_values(array_filter(
    $entradas,
    static fn($e) => is_array($e) && is_string($e['id'] ?? null) && !isset($fuera[$e['id']])
));

// 2) Altas. Se ignora lo ya borrado y lo que ya esta.
$presentes = [];
foreach ($entradas as $e) {
    $presentes[$e['id']] = true;
}
foreach ($nuevasCrudas as $cruda) {
    $entrada = saneaEntrada($cruda);
    if ($entrada === null) continue;
    if (isset($fuera[$entrada['id']]) || isset($presentes[$entrada['id']])) continue;
    $entradas[] = $entrada;
    $presentes[$entrada['id']] = true;
}

usort($entradas, static fn($a, $b) => strcmp((string) $b['fechaISO'], (string) $a['fechaISO']));
if (count($entradas) > MAX_ENTRADAS) {
    $entradas = array_slice($entradas, 0, MAX_ENTRADAS);
}
if (count($borrados) > MAX_BORRADOS) {
    $borrados = array_slice($borrados, -MAX_BORRADOS);
}

rewind($fh);
ftruncate($fh, 0);
fwrite($fh, json_encode(
    ['entradas' => $entradas, 'borrados' => $borrados],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
));
fflush($fh);
flock($fh, LOCK_UN);
fclose($fh);

salir(200, ['ok' => true, 'entradas' => $entradas]);
