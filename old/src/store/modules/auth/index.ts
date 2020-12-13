import {
	login,
	isLoggedIn,
	isUser,
	isAdmin,
	logout,
	register
} from '@/service/authService'

const state = {
	isLoggedIn: isLoggedIn(),
	user: isUser(),
	admin: isAdmin(),
	loading: false,
	errors: []
}

const mutations = {
	// Login
	LOGIN_REQUEST (state, payload) {
		state.loading = payload
	},
	LOGIN_SUCCESS (state, payload) {
		state.isLoggedIn = payload.isLoggedIn
		state.user = payload.user
		state.admin = payload.admin
	},
	LOGIN_FAILED (state, payload) {
		state.errors = payload
	},
	// Logout
	LOGOUT_REQUEST (state, payload) {
		state.loading = payload
	},
	LOGOUT_SUCCESS (state, payload) {
		state.isLoggedIn = payload.isLoading
		state.user = payload.user
		state.loading = payload.loading
		state.admin = payload.admin
	},
	LOGOUT_FAILED (state, payload) {
		state.loading = payload
	},
	// Register
	REGISTER_REQUEST (state, payload) {
		state.loading = payload
	},
	REGISTER_SUCCESS (state, payload) {
		state.loading = payload
	},
	REGISTER_FAILED (state, payload) {
		state.loading = payload
	}
}

const actions = {
	registerUser ({ commit }, payload) {
		commit('REGISTER_REQUEST', true)
		return new Promise((resolve, reject) => {
			register(payload)
				.then(() => {
					commit('REGISTER_REQUEST', false)
					commit('REGISTER_SUCCESS', false)
					resolve()
				})
				.catch(() => {
					commit('REGISTER_REQUEST', false)
					reject()
				})
		})
	},
  // eslint-disable-next-line no-unused-vars
	logoutUser ({ commit }, payload) {
		commit('LOGOUT_REQUEST', true)
		return new Promise((resolve, reject) => {
			logout()
				.then(() => {
					commit('LOGOUT_REQUEST', false)
					commit('LOGOUT_SUCCESS', {
						isLoggedIn: false,
						user: {},
						loading: false
					})
					resolve()
				})
				.catch(() => {
					commit('LOGOUT_REQUEST', false)
					reject()
				})
		})
	},
	loginUser ({ commit }, payload) {
		commit('LOGIN_REQUEST', true)
		return new Promise((resolve, reject) => {
			login(payload)
				.then(user => {
					commit('LOGIN_REQUEST', false)
					commit('LOGIN_SUCCESS', {
						isLoggedIn: true,
						user: user.data.data.user,
						admin: user.data.data.user.admin
					})
					resolve(user)
				})
				.catch(error => {
					commit('LOGIN_REQUEST', false)
					commit('LOGIN_FAILED', error)
					reject(error)
				})
		})
	}
}

const getters = {
	isLoggedIn: state => state.isLoggedIn,
	isLoading: state => state.loading,
	isAdmin: state => state.admin,
	getUser: state => state.user
}

const module = {
	state,
	mutations,
	actions,
	getters
}

export default module
