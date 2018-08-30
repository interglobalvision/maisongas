<?php
// Menu icons for Custom Post Types
// https://developer.wordpress.org/resource/dashicons/
function add_menu_icons_styles(){
?>

<style>
#menu-posts-edition .dashicons-admin-post:before {
    content: '\f330';
}
</style>

<?php
}
add_action( 'admin_head', 'add_menu_icons_styles' );


//Register Custom Post Types
add_action( 'init', 'register_cpt_edition' );

function register_cpt_edition() {

  $labels = array(
    'name' => _x( 'Editions', 'edition' ),
    'singular_name' => _x( 'Edition', 'edition' ),
    'add_new' => _x( 'Add New', 'edition' ),
    'add_new_item' => _x( 'Add New Edition', 'edition' ),
    'edit_item' => _x( 'Edit Edition', 'edition' ),
    'new_item' => _x( 'New Edition', 'edition' ),
    'view_item' => _x( 'View Edition', 'edition' ),
    'search_items' => _x( 'Search Editions', 'edition' ),
    'not_found' => _x( 'No editions found', 'edition' ),
    'not_found_in_trash' => _x( 'No editions found in Trash', 'edition' ),
    'parent_item_colon' => _x( 'Parent Edition:', 'edition' ),
    'menu_name' => _x( 'Editions', 'edition' ),
  );

  $args = array(
    'labels' => $labels,
    'hierarchical' => false,

    'supports' => array( 'title', 'editor', 'thumbnail' ),

    'public' => true,
    'show_ui' => true,
    'show_in_menu' => true,
    'menu_position' => 5,

    'show_in_nav_menus' => true,
    'publicly_queryable' => true,
    'exclude_from_search' => false,
    'has_archive' => true,
    'query_var' => true,
    'can_export' => true,
    'rewrite' => true,
    'capability_type' => 'post'
  );

  register_post_type( 'edition', $args );
}
