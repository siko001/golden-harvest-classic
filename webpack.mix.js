let mix = require('laravel-mix');

mix.js('./src/js/main.js', './dist/js/main.js')
    .postCss('./src/css/style.css', './style.css', [require('tailwindcss')])
    .sourceMaps()
    .browserSync({
        proxy: 'golden-harvest.local',
        files: ['./**/*.php', './style.css', './dist/js/main.js'],
    });
