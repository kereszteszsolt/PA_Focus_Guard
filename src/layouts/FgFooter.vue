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
    <div class="d-flex flex-row justify-space-around text-none text-center">
      <rounter-link to="/about" class="flex-1-0"><span>About</span></rounter-link>
      <rounter-link to="/Gtc" class="flex-1-0"><span>Gtc</span></rounter-link>
      <rounter-link to="/donation" class="flex-1-0"><span>Donation</span></rounter-link>
      <rounter-link to="/acknowledgments" class="flex-1-0"><span>Acknowledgments</span></rounter-link>
      <rounter-link to="/how-to-use" class="flex-1-0"><span>How to use</span></rounter-link>
    </div>
    <div class="d-flex flex-row justify-space-around text-center">
      <p>Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software.</p>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">

</style>
