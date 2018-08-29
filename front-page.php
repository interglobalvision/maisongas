<?php
get_header();
?>

<main id="main-content">
  <section id="posts">
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
?>

      <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

<?php
    if (!empty($top_image)) {
?>
        <div class="grid-row">
          <div class="grid-item">
            <?php echo wp_get_attachment_image($top_image); ?>
          </div>
        </div>
<?php
    }
    if (!empty($text_1)) {
?>
        <div class="grid-row">
          <div class="grid-item">
            <?php echo apply_filters('the_content', $text_1); ?>
          </div>
        </div>
<?php
    }
    if (!empty($middle_image_1) || !empty($middle_image_2)) {
?>
        <div class="grid-row">
        <?php
          if (!empty($middle_image_1)) {
        ?>
          <div class="grid-item item-s-12 item-m-6">
            <?php echo wp_get_attachment_image($middle_image_1); ?>
          </div>
        <?php
          }
          if (!empty($middle_image_2)) {
        ?>
          <div class="grid-item item-s-12 item-m-6">
            <?php echo wp_get_attachment_image($middle_image_2); ?>
          </div>
        <?php
          }
        ?>
        </div>
<?php
    }
    if (!empty($text_2)) {
?>
        <div class="grid-row">
          <div class="grid-item">
            <?php echo apply_filters('the_content', $text_2); ?>
          </div>
        </div>
<?php
    }

    /*
    * EDITIONS will go here
    */

    if (!empty($stockists)) {
?>
        <div class="grid-row">
          <div class="grid-item item-s-12 item-m-8 no-gutter grid-row">
          <?php
            foreach($stockists as $shop) {
          ?>
            <div class="grid-item item-s-12 item-m-6">
              <span><?php echo $shop['name']; ?></span>
              <span><?php echo !empty($shop['map_url']) ? '<a href="' . $shop['map_url'] . '">' . $shop['address'] . '</a>' : $shop['address']; ?></span>
            </div>
          <?php
            }
          ?>
          </div>
          <div class="grid-item item-s-12 item-m-4">
            <?php echo wp_get_attachment_image($stockists_image); ?>
          </div>
        </div>
<?php
    }
?>

      </article>

<?php
  }
}
?>

    </div>
  </section>

</main>

<?php
get_footer();
?>
