<?php
  $options = get_site_option('_igv_site_options');
?>
  <footer id="footer">
    <div class="container">
      <div class="grid-row text-align-center">
      <?php
        if (!empty($options['socialmedia_instagram'])) {
      ?>
        <div class="grid-item item-s-12">
          <a href="https://instagram.com/<?php echo $options['socialmedia_instagram']; ?>">Instagram</a>
        </div>
      <?php
        }

        if (!empty($options['contact_email'])) {
      ?>
        <div class="grid-item item-s-12">
          <a href="mailto:<?php echo $options['contact_email']; ?>"><?php echo $options['contact_email']; ?></a>
        </div>
      <?php
        }
      ?>
      </div>
    </div>
  </footer>

</section>

<?php
get_template_part('partials/scripts');
get_template_part('partials/schema-org');
?>

</body>
</html>
