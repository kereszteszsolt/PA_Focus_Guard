<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/store';
import { c as r_msg } from '@/_locales/restricted';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;

const supportActions = [
  { label: r_msg.SUPPORT_BUY_COFFEE, icon: 'mdi-coffee', url: 'https://www.buymeacoffee.com/kereszteszsolt', primary: true },
  { label: r_msg.SUPPORT_FOLLOW, icon: 'mdi-web', url: 'https://kereszteszsolt.hu/#links' },
  { label: r_msg.SUPPORT_REVIEW, icon: 'mdi-star-outline', url: 'https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill' },
];
const discoverActions = [
  { label: 'kereszteszsolt.hu', icon: 'mdi-web', url: 'https://kereszteszsolt.hu/', translate: false },
  { label: r_msg.SUPPORT_EXPLORE, icon: 'mdi-compass-outline', url: 'https://kereszteszsolt.hu/#products', translate: true },
];
</script>

<template>
  <v-sheet color="background" class="support-page footer-view fgScroll border-top-radius-8">
    <section class="support-card support-overview" aria-labelledby="support-title">
      <div class="support-heading">
        <span class="support-heading__icon" aria-hidden="true"><v-icon>mdi-coffee-outline</v-icon></span>
        <h1 id="support-title">{{ tr(r_msg.WAYS_TO_SUPPORT) }}</h1>
      </div>
      <div class="support-actions">
        <div class="support-actions__row">
          <v-btn v-for="action in supportActions" :key="action.url" :href="action.url" target="_blank" rel="noopener noreferrer"
                 :variant="action.primary ? 'flat' : 'outlined'" :color="action.primary ? '#ff813f' : undefined"
                 class="support-action text-none" :class="{ 'support-action--primary': action.primary }">
            <v-icon start size="18">{{ action.icon }}</v-icon>{{ tr(action.label) }}
          </v-btn>
        </div>
        <div class="support-actions__row">
          <v-btn v-for="action in discoverActions" :key="action.url" :href="action.url" target="_blank" rel="noopener noreferrer"
                 variant="outlined" class="support-action text-none">
            <v-icon start size="18">{{ action.icon }}</v-icon>{{ action.translate ? tr(action.label) : action.label }}
          </v-btn>
        </div>
      </div>
    </section>

    <section class="support-card support-notice">
      <v-icon class="support-notice__icon" size="24" aria-hidden="true">mdi-information-outline</v-icon>
      <p>{{ tr(r_msg.SUPPORT_NOTICE) }}</p>
    </section>

  </v-sheet>
</template>

<style scoped lang="scss">
.support-page {
  flex: 1;
  min-height: 0;
  padding: 20px;
  color: rgb(var(--v-theme-on-background));
}

.support-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 12px;
  background: rgba(var(--v-theme-primary), 0.025);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
}

.support-overview {
  padding: 16px;
}

.support-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  h1 {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));
  }
}

.support-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }
}

.support-action {
  min-height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: normal;

  &:not(.support-action--primary) {
    border-color: rgba(var(--v-theme-primary), 0.45);
    background: rgba(var(--v-theme-primary), 0.04);
    color: inherit;
  }

  &:focus-visible {
    outline: 2px solid rgb(var(--v-theme-on-background));
    outline-offset: 3px;
  }
}

.support-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;

  &__icon {
    flex-shrink: 0;
    color: rgb(var(--v-theme-primary));
  }
}

</style>
