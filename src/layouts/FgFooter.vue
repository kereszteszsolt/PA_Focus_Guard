<script setup lang="ts">

</script>

<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-5 py-2">
    <div class="d-flex flex-row justify-space-around">
      <div class="d-flex flex-column justify-space-around">
        <v-icon>mdi-facebook</v-icon>
        <v-icon>mdi-linkedin</v-icon>
        <v-icon>mdi-twitter</v-icon>
        <v-icon>mdi-instagram</v-icon>
      </div>
      <div class="d-flex flex-column justify-space-around">
        <v-icon>mdi-youtube</v-icon>
        <v-icon>mdi-youtube</v-icon>
        <v-icon>mdi-github</v-icon>
        <v-icon>mdi-information</v-icon>
      </div>
      <div class="d-flex flex-column justify-space-around">
        <router-link to="/about">About</router-link>
        <router-link to="/gtc">GTC</router-link>
        <router-link to="/acknowledgments">Acknowledgments</router-link>
        <router-link to="/how-to-use">How to use</router-link>
      </div>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p>Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
