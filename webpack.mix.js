let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('src/sass/popup.scss', 'dist/css')
    .sass('src/sass/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/popup.js', 'dist/js').vue()
    .js('src/js/options.js', 'dist/js').vue()
    .copy('src/html/popup.html', 'dist/popup.html')
    .copy('src/html/options.html', 'dist/options.html')
    .copy('src/html/message.html', 'dist/message.html')
    .copy('src/manifest.json', 'dist/manifest.json')
    .copy('src/focus.jpg', 'dist/focus.jpg')
    .copy('src/icon-80.png', 'dist/icon-80.png')
    .options({
        processCssUrls: false
    });
