<script lang="ts">
import { useTheme } from 'vuetify';

export default {
  setup() {
    const theme = useTheme();
    const toggleTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? 'fgLightTheme' : 'fgDarkTheme';
    };
    return {
      theme,
      toggleTheme
    };
  }
};
</script>

<template>
  <v-btn @click="toggleTheme" size="x-large"
         :icon="theme.global.current.value.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-btn>
</template>

<style scoped lang="scss">

</style>
