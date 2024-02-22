<script setup lang="ts">

</script>

<template>
  <v-sheet class="sidebar-language" color="background">
    <v-list>
      <v-list-item title="English"></v-list-item>
      <v-list-item title="Hungarian"></v-list-item>
      <v-list-item title="Romanian"></v-list-item>
      <v-list-item title="German"></v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-btn density="compact" icon="mdi-plus"></v-btn>
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <router-link :to="{ name: 'LanguagesByLanguageId', params: { id: 'all' } }" class="router-link">
        <v-list-item title="All Languages" value="all"></v-list-item>
      </router-link>
    </v-list>
  </v-sheet>
</template>

<style scoped lang="scss">
.sidebar-language {
  height: 100%;
}

.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
