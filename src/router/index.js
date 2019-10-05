// Route Guard/Middleware
import Guard from './guard'
import multiguard from 'vue-router-multiguard'

// import our views
const Home = () => import('@/views/Home')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Logout = () => import('@/views/Logout')
const Posts = () => import('@/views/Posts')
const CreatePost = () => import('@/views/createPost')
const UpdatePost = () => import('@/views/updatePost')
const Profile = () => import('@/views/Profile')
const Post = () => import('@/views/Post')
const Dashboard = () => import('@/views/Dashboard')
const PageNotFound = () => import('@/views/PageNotFound')

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
