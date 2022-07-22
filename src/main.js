import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
//import firebase from 'firebase'

Vue.config.productionTip = false

//firebase.initializeApp(
 // {
  //  apiKey: "AIzaSyCVQcDprAJ5aN3KKmvdRL_xNw6wSpG2uNQ",
  //  authDomain: "donation-management-f564a.firebaseapp.com",
  //  projectId: "donation-management-f564a",
  //  storageBucket: "donation-management-f564a.appspot.com",
  //  messagingSenderId: "147248109523",
 //   appId: "1:147248109523:web:8c68024cbaeb8281e1c126",
  //  measurementId: "G-D9DYBF2TG2"
 // }
//);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
