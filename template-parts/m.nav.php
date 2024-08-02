<div id="mobile-nav-menu" class=" pt-40 pb-16 text-white bg-black invisible absolute min-w-[100vw] min-h-[100vh] gap-4  flex flex-col items-center">

    <?php has_nav_menu('leftHeaderMenu') ?
        wp_nav_menu([
            'theme_location' => 'leftHeaderMenu',
            'container_id' => 'left-header-menu',
            'depth' => 0,
            // 'walker' => new Custom_Walker_Nav_Menu()
        ]) : null ?>

    <?php has_nav_menu('rightHeaderMenu') ?
        wp_nav_menu([
            'theme_location' => 'rightHeaderMenu',
            'depth' => 0,
        ]) : null ?>

</div>