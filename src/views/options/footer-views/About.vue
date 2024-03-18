<template>
  <footer-view-wrapper title="About">
    <p class="mb-2">
      This extension helps you stay focused when you want to learn or work on something important by blocking
      distractive desires and showing a focused message instead of the desired page based on rules defined in the
      website rules section.
    </p>
    <ul class="pa-4">
      <li class="mb-1"><p>
        The following link allows you to check an extension on the Chrome store and find the latest information and the
        most actual contact email.
        Link: <a href="https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill"
                 target="_blank">Focus Guard</a>
      </p></li>
      <li class="mb-1"><p>
        You can see or lay with the source code on the following GitHub Link:
        Link: <a href="https://github.com/kereszteszsolt/PA_Focus_Guard" target="_blank">GitHub</a>
      </p></li>
      <li class="mb-1">
        <p>
          For contacts or follow-up, please consult the contacts page. Got to contact:
          <v-router-link to="/contact">Contact</v-router-link>
        </p>
        <p>Focus Guard © 2024 - Keresztes Zsolt - Version: 2.0.0 - Free Software. Open Source.</p></li>
    </ul>


    <p>Keresztes Zsolt,
      Cluj-Napoca 2024</p>

  </footer-view-wrapper>
</template>

<script setup lang="ts">
import { FooterViewWrapper } from '@/views/options';
</script>

<style scoped lang="scss">

</style>
