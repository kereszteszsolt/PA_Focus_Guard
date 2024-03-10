<template>
  <v-card class="flex-1-0 pa-4 fgScroll border-top-radius-8" color="background" elevation="0">
    <v-card-item class="border-top-radius-8">
      <v-card-title class="text-h6 border-top-radius-8">
        <div class="font-weight-bold border-top-radius-8">General Terms and Conditions (GTC)</div>
      </v-card-title>
    </v-card-item>
    <v-card-text class="fgScroll hhh2">
      <p class="pt-4">Below you can find the General Terms and Conditions (hereinafter referred to as GTC)
        applicable
        to the use of the software. By installing and using the software, you agree to the following terms.</p>

      <div class="font-weight-bold pt-4">Free Usage:</div>
      <p>The software is freely accessible, and no financial payment is required for its use.</p>

      <div class="font-weight-bold pt-4">Developer Information:</div>
      <p>The software has been created by an individual as a hobbyist developer, and no official corporate entity is
        behind it. The developer operates the project entirely voluntarily.</p>

      <div class="font-weight-bold pt-4">Local Data Storage:</div>
      <p>URLs and domain lists collected by the software are stored exclusively in local storage within the user's
        browser. This data is not transmitted or shared with third parties and is solely necessary for the
        functioning
        of the software.</p>

      <div class="font-weight-bold pt-4">Local Storage:</div>
      <p>Local storage is a web browser feature that allows for the storage of small amounts of data locally on the
        user's device. This data is accessible only within the specific browser, and other websites or applications
        cannot access it.</p>

      <div class="font-weight-bold pt-4">Disclaimer of Liability:</div>
      <p>The creator and distributor of the software do not assume any responsibility for issues or potential
        damages
        resulting from the use of the software.</p>

      <div class="font-weight-bold pt-4">Data Collection by Third Parties:</div>
      <p>It is possible that third parties may engage in data collection (e.g., through the software's distribution
        or
        donation platform). For such data collection, the user is subject to the data protection policies of the
        respective platforms.</p>

      <div class="font-weight-bold pt-4">Optional Donations:</div>
      <p>Donations are entirely optional and come with no advantages or disadvantages. Donors express their
        gratitude,
        and donations support the developer and their work.</p>

      <div class="font-weight-bold pt-4">Free Use and Customization:</div>
      <p>Anyone is free to use, customize, and modify the software according to their own preferences.</p>

      <div class="font-weight-bold pt-4">Legal Compliance:</div>
      <p>While using the software, all users are obligated to adhere to applicable laws and regulations.</p>

      <div class="font-weight-bold pt-4">User Modifications:</div>
      <p>If a user modifies the software for their own use, they are required to replace the application icon and
        any
        elements referring to the distributor or original developer. If the user distributes the modified version,
        they must do so under their own name, including on social media pages, donation pages, and signature areas
        (e.g., About page). If the user wishes to attribute the original source of the version, it is welcomed.</p>

      <p>Please be aware that decisions regarding the use of the software are made at your own discretion. If you do
        not agree with the terms outlined in the GTC, it is recommended that you do not install or use the
        software.</p>

      <p>If you have any questions or feedback about the software, I welcome your input. Contact information can be
        found on the About / Github page.</p>

      <p>The General Terms and Conditions will come into effect on September 1, 2023, and will remain in effect
        unless
        later amended or revoked.</p>

      <p>Thank you for your interest in the software, and enjoy using it!</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let scrollInvoked = ref(0);

const onScroll = () => {
  scrollInvoked.value++;
  console.log('scrollInvoked', scrollInvoked.value);
};
</script>

<style scoped lang="scss">
.hhh {
  max-height: 745px;
}
.hhh2 {
  max-height: 645px;
}

.card {
  max-height: 745px;
  overflow-y: auto;
  -ms-overflow-style: scrollbar;

  ::-webkit-scrollbar {
    width: 10px;
    display: block;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
