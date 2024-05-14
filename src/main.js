import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import router from './router/index.js';
import VuePaginate from 'vue-paginate';
loadFonts();

createApp(App)
  .use(createPinia())
  .use(vuetify)
  .use(router)
  .use(VuePaginate)
  .mount('#app');
