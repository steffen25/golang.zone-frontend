import { Router } from './vue'
import routes from '../router'

const router = new Router({
	routes: routes,
	mode: 'history',
	linkExactActiveClass: 'active',
	scrollBehavior: function (to, from, savedPosition) {
		return savedPosition || { x: 0, y: 0 }
	}
})

export default router
