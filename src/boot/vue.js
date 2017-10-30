import Vue from 'vue'

/**
 * Vue Plugins
 */
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueProgressBar from 'vue-progressbar'
import Vue2Filters from 'vue2-filters'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import Meta from 'vue-meta'

/**
 * Temp fix for bootstrap-vue
 */
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

/**
 * Register helper plugins
 */
const plugins = [
	Router,
	BootstrapVue,
	Meta,
	Vue2Filters,
	Notifications,
	VeeValidate,
	VueProgressBar,
	{
		color: '#19B5FE',
		failedColor: '#19B5FE',
		height: '5px'
	}
]
plugins.forEach(Plugin => Vue.use(Plugin))

export { Vue, Router }
