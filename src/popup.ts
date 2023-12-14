/**
 * popup.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import Popup from './apps/Popup.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'

const popup = createApp(Popup)

registerPlugins(popup)

popup.mount('#popup')
