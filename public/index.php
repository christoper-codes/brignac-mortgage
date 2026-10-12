<?php

use Illuminate\Http\Request;

// This app (and laravel/framework's own bundled config/database.php, merged in automatically as
// defaults by its DatabaseServiceProvider on every request) still uses the PDO::MYSQL_ATTR_SSL_CA
// constant PHP 8.5 deprecated in favor of Pdo\Mysql::ATTR_SSL_CA. The framework-side one can't be
// fixed here — editing vendor/ doesn't stick past the next `composer install` — so deprecation
// notices are just hidden from output; everything else (warnings, errors) still shows normally.
error_reporting(E_ALL & ~E_DEPRECATED);

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
