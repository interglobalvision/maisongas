<?php

/* Get post objects for select field options */
function get_post_objects( $query_args ) {
  $args = wp_parse_args( $query_args, array(
    'post_type' => 'post',
  ) );
  $posts = get_posts( $args );
  $post_options = array();
  if ( $posts ) {
    foreach ( $posts as $post ) {
      $post_options [ $post->ID ] = $post->post_title;
    }
  }
  return $post_options;
}


/**
 * Include and setup custom metaboxes and fields.
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Hook in and add metaboxes. Can only happen on the 'cmb2_init' hook.
 */
add_action( 'cmb2_init', 'igv_cmb_metaboxes' );
function igv_cmb_metaboxes() {

  // Start with an underscore to hide fields from custom fields list
  $prefix = '_igv_';

  /**
   * Metaboxes declarations here
   * Reference: https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php
   */

  $home_page = get_page_by_path('home');

  if(!empty($home_page)) {

    $home_metabox = new_cmb2_box( array(
      'id'            => $prefix . 'home_metabox',
      'title'         => esc_html__( 'Fields', 'cmb2' ),
      'object_types'  => array( 'page' ), // Post type
      'show_on'      => array(
        'key' => 'id',
        'value' => array($home_page->ID)
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Top Image', 'cmb2' ),
      'id'         => $prefix . 'home_top_image',
      'type'       => 'file',
      'options' => array(
        'url' => false, // Hide the text input for the url
      ),
      'query_args' => array( 'type' => 'image' ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Sub-heading', 'cmb2' ),
      'id'         => $prefix . 'home_subheading',
      'type'       => 'text',
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Text 1', 'cmb2' ),
      'id'         => $prefix . 'home_text_1',
      'type'       => 'wysiwyg',
      'options' => array(
        'media_buttons' => false, // show insert/upload button(s)
        'textarea_rows' => get_option('default_post_edit_rows', 5), // rows="..."
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Middle Image 1', 'cmb2' ),
      'id'         => $prefix . 'home_middle_image_1',
      'type'       => 'file',
      'options' => array(
        'url' => false, // Hide the text input for the url
      ),
      'query_args' => array( 'type' => 'image' ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Middle Image 2', 'cmb2' ),
      'id'         => $prefix . 'home_middle_image_2',
      'type'       => 'file',
      'options' => array(
        'url' => false, // Hide the text input for the url
      ),
      'query_args' => array( 'type' => 'image' ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Text 2', 'cmb2' ),
      'id'         => $prefix . 'home_text_2',
      'type'       => 'wysiwyg',
      'options' => array(
        'media_buttons' => false, // show insert/upload button(s)
        'textarea_rows' => get_option('default_post_edit_rows', 5), // rows="..."
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Text 3', 'cmb2' ),
      'id'         => $prefix . 'home_text_3',
      'type'       => 'wysiwyg',
      'options' => array(
        'media_buttons' => true, // show insert/upload button(s)
        'textarea_rows' => get_option('default_post_edit_rows', 5), // rows="..."
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Honeypot Images', 'cmb2' ),
      'description' => esc_html__( '<span class="honeypot">your text</span>', 'cmb2' ),
      'id'         => $prefix . 'home_honeypot_images',
      'type'       => 'file_list',
      'preview_size' => array( 150, 150 ),
      'query_args' => array( 'type' => 'image' ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Editions Note', 'cmb2' ),
      'id'         => $prefix . 'home_editions_note',
      'type'       => 'wysiwyg',
      'options' => array(
        'media_buttons' => false, // show insert/upload button(s)
        'textarea_rows' => get_option('default_post_edit_rows', 5), // rows="..."
      ),
    ) );

    $stockists_group = $home_metabox->add_field( array(
      'id'          => $prefix . 'home_stockists',
      'type'        => 'group',
      'description' => esc_html__( 'Stockists', 'cmb2' ),
      'options'     => array(
        'group_title'   => esc_html__( 'Stockist {#}', 'cmb2' ), // {#} gets replaced by row number
        'add_button'    => esc_html__( 'Add Another Stockist', 'cmb2' ),
        'remove_button' => esc_html__( 'Remove Stockist', 'cmb2' ),
        'sortable'      => true, // beta
        // 'closed'     => true, // true to have the groups closed by default
      ),
    ) );

    $home_metabox->add_group_field( $stockists_group, array(
      'name'       => esc_html__( 'Stockist', 'cmb2' ),
      'id'         => 'address',
      'type'       => 'wysiwyg',
      'description' => esc_html__( 'Telephone links use tel:5555555555', 'cmb2' ),
      'options' => array(
        'media_buttons' => false, // show insert/upload button(s)
        'textarea_rows' => get_option('default_post_edit_rows', 5), // rows="..."
      ),
    ) );

    $home_metabox->add_field( array(
      'name'       => esc_html__( 'Stockists Image', 'cmb2' ),
      'id'         => $prefix . 'home_stockists_image',
      'type'       => 'file',
      'options' => array(
        'url' => false, // Hide the text input for the url
      ),
      'query_args' => array( 'type' => 'image' ),
    ) );
  }

  $edition_metabox = new_cmb2_box( array(
    'id'            => $prefix . 'edition_metabox',
    'title'         => esc_html__( 'Fields', 'cmb2' ),
    'object_types'  => array( 'edition' ), // Post type
  ) );

  $edition_metabox->add_field( array(
    'name'       => esc_html__( 'Number', 'cmb2' ),
    'id'         => $prefix . 'edition_number',
    'type'       => 'text_small',
  ) );
}
?>
