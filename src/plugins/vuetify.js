import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'fa',
      },
      theme: {
        themes: {
          light: {
            primary: '#4caf50',
          //  secondary: '#b0bec5',
        //    accent: '#8c9eff',
        //    error: '#b71c1c',
          },
        },
      },
});
