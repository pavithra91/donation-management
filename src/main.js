import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import VueSocialSharing from 'vue-social-sharing'
import VueSession from "vue-session"




Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons
library.add(fab)

Vue.use(VueSocialSharing);
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
