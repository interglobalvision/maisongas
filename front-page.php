<?php
get_header();
?>

<main id="main-content">
  <div class="container">

<?php
if (have_posts()) {
  while (have_posts()) {
    the_post();

    $top_image = get_post_meta($post->ID, '_igv_home_top_image_id', true);
    $text_1 = get_post_meta($post->ID, '_igv_home_text_1', true);
    $middle_image_1 = get_post_meta($post->ID, '_igv_home_middle_image_1_id', true);
    $middle_image_2 = get_post_meta($post->ID, '_igv_home_middle_image_2_id', true);
    $text_2 = get_post_meta($post->ID, '_igv_home_text_2', true);
    $text_3 = get_post_meta($post->ID, '_igv_home_text_3', true);
    $stockists = get_post_meta($post->ID, '_igv_home_stockists', true);
    $stockists_image = get_post_meta($post->ID, '_igv_home_stockists_image_id', true);
    $editions_note = get_post_meta($post->ID, '_igv_home_editions_note', true);
    $subheading = get_post_meta($post->ID, '_igv_home_subheading', true);
?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

      <section id="top" class="margin-bottom-large">
<?php
    if (!empty($top_image)) {
?>

        <div class="grid-row justify-center margin-bottom-small">
          <div class="grid-item">
            <?php
              if (get_post_mime_type($top_image) === 'image/gif') {
                echo wp_get_attachment_image($top_image, 'full');
              } else {
                echo wp_get_attachment_image($top_image, 'height-900');
              }
            ?>
          </div>
        </div>

<?php
    }

    if (!empty($subheading)) {
?>
        <div class="grid-row text-align-center">
          <div class="grid-item item-s-12">
            <span><?php echo $subheading; ?></span>
          </div>
        </div>
<?php
    }
?>
      </section>

      <section id="about" class="margin-bottom-large">
<?php
    if (!empty($text_1)) {
?>
        <div class="grid-row margin-bottom-mid">
          <div class="grid-item font-size-mid">
            <?php echo apply_filters('the_content', $text_1); ?>
          </div>
        </div>
<?php
    }

    if (!empty($middle_image_1) || !empty($middle_image_2)) {
?>
        <div class="grid-row align-items-center">
        <?php
          if (!empty($middle_image_1)) {
        ?>
          <div class="grid-item item-s-12 item-m-6 text-align-center margin-bottom-mid">
            <?php
              if (get_post_mime_type($middle_image_1) === 'image/gif') {
                echo wp_get_attachment_image($middle_image_1, 'full');
              } else {
                echo wp_get_attachment_image($middle_image_1, 'height-900');
              }
            ?>
          </div>
        <?php
          }
          if (!empty($middle_image_2)) {
        ?>
          <div class="grid-item item-s-12 item-m-6 text-align-center margin-bottom-mid">
            <?php
              if (get_post_mime_type($middle_image_2) === 'image/gif') {
                echo wp_get_attachment_image($middle_image_2, 'full');
              } else {
                echo wp_get_attachment_image($middle_image_2, 'height-900');
              }
            ?>
          </div>
        <?php
          }
        ?>
        </div>
<?php
    }
    if (!empty($text_2)) {
?>
        <div class="grid-row margin-top-small">
          <div class="grid-item font-size-mid">
            <?php echo apply_filters('the_content', $text_2); ?>
          </div>
        </div>
<?php
    }
    if (!empty($text_3)) {
?>
        <div class="grid-row margin-top-small">
          <div class="grid-item item-s-12 item-m-7">
            <?php echo apply_filters('the_content', $text_3); ?>
          </div>
        </div>
<?php
    }
?>
      </section>

<?php

    /*
    * EDITIONS
    */

    $args = array(
      'post_type' => array( 'edition' ),
      'posts_per_page' => '-1',
      'orderby' => 'meta_value_number',
      'meta_key' => '_igv_edition_number',
    );

    $edition_query = new WP_Query( $args );

    if ( $edition_query->have_posts() ) {
?>
      <section id="editions" class="margin-bottom-large">
<?php
      if (!empty($editions_note)) {
?>
        <div class="grid-row justify-center">
          <div class="grid-item item-s-12 margin-bottom-small">
            <h2 class="text-align-center">EDITIONS</h2>
          </div>
          <div class="grid-item item-s-12 item-m-7 text-align-center margin-bottom-small">
            <?php echo apply_filters('the_content', $editions_note); ?>
          </div>
        </div>
<?php
      }

      while ( $edition_query->have_posts() ) {
        $edition_query->the_post();

        $edition_number = get_post_meta($post->ID, '_igv_edition_number', true);
?>
        <div class="grid-row">
          <div class="grid-item item-s-12 item-m-6 no-gutter-image-holder margin-bottom-small">
            <?php
              if (get_post_mime_type(get_post_thumbnail_id()) === 'image/gif') {
                echo the_post_thumbnail('full');
              } else {
                echo the_post_thumbnail('height-900');
              }
            ?>
          </div>
          <div class="grid-item item-s-12 item-m-6">
            <div><span><?php echo !empty($edition_number) ? 'Edition ' . $edition_number : ''; ?></span></div>
            <div><?php the_content(); ?></div>
          </div>
        </div>
<?php
      }
?>
      </section>

<?php
    }

    wp_reset_postdata();

?>
      <section id="stockists" class="margin-bottom-large">
        <div class="grid-row margin-bottom-tiny">
          <div class="grid-item">
            <h2>STOCKISTS</h2>
          </div>
        </div>
<?php
    if (!empty($stockists)) {
?>

        <div class="grid-row">
          <div class="grid-item item-s-12 item-m-8 no-gutter grid-row align-content-start">
          <?php
            foreach($stockists as $shop) {
          ?>
            <div class="grid-item item-s-12 item-m-6">
              <?php echo apply_filters('the_content', $shop['address']); ?>
            </div>
          <?php
            }
          ?>
          </div>
          <div class="grid-item item-s-12 item-m-4 no-gutter-image-holder align-self-end margin-top-mid">
            <?php
              if (get_post_mime_type($stockists_image) === 'image/gif') {
                echo wp_get_attachment_image($stockists_image, 'full');
              } else {
                echo wp_get_attachment_image($stockists_image, 'width-640');
              }
            ?>
          </div>
        </div>

<?php
    }
?>
      </section>

    </article>

    <div id="honeypot-loader">
      <?php
        // this just loads the honeypot images so they're ready when triggered

        $honeypotImages = get_post_meta($post->ID, '_igv_home_honeypot_images', true);

        if (!empty($honeypotImages)) {
          foreach($honeypotImages as $key => $value) {
            echo '<img src="' . wp_get_attachment_image_url($key, 'height-900') . '" />';
          }
        }
      ?>
    </div>

<?php
  }
}
?>

  </div>
</main>

<?php
get_footer();
?>
