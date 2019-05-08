<?php
/*
Plugin Name: SaFly Curl Patch
Plugin URI: https://www.safly.org
Description: A plug-in which helps you solve the problems like 'WordPress could not establish a secure connection to WordPress.org.' caused by PHP Curl.
Version: 1.0.0
Author: SaFly Organization
Author URI: https://blog.safly.org
License: MPL 2.0
Copyright: 2011-2018 SaFly Organization, Inc.
*/

/*
This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
Copyright 2011-2018 SaFly Organization, Inc.
*/

// Make sure we don't expose any info if called directly
if (!function_exists('add_action')) {
	echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
	exit;
}

define('SCP_INC', 'safly', TRUE);
define('SCP_DIR', plugin_dir_path(__FILE__));
define('SCP_URL', plugin_dir_url(__FILE__));
define('SCP_Cache', WP_CONTENT_DIR . '/cache/safly');

$scp_today = date('Y-m-d');
$scp_custom_curl_resolve_cache = SCP_Cache . '/safly-curl-patch/' . $scp_today . '.txt';
if (file_exists($scp_custom_curl_resolve_cache)) {
	$scp_custom_curl_resolve = unserialize(file_get_contents($scp_custom_curl_resolve_cache));
}else {
	$scp_custom_curl_resolve = array(
		'api.wordpress.org:80:'        . SCP_Gethostbyname('api.wordpress.org'), 
		'api.wordpress.org:443:'       . SCP_Gethostbyname('api.wordpress.org'), 
		'downloads.wordpress.org:80:'  . SCP_Gethostbyname('downloads.wordpress.org'),
		'downloads.wordpress.org:443:' . SCP_Gethostbyname('downloads.wordpress.org')
	);
	SCP_Create_Dir(SCP_Cache . '/safly-curl-patch');
	file_put_contents($scp_custom_curl_resolve_cache, serialize($scp_custom_curl_resolve));
}

$if_scp_custom_curl_resolve = TRUE;
foreach ($scp_custom_curl_resolve as $value) {
	$value = explode(':', $value);
	if (!filter_var($value['2'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
		$if_scp_custom_curl_resolve = FALSE;
		break;
	}
}
$GLOBALS['scp_custom_curl_resolve'] = $scp_custom_curl_resolve;
if ($if_scp_custom_curl_resolve) {
	add_action('http_api_curl', 'SCP_Custom_Curl_Resolve', 10, 3);
}

function SCP_Custom_Curl_Resolve($handle, $r, $url)
{
	curl_setopt($handle, CURLOPT_RESOLVE, $GLOBALS['scp_custom_curl_resolve']);
	if (strstr($url, 'wordpress')) {
		curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, FALSE);
	}
}

function SCP_Gethostbyname($domain)
{
	//Http DNS service of Tencent company
	$ip = wp_remote_retrieve_body(wp_remote_get('http://119.29.29.29/d?dn=' . $domain));
	$ip = explode(';', $ip);
	foreach ($ip as $value) {
		if (filter_var($value, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
			return $value;
		}
	}
	return gethostbyname($domain);
}

function SCP_Create_Dir($path, $permission = 0755)
{
	if (!file_exists($path)) {
		SCP_Create_Dir(dirname($path));
		mkdir($path, $permission);
	}
}

?>