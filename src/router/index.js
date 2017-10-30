// Route Guard/Middleware
import Guard from './guard'
import multiguard from 'vue-router-multiguard'

// import our views
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Logout from '@/views/Logout'
import Posts from '@/views/Posts'
import CreatePost from '@/views/createPost'
import UpdatePost from '@/views/updatePost'
import Profile from '@/views/Profile'
import Post from '@/views/Post'
import Dashboard from '@/views/Dashboard'
import PageNotFound from '@/views/PageNotFound'

/**
 * Routes
 */
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		beforeEnter: Guard.checkAuthToken
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
		beforeEnter: multiguard([Guard.authUser, Guard.checkAuthToken])
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/@:id',
		name: 'Profile',
		component: Profile,
		beforeEnter: Guard.checkAuthToken
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout
	},
	{
		path: '/posts/:page(\\d+)?',
		name: 'index.posts',
		component: Posts,
		beforeEnter: Guard.checkAuthToken,
		meta: {
			scrollToTop: true
		}
	},
	{
		path: '/post/create',
		name: 'create.post',
		component: CreatePost,
		beforeEnter: multiguard([Guard.authAdmin, Guard.checkAuthToken])
	},
	{
		path: '/post/:slug/update',
		name: 'update.post',
		component: UpdatePost,
		beforeEnter: multiguard([Guard.authAdmin, Guard.checkAuthToken])
	},
	{
		path: '/post/:slug?',
		name: 'show.post',
		component: Post,
		beforeEnter: Guard.checkAuthToken
	},
	{
		path: '/page-not-found',
		name: 'PageNotFound',
		component: PageNotFound,
		beforeEnter: Guard.checkAuthToken
	},
	{
		path: '*',
		redirect: '/page-not-found'
	}
]

export default routes
