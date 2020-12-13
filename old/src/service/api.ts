import axios from 'axios'
import {
	getAuthToken,
	clearAuthToken,
	setRefreshToken,
	setAccessToken,
	refreshTokenMinLeft,
} from '@/service/authService'

const api = axios.create({
	baseURL: 'https://golang.zone/api/v1/',
	timeout: 15000,
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('authToken')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response.status === 401) {
			let token = refreshTokenMinLeft()
			if (token <= 0) window.location = '/login'
			if (token > 0 && token <= 5) {
				api
					.get('auth/refresh', {
						headers: {
							Authorization: `Bearer ` + localStorage.getItem('refreshToken')
						}
					})
					.then(({ data }) => {
						if (getAuthToken) clearAuthToken()
						setRefreshToken(data.data.refreshToken)
						setAccessToken(data.data.accessToken)
					})
			}
		}
	}
)

export default api
