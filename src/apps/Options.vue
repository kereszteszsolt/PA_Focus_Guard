<script lang="ts">
import { AppBar, Sidebar } from '@/layouts';
import { useTheme } from 'vuetify';
import { computed } from 'vue';

export default {
  components: {
    Sidebar,
    AppBar
  },
  setup() {
    const theme = useTheme();
    const isDark = computed(() => theme.global.current.value.dark);
    return {
      theme,
      isDark
    };
  }
};
</script>

<template>
  <v-layout>
    <v-sheet :class="{'mathPatternLight': !isDark, 'mathPatternDark': isDark}">
      <app-bar/>
      <v-main>
        <v-container class="container">
          <v-row>
            <v-col lg="3">
              <v-sheet :rounded="true" height="80vh" color="background">
                <sidebar/>
              </v-sheet>
            </v-col>
            <v-col lg="9">
              <v-sheet :rounded="true" height="80vh" color="background">
                <router-view/>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-sheet>
  </v-layout>
</template>

<style scoped lang="scss">
.mathPatternLight {
  height: 100vh;
  width: 100vw;
  background-color: #f4f1e8;
  background-image: linear-gradient(rgba(204, 187, 141, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 187, 141, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

.mathPatternDark {
  height: 100vh;
  width: 100vw;
  background-color: #2b2b2b;
  background-image: linear-gradient(rgba(102, 95, 71, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 95, 71, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
  margin-top: 0;
  margin-right: auto;
  margin-left: auto;

  // Define breakpoints for different screen sizes
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
}
</style>
