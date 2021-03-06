<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php wp_title('|',true,'right'); bloginfo('name'); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

<?php
get_template_part('partials/globie');
get_template_part('partials/seo');
?>

  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
  <link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">
  <link rel="shortcut" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.ico">
  <link rel="apple-touch-icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon-touch.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">

<?php if (is_singular() && pings_open(get_queried_object())) { ?>
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<?php } ?>

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<!--[if lt IE 9]><p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->

<canvas id="dust"></canvas>

<section id="main-container">

  <header id="header" class="margin-top-large">
    <nav id="main-nav">
      <div class="container">
        <div class="grid-row font-uppercase justify-between">
          <div id="nav-about" class="grid-item padding-top-small">
            <a href="#!/about">About</a>
          </div>
          <div id="nav-stockists" class="grid-item padding-top-small">
            <a href="#!/stockists">Stockists</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="grid-row">
        <div id="site-title" class="grid-item item-s-12 font-uppercase text-align-center">
          <h1 class="font-size-large">Maison Gas</h1>
          <span class="font-size-large">Los Angeles</span>
        </div>
      </div>
    </div>
  </header>
