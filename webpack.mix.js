let mix = require('laravel-mix');

mix.setPublicPath('./')
    .sass('src/sass/popup.scss', 'dist/css')
    .sass('src/sass/options.scss', 'dist/css')
    .js('src/js/background.js', 'dist/js')
    .js('src/js/constants/componentNames.js', 'dist/js/constants')
    .js('src/js/constants/componentTitles.js', 'dist/js/constants')
    .js('src/js/constants/storageNames.js', 'dist/js/constants')
    .js('src/js/defaults/defaultData.js', 'dist/js/defaults')
    .js('src/js/defaults/defaultsForFacebook.js', 'dist/js/defaults')
    .js('src/js/defaults/defaultsForYoutube.js', 'dist/js/defaults')
    .js('src/js/defaults/defaultDomainsForTemporarilyBlock.js', 'dist/js/defaults')
    .js('src/js/defaults/defaultDomainsForPermanentlyBlock.js', 'dist/js/defaults')
    .js('src/js/scripts/utils/dataAccess.js', 'dist/js/scripts/utils')
    .js('src/js/scripts/utils/conversions.js', 'dist/js/scripts/utils')
    .js('src/js/scripts/utils/index.js', 'dist/js/scripts/utils')
    .js('src/js/scripts/background/index.js', 'dist/js/scripts/background')
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
