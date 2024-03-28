<script setup lang="ts">
import { useSizeStore } from '@/store/sizeStore';
import * as utils from '@/utils';
import { useI18nStore } from '@/store';
import { computed } from 'vue'
import { msg } from '@/constants';
import { USED_DISK_SPACE_FOR_DATA } from '@/constants/messages';

const useSize = useSizeStore();
useSize.fetchAllSizes();
utils.runtimeMessages.createMessageListener('storageUpdated', () => {
  useSize.fetchAllSizes();
});

const extensionId = chrome.runtime.id;
const managementUrl = `chrome://extensions/?id=${extensionId}`;

const downloadAllData = () => {
  // Implement your data download logic here
};
const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();

const t = (key: string) => computed(() => i18n.getTranslation(key)).value;
</script>

<template>
  <div class="flex-1-0 pa-4" v-if="!useSize.isLoading">
    <h1>{{t(msg.USED_DISK_SPACE_FOR_DATA)}}</h1>
    <table class="styled-table">
      <thead>
      <tr class="bg-accent">
        <th>Variable Name</th>
        <th>Value (Bytes)</th>
        <th>Value (KB)</th>
        <th>Value (MB)</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>App Data Size</td>
        <td>{{ useSize.getAppDataSize }}</td>
        <td>{{ (useSize.getAppDataSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getAppDataSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Website Rules Size</td>
        <td>{{ useSize.getWebsiteRulesSize }}</td>
        <td>{{ (useSize.getWebsiteRulesSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getWebsiteRulesSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Website Rule Lists Size</td>
        <td>{{ useSize.getWebsiteRuleListsSize }}</td>
        <td>{{ (useSize.getWebsiteRuleListsSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getWebsiteRuleListsSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Statistics Size</td>
        <td>{{ useSize.getStatisticsSize }}</td>
        <td>{{ (useSize.getStatisticsSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getStatisticsSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Locale Settings Size</td>
        <td>{{ useSize.getLocaleSettingsSize }}</td>
        <td>{{ (useSize.getLocaleSettingsSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getLocaleSettingsSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Settings Messages Size</td>
        <td>{{ useSize.getLocaleMessagesSize }}</td>
        <td>{{ (useSize.getLocaleMessagesSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getLocaleMessagesSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>Total Size</td>
        <td>{{ useSize.getTotalSize }}</td>
        <td>{{ (useSize.getTotalSize / 1024).toFixed(2)}}</td>
        <td>{{ (useSize.getTotalSize / 1024 / 1024).toFixed(2)}}</td>
      </tr>
      </tbody>
    </table>
<!--    <button @click="downloadAllData">Download All Data</button>-->
  </div>
</template>

<style scoped lang="scss">
.styled-table {
  width: 100%;
  margin: 1em 0;
  border-collapse: collapse;
}

.styled-table th,
.styled-table td {
  padding: 0.75em;
  border: 1px solid #ddd;
}

.styled-table th {
  //background-color: #f5f5f5;
  text-align: left;
}

.styled-table tbody tr:nth-child(even) {
  background-color: rgb(var(--v-theme-info)) !important;
}

button {
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
