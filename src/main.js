import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { faSun, faMoon, faHouse, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSun, faMoon, faHouse, faKeyboard)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
