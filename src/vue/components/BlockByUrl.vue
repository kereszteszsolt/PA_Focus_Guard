<script>
export default {
  props: {
    funcTitle: {
      type: String,
      required: true
    },
    funcName: {
      type: String,
      required: true
    },
    storageName: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {

    };
  }
}
</script>

<template>
  {{ funcName }} <br/>
  {{ funcTitle }} <br/>
  {{ storageName }} <br/>
  {{ data }} <br/>
</template>

<styles scoped lang="scss">
@import '../../scss/common.scss';

</styles>
