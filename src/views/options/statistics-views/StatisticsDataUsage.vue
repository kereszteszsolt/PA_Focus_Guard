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

utils.runtimeMessages.createBatchMessageListenerM2O(['storageUpdated'], () => {
  useSize.fetchAllSizes();
});
</script>

<template>
  <div class="data-usage flex-1-0" v-if="!useSize.isLoading">
    <h1>{{t(msg.USED_DISK_SPACE_FOR_DATA)}}</h1>
    <table class="styled-table">
      <thead>
      <tr>
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
.data-usage {
  padding: 20px;
}

.styled-table {
  width: 100%;
  margin: 16px 0;
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 12px;
  border-spacing: 0;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
}

.styled-table th {
  background: rgba(var(--v-theme-primary), 0.08);
  font-weight: 600;
}

.styled-table td {
  border-top: 1px solid rgba(var(--v-theme-primary), 0.12);
}

.styled-table th:not(:first-child),
.styled-table td:not(:first-child) {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.styled-table tbody tr:nth-child(even) {
  background: rgba(var(--v-theme-primary), 0.025);
}

.styled-table tbody tr:last-child {
  background: rgba(var(--v-theme-primary), 0.06);
  font-weight: 600;
}
</style>
