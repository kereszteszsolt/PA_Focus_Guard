<script setup lang="ts">
import { computed } from 'vue';
import { FooterViewWrapper } from '@/views/options';
import { useI18nStore } from '@/store';
import { c as r_msg } from '@/_locales/restricted';

const i18n = useI18nStore();
i18n.fetchLocaleSettingsAndMessages();
const tr = (key: string) => computed(() => i18n.getRestrictedTranslation(key)).value;

const contactLinks = [
  {
    id: 'website', icon: 'mdi-web', title: r_msg.CONTACT_WEBSITE_TITLE,
    description: r_msg.CONTACT_WEBSITE_DESCRIPTION,
    url: 'https://kereszteszsolt.hu/', label: 'kereszteszsolt.hu',
  },
  {
    id: 'links', icon: 'mdi-link-variant', title: r_msg.CONTACT_LINKS_TITLE,
    description: r_msg.CONTACT_LINKS_DESCRIPTION,
    url: 'https://kereszteszsolt.hu/#links', label: 'kereszteszsolt.hu/#links',
  },
  {
    id: 'webstore', icon: 'mdi-puzzle-outline', title: r_msg.CONTACT_WEBSTORE_TITLE,
    description: r_msg.CONTACT_WEBSTORE_DESCRIPTION,
    url: 'https://chromewebstore.google.com/detail/focus-guard/bdfnblnbjckkhknignkpmckeelfplill',
    label: 'Focus Guard · Chrome Web Store',
  },
];
</script>

<template>
  <footer-view-wrapper :title="tr(r_msg.CONTACT)" class="contact-page footer-view">
    <div class="contact-links">
      <article v-for="link in contactLinks" :key="link.id" class="contact-card" :aria-labelledby="`contact-${link.id}`">
        <span class="contact-card__icon" aria-hidden="true"><v-icon :icon="link.icon" size="24" /></span>
        <div class="contact-card__content">
          <h2 :id="`contact-${link.id}`">{{ tr(link.title) }}</h2>
          <p>{{ tr(link.description) }}</p>
          <a :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
        </div>
      </article>
    </div>
  </footer-view-wrapper>
</template>

<style scoped lang="scss">
.contact-links {
  display: grid;
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border: 1px solid rgba(var(--v-theme-primary), 0.22);
  border-radius: 12px;
  background: rgba(var(--v-theme-primary), 0.025);
  color: rgb(var(--v-theme-on-background));

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

  &__content {
    min-width: 0;
  }

  h2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
  }

  p {
    margin: 6px 0 10px;
    font-size: 14px;
    line-height: 1.6;
  }

  a {
    color: rgb(var(--v-theme-info));
    font-size: 14px;
    line-height: 1.5;
    overflow-wrap: anywhere;
    text-decoration: none;
    text-underline-offset: 3px;

    &:hover {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
  }
}
</style>
