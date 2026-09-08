<script setup lang="ts">

</script>

<template>
  <div class="settings-page flex-1-0">
    <h1>Settings</h1>
    <div>Currently, you can set the Language and Light mode at the side panel; more custom settings are coming with the feature versions.
      Stay tuned to the next version, and subscribe to my channels to avoid missing the latest information!</div>
  </div>
</template>

<style scoped lang="scss">
.settings-page {
  padding: 20px;

  > div {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid rgba(var(--v-theme-primary), 0.22);
    border-radius: 12px;
    background: rgba(var(--v-theme-primary), 0.025);
    font-size: 14px;
    line-height: 1.65;
  }
}
</style>
