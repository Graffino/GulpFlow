<?php
//
// Name: Navigation
// Author: Graffino (http://www.graffino.com)
//


/**
 * Register navigation
 */

add_action( 'init', 'register_menus' );
function register_menus() {
    register_nav_menus(
        array(
            'primary-right' => __( 'Primary Right' ),
        )
    );
}

// Get Menu Name By Theme Location
function get_menu_name( $theme_location = 'primary' ) {

	$theme_locations = get_nav_menu_locations();
	$menu_obj = get_term( $theme_locations[$theme_location], 'nav_menu' );
	$menu_name = $menu_obj->name;

	return $menu_name;
}

// Get Menu ID By Theme Location
function get_menu_id( $theme_location = 'primary' ) {

	$theme_locations = get_nav_menu_locations();
	$menu_obj = get_term( $theme_locations[$theme_location], 'nav_menu' );
	$menu_id = $menu_obj->term_id;

	return $menu_id;
}

// Highlight Custom Post Archives
add_filter( 'nav_menu_css_class', 'current_type_nav_class', 10, 2 );
function current_type_nav_class( $classes, $item ) {
    // Get post_type for this post
    $post_type = get_query_var( 'post_type' );

    // Go to Menus and add a menu class named: {custom-post-type}-menu-item
    // This adds a 'current_page_parent' class to the parent menu item
    if ( is_array( $post_type ) ) {
        foreach ($post_type as $type ) {
            if ( in_array( $type . '-nav-item', $classes ) )
            array_push( $classes, 'is-current' );

            if ( in_array( $type . '-nav-parent', $classes ) )
            array_push( $classes, 'is-current-parent' );
        }
    } else {
        if ( in_array( $post_type . '-nav-item', $classes ) )
        array_push( $classes, 'is-current' );

        if ( in_array( $post_type.'-nav-parent', $classes ) )
        array_push( $classes, 'is-current-parent' );
    }

    return $classes;
}


// Custom menu walker for main menu
class Menu_Main extends Walker_Nav_Menu {
    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        $block = isset( $args->block ) ? $args->block : explode(' ', $args->menu_class);
        $block = is_array( $block ) ? $block[0] : $block;
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"submenu\">\n";
    }

    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
       $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
       $this->prepare_el_classes( $item, $args, $depth );
       $classes = empty( $item->classes ) ? array() : (array) $item->classes;

       // Filter Classes
       $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
       $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

       $output .= $indent . '<li' . $class_names .'>';

       // Filter Attributes
       $atts = array();
       $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
       $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
       $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
       $atts['href']   = ! empty( $item->url )        ? $item->url        : '';

       $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );
       $attributes = '';
       foreach ( $atts as $attr => $value ) {
               if ( ! empty( $value ) ) {
                       $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                       $attributes .= ' ' . $attr . '="' . $value . '"';
               }
       }
       $item_output = $args->before;
       $item_output .= '<a'. $attributes .' class="nav__link">';
       $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
       $item_output .= '</a>';
       $item_output .= $args->after;

       $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    public function end_el( &$output, $item, $depth = 0, $args = array() ) {
        $output .= "</li>\n";
    }

    public function prepare_el_classes( &$item, $args = array(), $depth = 0 ) {
        $block = isset( $args->block ) ? $args->block : explode(' ', $args->menu_class);
        $block = is_array( $block ) ? $block[0] : $block;
        $classes = array( $block . '__item' );

            if ( $item->current )
              $classes[] = 'is-current';

            if ( $item->current_item_ancestor )
              $classes[] = 'is-current-ancestor';

            if ( $item->current_item_parent )
              $classes[] = 'is-current-parent';

            if ( in_array( 'current-item', (array) $item->classes ) )
                $classes[] = 'is-current';

            if ( in_array( 'menu-item-has-children', (array) $item->classes ) )
              $classes[] = 'is-parent';

            if ( in_array( 'menu', (array) $item->classes ) )
                $classes[] = $block . 'submenu';

            if ( $depth )
              $classes[] = 'is-child';

        $item->classes = $classes;
    }
}

// Custom menu walker for mobile
Custom_Post_Type_Archive_Menu_Links::init();
class Menu_Mobile extends Walker_Nav_Menu {

    public function start_lvl( &$output, $depth = 0, $args = array() ) {
        $block = isset( $args->block ) ? $args->block : explode(' ', $args->menu_class);
        $block = is_array( $block ) ? $block[0] : $block;
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"${block}__list -submenu\">\n";
    }

    public function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
       $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
       $this->prepare_el_classes( $item, $args, $depth );
       $classes = empty( $item->classes ) ? array() : (array) $item->classes;

       // Filter Classes
       $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
       $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

       $output .= $indent . '<li' . $class_names .'>';

       // Filter Attributes
       $atts = array();
       $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
       $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
       $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
       $atts['href']   = ! empty( $item->url )        ? $item->url        : '';

       $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );
       $attributes = '';
       foreach ( $atts as $attr => $value ) {
               if ( ! empty( $value ) ) {
                       $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
                       $attributes .= ' ' . $attr . '="' . $value . '"';
               }
       }
       $item_output = $args->before;
       $item_output .= '<a'. $attributes .' class="slide-nav__link">';
       $item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
       $item_output .= '</a>';
       $item_output .= $args->after;

       $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }

    public function end_el( &$output, $item, $depth = 0, $args = array() ) {
        $output .= "</li>\n";
    }

    public function prepare_el_classes( &$item, $args = array(), $depth = 0 ) {
        $block = isset( $args->block ) ? $args->block : explode(' ', $args->menu_class);
        $block = is_array( $block ) ? $block[0] : $block;
        $classes = array( $block . '__item' );

            if ( $item->current )
              $classes[] = 'is-current';

            if ( $item->current_item_ancestor )
              $classes[] = 'is-current-ancestor';

            if ( $item->current_item_parent )
              $classes[] = 'is-current-parent';

            if ( in_array( 'current-item', (array) $item->classes ) )
                $classes[] = 'is-current';

            if ( in_array( 'menu-item-has-children', (array) $item->classes ) )
              $classes[] = 'is-parent';

            if ( in_array( 'menu', (array) $item->classes ) )
                $classes[] = $block . '__list -submenu';

            if ( $depth )
              $classes[] = 'is-child';

        $item->classes = $classes;
    }
}

// Add custom post archives to navigation
class Custom_Post_Type_Archive_Menu_Links {
    public static function init(){
        // Set-up Action and Filter Hooks
        add_action( 'admin_head-nav-menus.php', array( __CLASS__, 'inject_cpt_archives_menu_meta_box' ) );
        add_filter( 'wp_get_nav_menu_items', array( __CLASS__, 'cpt_archive_menu_filter' ), 10, 3 );
    }

    // Inject cpt archives meta box
    public static function inject_cpt_archives_menu_meta_box() {
        add_meta_box( 'add-cpt', __( 'Custom Posts Archives', 'default' ), array(__CLASS__, 'wp_nav_menu_cpt_archives_meta_box'), 'nav-menus', 'side', 'default' );
    }

    // Render custom post type archives meta box
    public static function wp_nav_menu_cpt_archives_meta_box() {
        global $nav_menu_selected_id;
        // Get custom post types with archive support
        $post_types = get_post_types ( array( 'show_in_nav_menus' => true, 'has_archive' => true ), 'object' );
        // Hydrate the necessary object properties for the walker
        foreach ( $post_types as &$post_type ) {
            $post_type->classes = array();
            $post_type->type = $post_type->name;
            $post_type->object_id = $post_type->name;
            $post_type->title = $post_type->labels->name . ' ' . __( "Archive", "default" );
            $post_type->object = 'cpt-archive';
            $post_type->menu_item_parent = 0;
            $post_type->url = 0;
            $post_type->target = 0;
            $post_type->attr_title = 0;
            $post_type->xfn = 0;
            $post_type->db_id = 0;
        }
        $walker = new Walker_Nav_Menu_Checklist( array() );
    ?>
        <div id="cpt-archive" class="posttypediv">
            <div id="tabs-panel-cpt-archive" class="tabs-panel tabs-panel-active">
                <ul id="ctp-archive-checklist" class="categorychecklist form-no-clear">
                    <?= walk_nav_menu_tree( array_map( 'wp_setup_nav_menu_item', $post_types ), 0, (object) array( 'walker' => $walker) ); ?>
                </ul>
            </div><!-- /.tabs-panel -->
        </div>
        <p class="button-controls">
            <span class="add-to-menu">
                <input type="submit"<?php disabled( $nav_menu_selected_id, 0 ); ?> class="button-secondary submit-add-to-menu" value="<?php esc_attr_e( "Add to Menu" ); ?>" name="add-ctp-archive-menu-item" id="submit-cpt-archive">
            </span>
        </p>
    <?php
    }
    // Take care of the urls
    public static function cpt_archive_menu_filter( $items, $menu, $args ) {
        // Alter the URL for cpt-archive objects
        foreach ( $items as &$item ) {
            if ( $item->object != 'cpt-archive' ) continue;

            $item->url = get_post_type_archive_link( $item->type );

            // Set current
            if ( get_query_var( 'post_type' ) == $item->type ) {
                $item->classes []= 'current-item';
                $item->current = true;
            }
        }
        return $items;
    }
}
