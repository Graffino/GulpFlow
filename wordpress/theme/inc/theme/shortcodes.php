<?php
//
// Name: Remove Admin Bar
// Author: Graffino (http://www.graffino.com)
//


// Icon Shortcode
function icon_shortcode( $atts ) {

  // Attributes
  $atts = shortcode_atts(
    array(
      'name' => '',
    ),
    $atts,
    'icon'
  );

  return '<span class="icon -' . $atts['name'] . '"></span>';

}
add_shortcode( 'icon', 'icon_shortcode' );

// Strong text Shortcode
function strong_text_shortcode( $atts , $content = null ) {

  return '<strong>' . $content . '</strong>';

}
add_shortcode( 'bold', 'strong_text_shortcode' );

// Emphasized text Shortcode
function emphasized_text_shortcode( $atts , $content = null ) {

  return '<em>' . $content . '</em>';

}
add_shortcode( 'italic', 'emphasized_text_shortcode' );

// Emphasized text Shortcode
function newline_shortcode( $atts ) {

  return '<br />';

}
add_shortcode( 'newline', 'newline_shortcode' );
