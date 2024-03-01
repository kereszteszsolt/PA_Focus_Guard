<script setup lang="ts">

</script>

<template>
  <v-sheet color="background"
           class="border-bottom-radius-8 fg-h-104px d-flex flex-column justify-space-between px-5 py-2">
    <div class="d-flex flex-row justify-space-around">
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-coffee</v-icon>
      </v-btn>
      <v-btn variant="text" class="flex-1-0">
        <v-icon>mdi-tree</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-row justify-space-around">
          <router-link to="/about" class="text-none text-center flex-1-0">About</router-link>
          <router-link to="/gtc" class="text-none text-center flex-1-0">Gtc</router-link>
          <router-link to="/donation" class="text-none text-center flex-1-0">Donation</router-link>
          <router-link to="/acknowledgment" class="text-none text-center flex-1-0">Acknowledgment</router-link>
          <router-link to="/how-to-use" class="text-none text-center flex-1-0">How to use</router-link>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p>Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
