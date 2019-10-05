import { Vue, router, store } from './boot/core'
import App from './App'

// Import Helpers for filters
import {
	count,
	atUsername,
	limitText,
	capitalizeTitle,
	postDate
} from './filters'

// Register helper items
Vue.filter('count', count)
Vue.filter('atUsername', atUsername)
Vue.filter('limitText', limitText)
Vue.filter('capitalizeTitle', capitalizeTitle)
Vue.filter('postDate', postDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
