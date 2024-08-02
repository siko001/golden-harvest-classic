<header class="flex justify-between items-end px-8 md:px-12 xl:px-16 relative">
    <!-- Left Side -->
    <nav class="hidden lg:block">
        <?php has_nav_menu('leftHeaderMenu') ?
            wp_nav_menu([
                'theme_location' => 'leftHeaderMenu',
                'container_id' => 'left-header-menu',
                'depth' => 0,
                'walker' => new Custom_Walker_Nav_Menu()
            ]) : null ?>
    </nav>

    <!-- Logo -->
    <a href="<?= esc_url(get_home_url()) ?>" class='w-40 lg:w-60 h-28 lg:h-20   relative'>
        <?php if (get_header_image()) : ?>
            <img class="w-full h-full object-contain absolute lg:top-4" src="<?= esc_url(get_header_image()) ?>" alt="<?= get_bloginfo('name') ?>">
        <?php endif ?>
    </a>

    <!-- Right Side -->
    <nav class="hidden lg:block">
        <?php has_nav_menu('rightHeaderMenu') ?
            wp_nav_menu([
                'theme_location' => 'rightHeaderMenu',
                'depth' => 0,
            ]) : null ?>
    </nav>

    <div aria-expanded="false" id="mnav-menu-btn" class=" rounded-full w-20 h-20 grid lg:hidden  place-items-center">
        Open
    </div>
</header>