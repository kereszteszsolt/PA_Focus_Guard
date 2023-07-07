let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('src/sass/popup.scss', 'dist/css')
    .sass('src/sass/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/constants/componentNames.js', 'dist/js/constants')
    .js('src/js/constants/componentTitles.js', 'dist/js/constants')
    .js('src/js/constants/storageNames.js', 'dist/js/constants')
    .js('src/js/data/defaultData.js', 'dist/js/data')
    .js('src/js/popup.js', 'dist/js').vue()
    .js('src/js/options.js', 'dist/js').vue()
    .copy('src/html/popup.html', 'dist')
    .copy('src/html/options.html', 'dist')
    .copy('src/html/message.html', 'dist')
    .copy('src/manifest.json', 'dist')
    .copy('src/focus.jpg', 'dist')
    .copy('src/icon-80.png', 'dist')
    .copy('src/json/defaultsForFacebook.json', 'dist/json')
    .copy('src/json/defaultsForYoutube.json', 'dist/json')
    .options({
        processCssUrls: false
    });
