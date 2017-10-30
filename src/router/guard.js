import store from '../store'
import axios from 'axios'

import {
	clearAuthToken,
	setRefreshToken,
	setAccessToken,
	refreshTokenMinLeft,
	authTokenMinLeft
} from '@/service/authService'

const refresh = axios.create({
	baseURL: 'https://golang.zone/api/v1/',
	timeout: 15000,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

refresh.interceptors.request.use(
	config => {
		const token = localStorage.getItem('refreshToken')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default {
	checkAuthToken (to, from, next) {
		let authToken = localStorage.getItem('authToken')
		let refreshToken = localStorage.getItem('refreshToken')
		console.log('authTokenMinLeft -> ', authTokenMinLeft())
		// check if no access token but a valid refresh token
		if (!authToken && refreshToken && refreshTokenMinLeft() > 0) {
			refresh
				.get('auth/refresh')
				.then(({ data }) => {
					if (authToken) clearAuthToken()
					setRefreshToken(data.data.refreshToken)
					setAccessToken(data.data.accessToken)
				})
				.catch(error => {
					console.log(error)
					clearAuthToken()
				})
		}
		if (authToken && authTokenMinLeft() > 0 && authTokenMinLeft() <= 5) {
			refresh
				.get('auth/refresh')
				.then(({ data }) => {
					if (authToken) clearAuthToken()
					setRefreshToken(data.data.refreshToken)
					setAccessToken(data.data.accessToken)
				})
				.catch(error => {
					console.log(error)
					clearAuthToken()
				})
		}
		if (!refreshToken || refreshTokenMinLeft() <= 0) clearAuthToken()
		next()
	},
	guest (to, from, next) {
		if (store.getters.isLoggedIn) {
			next()
		}
	},
	authUser (to, from, next) {
		if (!store.getters.isLoggedIn) {
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else if (
			(to.path === '/login' || to.path === '/register') &&
      store.getters.isLoggedIn
		) {
			// Let's not allow a login or register transition if we're already logged in
			next('/')
		}

		next()
	},
	authAdmin (to, from, next) {
		if (!store.getters.isLoggedIn || !store.getters.isAdmin) {
			next('/')
		}
		next()
	}
}
