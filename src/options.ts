/**
 * options.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import Options from './apps/Options.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from './plugins'

const options = createApp(Options)

registerPlugins(options)

options.mount('#options')
