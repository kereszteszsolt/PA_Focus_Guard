<script setup lang="ts">

</script>

<template>
  <v-sheet class="border-radius-8 flex-1-0" color="background">
    <v-list class="bg-background border-radius-8">
      <router-link :key="'about'" :to="{name: 'About'}" class="router-link text">
        <v-list-item color="primary" :value="'about'">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link :key="'gtc'" :to="{name: 'Gtc'}" class="router-link text">
        <v-list-item color="primary" :value="'gtc'">
          <v-list-item-title>GTC</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link :key="'acknowledgements'" :to="{name: 'Acknowledgements'}" class="router-link text">
        <v-list-item color="primary" :value="'acknowledgements'">
          <v-list-item-title>Acknowledgements</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link :key="'how-to-use'" :to="{name: 'HowToUse'}" class="router-link text">
        <v-list-item color="primary" :value="'how-to-use'">
          <v-list-item-title>How to use</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link :key="'donations'" :to="{name: 'Donations'}" class="router-link text">
        <v-list-item color="primary" :value="'donations'">
          <v-list-item-title>Donations</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
