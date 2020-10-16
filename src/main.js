import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vuelidate import
import Vuelidate from 'vuelidate'

// fontawesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fontawesome import
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faSpinner);



// Vuelidate use
Vue.use(Vuelidate)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
