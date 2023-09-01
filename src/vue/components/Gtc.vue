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
    return {
      gtcLanguage: lang.getGtcTranslation(this.fgLanguage),
    };
  },
};
</script>
<template>
  <div class="title">
    <h2>{{ gtcLanguage.title }}</h2>
  </div>
  <div>
    <p>
      {{ gtcLanguage.preface }}
    </p>
  </div>

  <div v-for="chapter in gtcLanguage.chapters" :key="chapter.id">
    <h3>{{ chapter.title }}</h3>
    <p>{{ chapter.text }}</p>
  </div>

  <div v-for="aText in gtcLanguage.afterText" :key="aText.id">
    <p>{{ aText }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "../../scss/common.scss";

p {
  margin-bottom: 0.5rem;
  text-indent: 1em;
}
</style>
