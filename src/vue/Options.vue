<script>
import BlockByUrl from './components/BlockByUrl.vue';

export default {
  components: {
    BlockByUrl: BlockByUrl
  },
  data() {
    return {
      selectedFunctionality: {
        name: 'Block By URL',
        description: 'Block a website by URL',
        icon: 'fa fa-ban',
        component: 'BlockByUrl'
      },
      selectedData: []
    };
  }
}
</script>

<template>
  <div class="app-bar">
    <div class="container">Focus Guard: Options</div>
  </div>
  <div class="container main">
    <div class="sidebar">
      test
    </div>
    <div class="content">
      <component :is="selectedFunctionality.component" functionality="functionality" data="selectedData"> </component>
    </div>
  </div>
</template>

<style lang="scss">
@import '../scss/common.scss';

.app-bar {
  display: flex;
  flex-direction: column;
  background-color: $fg-primary-color;
  color: floralwhite;
  font-weight: bold;
  align-items: center;
  padding: 0.5rem;
  font-size: 3rem;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
}

.content {
  flex: 1; /* Allow the main content to take up the remaining space */
  background-color: floralwhite;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.2);
  padding: 1rem;
  border-radius: 5px;
}

.sidebar {
  flex: 0 0 200px;
  background-color: floralwhite;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.2);
  padding: 1rem;
  margin-right: 1rem;
  border-radius: 5px;
}
</style>
