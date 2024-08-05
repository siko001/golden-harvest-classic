<!DOCTYPE html>
<html <?php language_attributes() ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="180x180" href="<?= get_theme_file_uri() . '/apple-touch-icon.png' ?>">
    <link rel="icon" type="image/png" sizes="32x32" href="<?= get_theme_file_uri() . '/favicon-32x32.png' ?>">
    <link rel="icon" type="image/png" sizes="16x16" href="<?= get_theme_file_uri() . '/favicon-16x16.png' ?>">
    <link rel="manifest" href="<?= get_theme_file_uri() . '/site.webmanifest' ?>">
    <link rel="mask-icon" href="<?= get_theme_file_uri() . '/safari-pinned-tab.svg' ?>" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="theme-color" content="#ffffff">
    <title><?php wp_title() ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
    <main class="relative">

        <!-- Section 1 -->
        <section class="snap-section">
            <?php get_template_part("template-parts/m.nav")     ?>

            <?php get_template_part("template-parts/nav")    ?>
            <?php get_template_part('template-parts/hero', null, ["color" => "bg-green-500"]) ?>
        </section>

        <!-- Section 2 -->
        <section class="snap-section sticky top-0 h-[100vh]">
            <?php get_template_part('template-parts/draggable-area') ?>
        </section>

        <!-- Section 3 -->
        <section class=" relative">
            <?php get_template_part('template-parts/hero', null, ["color" => "bg-red-500"]) ?>
        </section>

        <!-- Section 4 (Scrollable) -->
        <section class=" relative">
            <?php get_template_part('template-parts/hero', null, ["color" => "bg-blue-500"]) ?>
        </section>



    </main>