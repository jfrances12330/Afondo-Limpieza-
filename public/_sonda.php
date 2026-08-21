<?php
// SONDA TEMPORAL — 21-ago-2026. Se retira en cuanto responda las dos preguntas:
// (1) este hosting ejecuta PHP, (2) el deploy conserva lo que no esta en el repo.
header('Content-Type: application/json; charset=utf-8');

$dir = __DIR__ . '/_datos';
$fichero = $dir . '/sonda.json';

$r = ['v' => 2, 'php' => PHP_VERSION, 'docroot' => __DIR__];

if (!is_dir($dir)) {
    $r['mkdir'] = @mkdir($dir, 0755, true);
}
$r['dir_existe'] = is_dir($dir);
$r['dir_escribible'] = is_writable($dir);

if (!file_exists($fichero)) {
    $r['escrito_ahora'] = @file_put_contents($fichero, json_encode(['creado' => date('c')]));
} else {
    $r['ya_existia'] = true;
}

$r['contenido'] = file_exists($fichero) ? json_decode(file_get_contents($fichero), true) : null;

echo json_encode($r, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
