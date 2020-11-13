import Vue from 'vue'
import App from './App.vue'
import store from './store'

import genitive from '@/filters/genitive.filter'
import FilterWrapper from '@/components/FilterWrapper'

Vue.config.productionTip = false

Vue.component('FilterWrapper', FilterWrapper)
Vue.filter('genitive', genitive)

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')
