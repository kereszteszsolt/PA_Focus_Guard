<script setup lang="ts">
import { computed, PropType } from 'vue';
import { IAction } from '@/interfaces';

defineProps({
  actions: {
    type: Array as PropType<IAction[]>,
    required: true
  },
  item: {
    type: Object,
    required: true
  },
  t: { type: Function, required: true }
});

const vif = (action: IAction, item: any) => {
  return computed(() => action.vif ? action.vif.func(item[action.vif.fieldName], action.vif.value) : true).value;
};

</script>

<template>
  <v-btn icon size="small" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu location="end" activator="parent" open-on-hover>
      <v-list density="compact" class="list bg-background">
        <v-row>
          <v-col v-for="action in actions">
            <v-list-item v-if="vif(action, item)" :key="action.actionId" @click="action.f(item.id)">
              <template v-slot:append>
                <v-btn icon size="small" variant="text" :color="action.color">
                  <v-icon>{{ action.mdiIcon }}</v-icon>
                  <v-tooltip activator="parent" location="top">{{ t(action.tooltip) }}</v-tooltip>
                </v-btn>
              </template>
            </v-list-item>
          </v-col>
        </v-row>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<style scoped lang="scss">
.list {

  > * {
    //row
    padding: 4px 12px;

    > * {
      //col
      padding: 0px;

      > * {
        //list-item
        padding: 4px !important;
      }
    }
  }
}
</style>
