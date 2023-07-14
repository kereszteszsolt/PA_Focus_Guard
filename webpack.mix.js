let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('src/sass/popup.scss', 'dist/css')
    .sass('src/sass/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/scripts/background/website-elements-blocker/blockFacebookElements.js', 'dist/js/scripts')
    .js('src/js/scripts/background/website-elements-blocker/blockYoutubeElements.js', 'dist/js/scripts')
    .js('src/js/popup.js', 'dist/js').vue()
    .js('src/js/options.js', 'dist/js').vue()
    .copy('src/html/popup.html', 'dist')
    .copy('src/html/options.html', 'dist')
    .copy('src/html/message.html', 'dist')
    .copy('src/manifest.json', 'dist')
    .copy('src/focus.jpg', 'dist')
    .copy('src/icon-80.png', 'dist')
    .options({
        processCssUrls: false
    });
