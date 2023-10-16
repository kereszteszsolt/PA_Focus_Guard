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
      textComponent: lang.getTextComponentTranslation(
        this.funcName,
        this.fgLanguage,
      ),
    };
  },
  watch: {
    funcName() {
      this.textComponent = lang.getTextComponentTranslation(
        this.funcName,
        this.fgLanguage,
      );
    },
  },
};
</script>
<template>
  <div class="title">
    <h2>{{ textComponent.title }}</h2>
  </div>
  <div>
    <p>
      {{ textComponent.preface }}
    </p>
  </div>

  <div v-for="chapter in textComponent.chapters" :key="chapter.id">
    <h3>{{ chapter.title }}</h3>
    <p>{{ chapter.text }}</p>
  </div>

  <div v-for="link in textComponent.links" :key="link.id">
    <div>
      <h3>{{ link.text }}</h3>
      <a :href="link.url">{{ link.url }}</a>
    </div>
  </div>

  <div v-for="aText in textComponent.afterword" :key="aText.id">
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
