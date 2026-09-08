<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18nStore } from '@/store';
import { c as r_msg } from '@/_locales/restricted';

defineProps<{ compact?: boolean }>();

const currentYear = new Date().getFullYear();
const version = chrome.runtime.getManifest().version;
const websiteDialog = ref(false);
const i18n = useI18nStore();
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;
</script>

<template>
  <footer class="footer-attribution" :class="{ 'footer-attribution--compact': compact }">
    <p class="footer-attribution__credit">Focus Guard © {{ currentYear }} · Keresztes Zsolt</p>
    <span class="footer-attribution__separator" aria-hidden="true">·</span>
    <p class="footer-attribution__meta">Version: {{ version }} · Free Software. Open source.</p>
    <span class="footer-attribution__separator" aria-hidden="true">·</span>
    <v-dialog v-model="websiteDialog" max-width="440" aria-labelledby="developer-website-title"
              aria-describedby="developer-website-description">
      <template v-slot:activator="{ props }">
        <button v-bind="props" type="button" class="footer-attribution__website">
          kereszteszsolt.hu
        </button>
      </template>
      <v-card color="background" class="website-dialog">
        <v-card-title>
          <h2 id="developer-website-title" class="website-dialog__title">{{ tr(r_msg.DEVELOPER_WEBSITE_TITLE) }}</h2>
        </v-card-title>
        <v-card-text>
          <p id="developer-website-description">{{ tr(r_msg.DEVELOPER_WEBSITE_DESCRIPTION) }}</p>
          <p class="website-dialog__languages">{{ tr(r_msg.DEVELOPER_WEBSITE_LANGUAGES) }}</p>
          <p class="website-dialog__destination">kereszteszsolt.hu</p>
        </v-card-text>
        <v-card-actions class="website-dialog__actions">
          <v-btn variant="text" color="info" class="text-none" @click="websiteDialog = false">
            {{ tr(r_msg.DEVELOPER_WEBSITE_CANCEL) }}
          </v-btn>
          <v-btn href="https://kereszteszsolt.hu/" target="_blank" rel="noopener noreferrer"
                 variant="tonal" color="info" class="text-none" @click="websiteDialog = false">
            {{ tr(r_msg.DEVELOPER_WEBSITE_CONTINUE) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </footer>
</template>

<style scoped lang="scss">
.footer-attribution {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid rgba(var(--v-theme-info), 0.12);
  color: rgb(var(--v-theme-info));

  &__credit,
  &__meta,
  &__website,
  &__separator {
    color: inherit;
    font-family: inherit;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.5;
    white-space: nowrap;
  }

  &__website {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
    text-underline-offset: 3px;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
  }

  &--compact {
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding-top: 8px;
    text-align: center;

    .footer-attribution__website {
      font-weight: 500;
    }

    .footer-attribution__separator {
      display: none;
    }
  }
}

.website-dialog {
  :deep(.v-card-title) {
    flex-shrink: 0;
  }

  :deep(.v-card-text) {
    min-height: 0;
    overflow-y: auto;
  }

  &__languages {
    margin-top: 12px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    white-space: normal;
  }

  &__destination {
    margin-top: 12px;
    font-size: 13px;
    opacity: 0.75;
  }

  &__actions {
    flex-shrink: 0;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 16px 16px;
  }
}
</style>
