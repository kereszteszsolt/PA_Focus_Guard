let mix = require("laravel-mix");

mix
  .setPublicPath("./")
  .js("src/js/background.js", "dist/js")
  .vue()
  .js("src/js/popup.js", "dist/js")
  .vue()
  .js("src/js/options.js", "dist/js")
  .vue()
  .copy("src/html/popup.html", "dist/html")
  .copy("src/html/options.html", "dist/html")
  .copy("src/html/message.html", "dist/html")
  .copy("src/manifest.json", "dist")
  .copy("src/assets/pictures/focus.jpg", "dist/assets/pictures")
  .copy("src/assets/icons/icon-80.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-youtube-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-facebook-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-instagram-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-twitter-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-linkedin-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-github-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-tiktok-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-patreon-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-paypal-48.png", "dist/assets/icons")
  .copy("src/assets/icons/icons8-coffee-to-go-48.png", "dist/assets/icons")
  .options({
    processCssUrls: false,
  });
