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
    $stockists = get_post_meta($post->ID, '_igv_home_stockists', true);
    $stockists_image = get_post_meta($post->ID, '_igv_home_stockists_image_id', true);
    $editions_note = get_post_meta($post->ID, '_igv_home_editions_note', true);
?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

      <section id="top" class="margin-bottom-large">
<?php
    if (!empty($top_image)) {
?>

        <div class="grid-row justify-center margin-bottom-small">
          <div class="grid-item">
            <?php echo wp_get_attachment_image($top_image, 'height-900'); ?>
          </div>
        </div>

<?php
    }
?>
        <div class="grid-row text-align-center font-uppercase">
          <div class="grid-item item-s-12">
            <span>Made in California</span>
          </div>
        </div>
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
          <div class="grid-item item-s-12 item-m-6 text-align-center">
            <?php echo wp_get_attachment_image($middle_image_1, 'height-900'); ?>
          </div>
        <?php
          }
          if (!empty($middle_image_2)) {
        ?>
          <div class="grid-item item-s-12 item-m-6 text-align-center">
            <?php echo wp_get_attachment_image($middle_image_2, 'height-900'); ?>
          </div>
        <?php
          }
        ?>
        </div>
<?php
    }
    if (!empty($text_2)) {
?>
        <div class="grid-row margin-top-mid">
          <div class="grid-item font-size-mid">
            <?php echo apply_filters('the_content', $text_2); ?>
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
        <div class="grid-row">
          <div class="grid-item item-s-12 item-m-6 font-size-small">
            <?php echo apply_filters('the_content', $editions_note); ?>
          </div>
        </div>
<?php
      }

      while ( $edition_query->have_posts() ) {
        $edition_query->the_post();

        $edition_number = get_post_meta($post->ID, '_igv_edition_number', true);
?>
        <div class="grid-row font-uppercase">
          <div class="grid-item item-s-12 item-m-6 no-gutter">
            <?php echo the_post_thumbnail('height-900'); ?>
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
      <section id="stockists" class="margin-bottom-large font-uppercase">
        <div class="grid-row margin-bottom-tiny">
          <div class="grid-item">
            <h2>Stockists</h2>
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
              <div><span><?php echo $shop['name']; ?></span></div>
              <div><?php echo !empty($shop['map_url']) ? '<a href="' . $shop['map_url'] . '">' . apply_filters('the_content', $shop['address']) . '</a>' : apply_filters('the_content', $shop['address']); ?></div>
            </div>
          <?php
            }
          ?>
          </div>
          <div class="grid-item item-s-12 item-m-4 no-gutter align-self-end margin-top-mid">
            <?php echo wp_get_attachment_image($stockists_image, 'width-640'); ?>
          </div>
        </div>

<?php
    }
?>
      </section>

    </article>

<?php
  }
}
?>

  </div>
</main>

<?php
get_footer();
?>
