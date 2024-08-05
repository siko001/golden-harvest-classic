/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./page.php', './template-parts/*.php', 'header.php', 'footer.php'],
    theme: {
        extend: {
            fontFamily: {
                script: ['brandon-grotesque', 'sans-serif'],
                fertigo: ['fertigo-pro', 'serif'],
            },
        },
    },
    plugins: [],
};
