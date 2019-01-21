<?php
//
// Name: Functions file
// Author: Graffino (http://www.graffino.com)
//

// If file is accessed directly, exit
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Include files
 */

// Modules
$modules = new \FilesystemIterator( __DIR__.'/inc/theme', \FilesystemIterator::SKIP_DOTS );
try {
    foreach ( $modules as $module ) {
        ! $modules->isDir() and include $module->getRealPath();
    }
} catch( Exception $error ) {
    return $error;
}
