<script>
import * as lang from "../../js/utils/languages";

export default {
  name: "About",
  computed: {
    lang() {
      return lang;
    },
  },
  props: {
    fgLanguage: {
      type: String,
      required: true,
    },
    funcTitle: {
      type: String,
      required: true,
    },
    funcName: {
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
  <h1>
    {{ lang.getTranslation(fgLanguage, funcName) }}
  </h1>
</template>
<style scoped lang="scss"></style>
