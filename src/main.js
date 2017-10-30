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

let originalVueComponent = Vue.component
Vue.component = function (name, definition) {
	if (
		name === 'bFormCheckboxGroup' ||
    name === 'bCheckboxGroup' ||
    name === 'bCheckGroup' ||
    name === 'bFormRadioGroup'
	) {
		definition.components = { bFormCheckbox: definition.components[0] }
	}
	originalVueComponent.apply(this, [name, definition])
}

// Register helper items
Vue.filter('count', count)
Vue.filter('atUsername', atUsername)
Vue.filter('limitText', limitText)
Vue.filter('capitalizeTitle', capitalizeTitle)
Vue.filter('postDate', postDate)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
