<?php

require get_template_directory() . '/includes/actions.php';
require get_template_directory() . '/includes/navwalker.php';

//remove admin nav
// add_action('admin_menu', 'remove_admin_menu', 0);

if (!function_exists('gh_register_theme_settings')) {
    add_action('after_setup_theme', 'gh_register_theme_settings', 0);

    function gh_register_theme_settings() {

        // Add theme support for woocommerce
        add_theme_support('woocommerce');

        // Register the different menus
        register_nav_menus(array(
            'leftHeaderMenu' => __('Left Header Menu', 'gh-cls'),
            'rightHeaderMenu' => __('Right Header Menu', 'gh-cls'),

            'leftFooterMenu'  => __('Left Footer Menu', 'gh-cls'),
            'centerFooterMenu'  => __('Center Footer Menu', 'gh-cls'),
            'socialFooterMenu'  => __('Socials Footer Menu', 'gh-cls'),
        ));

        // Register the custom header Logo
        add_theme_support('custom-header', array(
            'default-image'          => get_template_directory_uri() . '/assets/images/default-header.png',
            'width'                  => 300,
            'height'                 => 100,
            'flex-height'            => true,
            'flex-width'             => true,
            'header-text'            => false,
            'uploads'                => true,
        ));
    }
}



//add custom Icons to certain menu items
// function replace_menu_items_with_svg($items, $args) {
//     foreach ($items as &$item) {
//         if (strtolower($item->title) == 'cart') {
//             $item->title = '<img src="' . get_template_directory_uri() . '/assets/images/cart-icon.svg" alt="Cart" class="menu-icon">';
//         } elseif (strtolower($item->title) == 'my account') {
//             $item->title = '<img src="' . get_template_directory_uri() . '/assets/images/account-icon.svg" alt="Account" class="menu-icon">';
//         }
//     }
//     return $items;
// }
// add_filter('wp_nav_menu_objects', 'replace_menu_items_with_svg', 10, 2);



show_admin_bar(false);
