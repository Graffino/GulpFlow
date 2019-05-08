=== SaFly Curl Patch ===
Contributors: safly
Tags: curl,connection,wordpress,inet6,ipv6,openbsd,unexpected,error
Requires at least: 4.0
Tested up to: 4.9.4
Stable tag: 1.0.0
License: MPL 2.0
License URI: http://mozilla.org/MPL/2.0/

A plug-in which helps you solve the problems like 'WordPress could not establish a secure connection to WordPress.org.' caused by PHP Curl.

== Description ==

A plug-in which helps you solve the problems like 'WordPress could not establish a secure connection to WordPress.org.' caused by PHP Curl.
Sometimes the setting of network is complicated and uncontrollable, and users may meet the problems like 'WordPress could not establish a secure connection to WordPress.org.' while downloading themes, plug-ins and updating the WordPress. And this plug-in could help fix most of the problems.
Topic related: https://wordpress.org/support/topic/error-wordpress-could-not-establish-a-secure-connection-to-wordpress-org/
And thanks to Samuel Wood (https://wordpress.org/support/users/otto42/) and Steve Stern (https://wordpress.org/support/users/sterndata/).

Thrid party service we use:
We use free Http DNS service of Tencent company to resolve domain more accurately and avoid domain hijacking, and we just send the domain to 119.29.29.29 and fetch the resolve result. We respect your privacy and you can clearly figure out how the function SCP_Gethostbyname which is involved in the third party service works via its source code.

== Installation ==

The easy way:
1. Go to the Plugins Menu in WordPress
2. Search for "SaFly Curl Patch"
3. Click "Install"

The not so easy way:
1. Upload the ml-slider folder to the /wp-content/plugins/ directory
2. Activate the plug-in through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= How to use SaFly Curl Patch? =

Just enable the plug-in and enjoy it.

= How can I configure SaFly Curl Patch? =

There is no setting page and all things will be done automatically, just enjoy it. If you meet any other problems relating to 'The connection to WordPress.org', you can mail to service@safly.org to get some help.

== Changelog ==

= 1.0 =
* Construct the basic framework
