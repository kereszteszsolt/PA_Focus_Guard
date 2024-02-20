<script lang="ts">
import { defineComponent } from 'vue';
import focus from '@/assets/focus.jpg';

export default defineComponent({
  name: 'FocusMessage',
  data() {
    return {
      message: 'This is a focus message',
      dialog: true,
      focus
    };
  },
  computed: {
  },
  mounted() {
  },
});
</script>

<template>
  <v-dialog v-model="dialog" size="100%" persistent>
    <v-card>
      <v-img :src="focus" contain/>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
