<?php
//
// Name: Forms
// Author: Graffino (http://www.graffino.com)
//

// Get GET var
function get_get_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

    if ( isset( $_GET[$var] ) && !empty( $_GET[$var] ) ) {
        $get_var = filter_var ( $_GET[$var], $filter );
    } elseif ( empty( $_GET[$var] ) ) {
        $get_var = $empty;
    } else {
        $get_var = $default;
    }

    return $get_var;
}

// Get POST var
function get_post_var( $var, $default = false, $empty = false, $filter = FILTER_SANITIZE_STRING ) {

    if ( isset( $_POST[$var] ) ) {
        if ( $filter == 'ARRAY' ) {
          $post_var = $_POST[$var];
        } else {
          $post_var = filter_var ( $_POST[$var], $filter );
        }
    } elseif ( empty( $_POST[$var] ) ) {
        $post_var = $empty;
    } else {
        $post_var = $default;
    }

    return $post_var;
}

// Check for post
add_action( 'init', 'check_for_post' );
function check_for_post() {
    // Form type
    $form_type = get_post_var( 'form_type' );
    $anti_spam = get_post_var( 'email_v', true, false );


    // If anti-span is empty
    if ( !$anti_spam ) {
        // Check form type
        switch ( $form_type ) {
            case 'contact':
                // Vars
                $contactName = get_post_var( 'contact_name' );
                $contactEmail = get_post_var( 'contact_email', false, false, FILTER_VALIDATE_EMAIL );
                $contactMessage = get_post_var( 'contact_message' );

                if ( $contactName && $contactEmail && $contactMessage ) {
                    echo contact_form( $contactEmail, $contactName, $contactMessage );
                    die();
                } else {
                    //This should never fire for JS enabled browers.
                    echo 'Please complete all contact fields.';
                    exit;
                }
            break;
            case 'mailchimp':
                // Vars
                $action = get_post_var( 'mailchimp_action' );
                $email = get_post_var( 'mailchimp_email', false, false, FILTER_VALIDATE_EMAIL );

                if ( $action && $email ) {
                    $result = mailchimp_form ( $action, $email );
                    echo $result;
                    die();
                } else {
                    wp_die('Please submit required fields.');
                }
            break;
        }
    } else {
        echo 'Anti-spam triggered.';
        exit;
    }
}

// Contact form
function contact_form( $contactEmail, $contactName, $contactMessage ) {

    // Set subject
    $mail_subject = "New contact request from " . $contactName;
    // Set to the defined address in ACF Generated Options
    $mail_to = get_field( 'email', 'options' );
    // Set to the default blog name
    $mail_to_name = get_field( 'name', 'options' );
    // Store sender IP
    $mail_ip = $_SERVER['REMOTE_ADDR'];
    // Generate from address
    $mail_headers = "From: {$contactName} <{$contactEmail}>";
    // Generate body
    $mail_body = <<<EOT
Hello,

This is an automated message generated via {$mail_to_name} website.

Message content:
===================================================

Name: {$contactName}
E-mail: {$contactEmail}

Message:
{$contactMessage}

Have a nice day!

===================================================
IP address used to send this message: {$mail_ip}

EOT;
    // Send it via WP Mailer
    return wp_mail( $mail_to, $mail_subject, $mail_body, $mail_headers );
}

// Mailchimp form
function mailchimp_form( $action, $email ) {
    // Generate URL
    $url = urldecode( $action );
    $url = $url . '&EMAIL=' . urlencode( $email ) . '&amp;c=?';

    //  Initiate curl
    $ch = curl_init();
    // Disable SSL verification
    curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
    // Will return the response, if false it print the response
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
    // Set the url
    curl_setopt( $ch, CURLOPT_URL, $url );
    // Execute
    $result = curl_exec( $ch );
    // Closing
    curl_close( $ch );

    return $result;
}
