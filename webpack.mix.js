let mix = require('laravel-mix');

mix.setPublicPath('./')
    // .sass('src/sass/popup.scss', 'dist/css')
    // .sass('src/sass/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/popup.js', 'dist/js').vue()
    .js('src/js/options.js', 'dist/js').vue()
    .copy('src/html/popup.html', 'dist/html')
    .copy('src/html/options.html', 'dist/html')
    .copy('src/html/message.html', 'dist/html')
    .copy('src/manifest.json', 'dist')
    .copy('src/assets/pictures/focus.jpg', 'dist/assets/pictures')
    .copy('src/assets/icons/icon-80.png', 'dist/assets/icons')
    .options({
        processCssUrls: false
    });
