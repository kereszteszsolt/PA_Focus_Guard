<script setup lang="ts">
import { useSizeStore } from '@/store/sizeStore';
import * as utils from '@/utils';

const useSize = useSizeStore();
useSize.fetchAllSizes();
utils.runtimeMessages.createMessageListener('storageUpdated', () => {
  useSize.fetchAllSizes();
});

</script>

<template>
  <div class="flex-1-0" v-if="!useSize.isLoading">
    <h1>Settings</h1>
    <table>
      <th>
        <td>Variable Name</td>
        <td>Value</td>
      </th>
      <tr>
        <td>App Data Size</td>
        <td>{{ useSize.getAppDataSize }}</td>
      </tr>
      <tr>
        <td>Website Rules Size</td>
        <td>{{ useSize.getWebsiteRulesSize }}</td>
      </tr>
      <tr>
        <td>Website Rule Lists Size</td>
        <td>{{ useSize.getWebsiteRuleListsSize }}</td>
      </tr>
      <tr>
        <td>Statistics Size</td>
        <td>{{ useSize.getStatisticsSize }}</td>
      </tr>
      <tr>
        <td>Locale Settings Size</td>
        <td>{{ useSize.getLocaleSettingsSize }}</td>
      </tr>
      <tr>
        <td>Settings Messages Size</td>
        <td>{{ useSize.getLocaleMessagesSize }}</td>
      </tr>
      <tr>
        <td>Total Size</td>
        <td>{{ useSize.getTotalSize }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">

</style>
