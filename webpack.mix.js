let mix = require('laravel-mix');

mix.js('src/js/scripts.js', 'public/assets/js/scripts.js')
   .sass('src/scss/style.scss', 'public/assets/css/style.css')
   .sourceMaps()
   .browserSync({
        proxy: 'joltcola.local',
        files: [
            'public/assets/css/**/*.css',
            'public/assets/js/**/*.js'
        ]
    });