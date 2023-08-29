<script>
import * as lang from "../../js/utils/languages";

export default {
  computed: {
    lang() {
      return lang;
    },
  },
  props: {
    funcTitle: {
      type: String,
      required: true,
    },
    funcName: {
      type: String,
      required: true,
    },
    storageName: {
      type: String,
      required: true,
    },
    justDomain: {
      type: Boolean,
      required: true,
    },
    fgLanguage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_stock_photos") }}
    </p>
    <a
      href="https://pixabay.com/photos/focalizare-a-inspira-inspira%C8%9Bie-5519780/"
    >
      "Focus"
    </a>
    by
    <a href="https://pixabay.com/users/homegrounds-18055885/">Homegrounds</a>
    from Pixabay
  </div>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_stock_icons") }}
    </p>
    <div>
      <a target="_blank" href="https://icons8.com/icon/19318/youtube"
        >YouTube</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/32323/instagram"
        >Instagram</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/13912/facebook"
        >Facebook</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/xuvGCOXi8Wyg/linkedin"
        >LinkedIn</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/13963/twitter"
        >Twitter</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/fmFqQmR0UdsR/github"
        >GitHub</a
      >
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
    <div>
      <a target="_blank" href="https://icons8.com/icon/118640/tiktok">TikTok</a>
      icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </div>
  </div>
  <div class="about-paragraph thanks">
    <p>
      {{ lang.getTranslation(fgLanguage, "aboutText_thanks_crash_course") }}
    </p>
    <a href="https://youtu.be/kYl271X2LNA">https://youtu.be/kYl271X2LNA</a>
  </div>
</template>
<style scoped lang="scss">
@import "../../scss/common.scss";
</style>
