<?php
// SONDA TEMPORAL — 21-ago-2026. Se retira en cuanto responda.
header('Content-Type: application/json; charset=utf-8');

$r = ['v' => 4, 'php' => PHP_VERSION];

// A) dentro del directorio web (ya sabemos que el deploy lo borra)
$dentro = __DIR__ . '/_datos/sonda.json';
$r['A_dentro_existe'] = file_exists($dentro);

// B) FUERA del directorio web: el deploy no deberia tocarlo, y ademas
//    no es accesible desde internet, que es lo que queremos para los datos.
$fuera_dir = dirname(__DIR__) . '/datos-afondo';
$fuera = $fuera_dir . '/sonda.json';
$r['B_ruta'] = $fuera_dir;
if (!is_dir($fuera_dir)) {
    $r['B_mkdir'] = @mkdir($fuera_dir, 0755, true);
}
$r['B_dir_existe'] = is_dir($fuera_dir);
$r['B_escribible'] = is_dir($fuera_dir) && is_writable($fuera_dir);
if ($r['B_dir_existe'] && !file_exists($fuera)) {
    $r['B_escrito_ahora'] = @file_put_contents($fuera, json_encode(['creado' => date('c')]));
} elseif (file_exists($fuera)) {
    $r['B_ya_existia'] = true;
}
$r['B_contenido'] = file_exists($fuera) ? json_decode(file_get_contents($fuera), true) : null;

echo json_encode($r, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
