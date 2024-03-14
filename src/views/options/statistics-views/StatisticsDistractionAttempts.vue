<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useI18nStore, useStatisticsStore } from '@/store';
import { msg } from '@/constants';
import DeleteFilterRuleDialog from '@/components/distraction-attempts/DeleteFilterRuleDialog.vue';
import DeleteDistractionAttemptDialog from '@/components/distraction-attempts/DeleteDistractionAttemptDialog.vue';

const statisticStore = useStatisticsStore();
const i18n = useI18nStore();
statisticStore.fetchDistractionAttempts();
i18n.fetchLocaleSettingsAndMessages();

const search = ref('');
const selectedYear = ref(null);
const selectedMonth = ref(null);
const selectedDay = ref(null);
const maximumItemsPerPage = ref(7);
const page = ref(1);
const totalVisiblePages = ref(5);

const deleteDistractionAttemptDialog = ref(false);
const deleteFilterRuleDialog = ref(false);
const dContextDistractionAttemptId = ref('');
const dContextUrlFilter = ref('');
const dContextLastItem = ref(false);


const totalPages = computed(() => {
  return Math.ceil(statisticStore.distractionAttempts.length / maximumItemsPerPage.value);
});
const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
// Example of a computed property that filters based on multiple criteria
const filteredData = computed(() => {
  return statisticStore.distractionAttempts.filter((attempt) => {
    const date = new Date(attempt.dateTime);
    const yearMatches = selectedYear.value ? date.getFullYear() === selectedYear.value : true;
    const monthMatches = selectedMonth.value ? date.getMonth() + 1 === selectedMonth.value : true; // JS months are 0-indexed
    const dayMatches = selectedDay.value ? date.getDate() === selectedDay.value : true;
    const urlFilterMatches = attempt.simpleRules.some(rule => rule.urlFilter.toLowerCase().includes(search.value.toLowerCase()));
    return yearMatches && monthMatches && dayMatches && urlFilterMatches;
  });
});

const headers = computed(() => [
  // { text: 'ID', value: 'id' },
  { title: 'Focus Mode', value: 'focusMode' },
  { title: 'Session ID', value: 'focusModeSessionId' },
  { title: 'Rules', value: 'simpleRules', sortable: false },
  { title: 'Date/Time', value: 'dateTime' }
]);

//
// const colors = ['red', 'green', 'blue', 'orange', 'purple', 'cyan', 'pink', 'lime', 'amber', 'teal', 'indigo',
//   'deepPurple', 'lightBlue', 'teal', 'lightGreen', 'lime', 'yellow', 'amber', 'deepOrange', 'brown', 'grey', 'blueGrey'];
const colors = [
  'red', 'green', 'blue', 'orange', 'purple', 'cyan', 'pink', 'lime', 'amber', 'teal', 'indigo',
  'deepPurple', 'lightBlue', 'teal', 'lightGreen', 'lime', 'yellow', 'amber', 'deepOrange', 'brown', 'grey', 'blueGrey',
  'red lighten-2', 'pink lighten-2', 'purple lighten-2', 'deep-purple lighten-2',
  'indigo lighten-2', 'blue lighten-2', 'light-blue lighten-2', 'cyan lighten-2',
  'teal lighten-2', 'green lighten-2', 'light-green lighten-2', 'lime lighten-2',
  'yellow lighten-2', 'amber lighten-2', 'orange lighten-2', 'deep-orange lighten-2',
  'brown lighten-2', 'blue-grey lighten-2', 'grey lighten-2',
  'red darken-2', 'pink darken-2', 'purple darken-2', 'deep-purple darken-2',
  'indigo darken-2', 'blue darken-2', 'light-blue darken-2', 'cyan darken-2',
  'teal darken-2', 'green darken-2', 'light-green darken-2', 'lime darken-2',
  'yellow darken-2', 'amber darken-2', 'orange darken-2', 'deep-orange darken-2',
  'brown darken-2', 'blue-grey darken-2', 'grey darken-2',
  'red accent-1', 'pink accent-1', 'purple accent-1', 'deep-purple accent-1',
  'indigo accent-1', 'blue accent-1', 'light-blue accent-1', 'cyan accent-1',
  'lime accent-1', 'yellow accent-1', 'amber accent-1', 'orange accent-1',
  'brown accent-1', 'blue-grey accent-1', 'grey accent-1',
  'red accent-2', 'pink accent-2', 'purple accent-2', 'deep-purple accent-2',
  'indigo accent-2', 'blue accent-2', 'light-blue accent-2', 'cyan accent-2',
  'lime accent-2', 'yellow accent-2', 'amber accent-2', 'orange accent-2',
  'brown accent-2', 'blue-grey accent-2', 'grey accent-2',
  'red accent-3', 'pink accent-3', 'purple accent-3', 'deep-purple accent-3',
  'indigo accent-3', 'blue accent-3', 'light-blue accent-3', 'cyan accent-3'
];

const urlFilterColorMap = ref(new Map());
let colorIndex = 0; // Keep track of the color index globally

const getColorForUrlFilter = (urlFilter: string) => {
  if (urlFilterColorMap.value.has(urlFilter)) {
    return urlFilterColorMap.value.get(urlFilter);
  } else {
    if (colorIndex >= colors.length) {
      colorIndex = 0; // Reset colorIndex to start from the beginning of the colors array
    }
    const assignedColor = colors[colorIndex++];
    urlFilterColorMap.value.set(urlFilter, assignedColor);
    return assignedColor;
  }
};


// const urlFilterColorMap = ref(new Map());
// const usedColors = ref(new Set());
//
// function generateUniqueRandomColor() {
//   let color;
//   do {
//     color = '#' + Math.floor(Math.random() * 16777215).toString(16);
//   } while (usedColors.value.has(color));
//   usedColors.value.add(color);
//   return color;
// }
//
// const getColorForUrlFilter = (urlFilter: string) => {
//   if (!urlFilterColorMap.value.has(urlFilter)) {
//     const newColor = generateUniqueRandomColor();
//     urlFilterColorMap.value.set(urlFilter, newColor);
//   }
//   return urlFilterColorMap.value.get(urlFilter);
// };

const pCloseDeleteDistractionAttemptDialog = () => {
  deleteDistractionAttemptDialog.value = false;
  nextTick(() => {
    dContextDistractionAttemptId.value = '';
  });
};

const pConfirmDeleteDistractionAttempt = () => {
  statisticStore.deleteDistractionAttempt(dContextDistractionAttemptId.value);
  deleteDistractionAttemptDialog.value = false;
  nextTick(() => {
    dContextDistractionAttemptId.value = '';
  });
};

const pCloseDeleteFilterRuleDialog = () => {
  deleteFilterRuleDialog.value = false;
  nextTick(() => {
    dContextUrlFilter.value = '';
    dContextDistractionAttemptId.value = '';
    dContextLastItem.value = false;
  });
};

const pConfirmDeleteFilterRule = () => {
  statisticStore.deleteUrlFilterFromDistractionAttempt(dContextDistractionAttemptId.value, dContextUrlFilter.value);
  deleteFilterRuleDialog.value = false;
  nextTick(() => {
    dContextUrlFilter.value = '';
    dContextDistractionAttemptId.value = '';
    dContextLastItem.value = false;
  });
};

const openDeleteDistractionAttemptDialog = (distractionAttemptId: string) => {
  dContextDistractionAttemptId.value = distractionAttemptId;
  deleteDistractionAttemptDialog.value = true;
  console.log('deleteDistractionAttemptDialog.value', deleteDistractionAttemptDialog.value);
};

const openDeleteFilterRuleDialog = (distractionAttemptId: string, filterRuleId: string, lastItem: boolean) => {
  dContextUrlFilter.value = filterRuleId;
  dContextDistractionAttemptId.value = distractionAttemptId;
  dContextLastItem.value = lastItem;
  deleteFilterRuleDialog.value = true;
};

</script>

<template>
  <div class="flex-1-0 pa-4">
    <v-data-table :headers="headers" :items="filteredData" :search="search" :items-per-page="maximumItemsPerPage"
                  :page="page" :total-items="filteredData.length"
                  class="bg-background">
      <template v-slot:top>
        <v-toolbar flat class="border-top-radius-8">
          <v-text-field v-model="search" label="Search by URL Filter" clearable></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.dateTime="{ item }">
        {{ new Date(item.dateTime).toLocaleString() }}
      </template>
      <template v-slot:item.focusModeSessionId="{ item }">
        <v-chip class="mr-2" :color="getColorForUrlFilter(item.focusModeSessionId)">
          <v-tooltip activator="parent" location="top right">{{ item.focusModeSessionId }}</v-tooltip>
          <div :style="{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '123px'}">
            {{ item.focusModeSessionId }}
          </div>
          <v-icon @click="openDeleteDistractionAttemptDialog(item.id)" icon="mdi-close-circle"  end></v-icon>
        </v-chip>
      </template>
      <template v-slot:item.focusMode="{ item }">
        <div class="text-center" :style="{width: '52px'}">
          <v-tooltip activator="parent" location="top">{{ item.focusMode ? 'ON' : 'OFF' }}</v-tooltip>
          <v-icon size="x-large" :color="item.focusMode ? 'success' : 'danger'">
            {{ item.focusMode ? 'mdi-shield-lock-outline' : 'mdi-shield-lock-open-outline' }}
          </v-icon>
        </div>
      </template>
      <template v-slot:item.simpleRules="{ item }">
        <div class="d-flex flex-wrap justify-space-around" :style="{maxWidth: '370px'}">
          <v-chip v-for="rule in item.simpleRules.sort((a,b) => a.urlFilter.length - b.urlFilter.length)"
                  :key="rule.urlFilter" class="ma-1 font-weight-bold"
                  :color="getColorForUrlFilter(rule.urlFilter)">
            <v-icon v-if="rule.permanentlyActive" color="success" start>mdi-lock-alert</v-icon>
            <div :style="{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px'}">
              {{ rule.urlFilter }}
            </div>
            <v-tooltip activator="parent" location="top" v-if="rule.permanentlyActive">
              {{ `Permanently active! ${rule.urlFilter}` }}
            </v-tooltip>
            <v-tooltip activator="parent" location="top" v-else>{{ rule.urlFilter }}</v-tooltip>
            <v-icon @click="openDeleteFilterRuleDialog(item.id, rule.urlFilter, item.simpleRules.length === 1)" end>
              mdi-close-circle
            </v-icon>
          </v-chip>
        </div>
      </template>
      <template v-slot:bottom>
        <v-sheet color="background" class="d-flex justify-space-between">
          <v-pagination
            v-model="page"
            :length="totalPages"
            :total-visible="totalVisiblePages"
            rounded="circle"
          ></v-pagination>

          <v-label :style="{paddingRight: '24px', fontWeight: '500'}">{{ t(msg.TOTAL_NR_OF_ITEMS) }}
            {{ filteredData.length }}
          </v-label>
        </v-sheet>
      </template>
    </v-data-table>
    <delete-distraction-attempt-dialog
      :pDialog="deleteDistractionAttemptDialog"
      :pCloseDialog="pCloseDeleteDistractionAttemptDialog"
      :pConfirmDelete="pConfirmDeleteDistractionAttempt"
      :t="t"/>
    <delete-filter-rule-dialog
      :p-dialog="deleteFilterRuleDialog"
      :p-close-dialog="pCloseDeleteFilterRuleDialog"
      :p-confirm-delete="pConfirmDeleteFilterRule"
      :p-last-item="dContextLastItem"
      :t="t"/>
  </div>
</template>

<style scoped lang="scss">

</style>
