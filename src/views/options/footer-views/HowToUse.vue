<template>
  <footer-view-wrapper title="How to Use">
    <div class="font-weight-bold">How to Use Focus Guard?</div>
    <p class="pt-4">How to Start a 'Focus Session'?</p>
    <ul class="list-disc pl-8">
      <li>Click the extension icon in the browser toolbar.</li>
      <li>Click the 'On' button.</li>
      <li>The extension will redirect you to the built-in focus page/message.</li>
      <li>You can add new websites to the list during the 'Focus Session'.</li>
    </ul>

    <p class="pt-4">How to End a 'Focus Session'?</p>
    <ul class="list-disc pl-8">
      <li>Click the extension icon in the browser toolbar.</li>
      <li>Click the 'Off' button.</li>
    </ul>

    <!-- Add other instructions similarly -->

    <p class="pt-4 font-weight-bold">How to Use 'Focus Guard' in 'Incognito Mode'?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click the 'Manage Extension' option.</li>
      <li>Scroll down to the 'Allow in Incognito' option and check the checkbox. To undo, simply switch it off at
        the
        same place.
      </li>
    </ul>

    <p class="pt-4 font-weight-bold">How to Remove 'Focus Guard' from the Browser?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Remove from Chrome' option.</li>
    </ul>

    <p class="pt-4 font-weight-bold">How change the language of the extension?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the wrench icon in the bottom of the sidebar.</li>
      <li>Choose the language from the list</li>
    </ul>

    <p class="pt-4 font-weight-bold">How add custom language - method 1</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the wrench icon in the bottom of the sidebar.</li>
      <li>Choose the 'Add custom language' from the list</li>
      <li>Download the english language from the dialog, and upload the translated language</li>
      <li>You can use for the translation an ai chat tool, By copy pasting the files content to the chat tool, and
        for example ask "please translate this json object to hungarian" or your disared language
      </li>
    </ul>

    <p class="pt-4 font-weight-bold">How add custom language - method 2</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the wrench icon in the bottom of the sidebar.</li>
      <li>Duplicate a language from the menu list from actions column</li>
      <li>Edit the duplicated language</li>
      <li>You can edit directly at the textarea, copy-paste directly there the translation, without using the download -
        upload method
      </li>
    </ul>

    <p class="pt-4 font-weight-bold">How edit a custom language</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the wrench icon in the bottom of the sidebar.</li>
      <li>Edit the language from the list, - by clicking the the pencil from the actions column</li>
      <li>You can edit directly at the textarea, copy-paste directly there the translation, without using the download -
        upload method. But you can use the download - upload method as well.
      </li>
    </ul>

    <p class="pt-4 font-weight-bold">How to edit the json file directly?</p>
    <ul class="list-disc pl-8">
      <li>Use a simple text editor, like notepad, or notepad++, or vscode, or any other text editor</li>
      <li>Open the file, and edit the content</li>
      <li>Save the file</li>
    </ul>

    <p class="pt-4 font-weight-bold">How to change light mode to dark mode?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the wrench icon in the bottom of the sidebar.</li>
      <li>Choose the 'Dark mode' / 'Light mode' from the bottom of the settings sidebar</li>
    </ul>

    <p class="pt-4 font-weight-bold">How to see teh data usage of the extension?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the chart icon in the bottom of the sidebar.</li>
      <li>Choose the 'Data usage' from the bottom of the settings sidebar</li>
      <li>Here you can see the data by cathegorires use by the extension. Please Note. the size of the application is
        not
        included here.
      </li>
    </ul>

    <p class="pt-4 font-weight-bold">How to see past distraction attempts?</p>
    <ul class="list-disc pl-8">
      <li>Right-Click the extension icon in the browser toolbar.</li>
      <li>Click 'Options' option.</li>
      <li>Choose the chart icon in the bottom of the sidebar.</li>
      <li>Choose the 'Distraction attempts' from the bottom of the settings sidebar</li>
      <li>Here you can see the past distraction attempts, and the time when the extension blocked the page, and the
        reason why the page was blocked.
      </li>
    </ul>



    <p class="pt-4 font-weight-bold">How to Use Focus Guard? (Video) English</p>
    <a href="https://www.youtube.com/watch?v=EsUjbbI75Io"
       target="_blank">https://www.youtube.com/watch?v=EsUjbbI75Io</a>

    <p class="pt-4 font-weight-bold">How to Use Focus Guard? (Video) Hungarian</p>
    <a href="https://www.youtube.com/watch?v=7LSU5hTgSmc"
       target="_blank">https://www.youtube.com/watch?v=7LSU5hTgSmc</a>
  </footer-view-wrapper>
</template>

<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
</script>

<style scoped lang="scss">

</style>
