<script>
export default {
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
  },
  data() {
    return {
      msg: "Block elements on the page",
    };
  },
};
</script>
<template>
  {{ storageName }}
  {{ funcName }}
  {{ funcTitle }}
  {{ justDomain }}
</template>
<style lang="scss"></style>
