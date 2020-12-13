/**
 * Gets state of loading
 * @param {*state} state
 * @returns {loading|*|boolean}
 */
const loading = state => {
	return state.auth.loading
}

/**
 * Gets state token value
 * @param {*state} state
 * @returns {token|*|null}
 */
const token = state => {
	return state.auth.token
}

/**
 * Gets the user value of the state
 * @param {*state} state
 * @returns {*}
 */
const user = state => {
	return state.auth.user
}

/**
 * Get isLoggedIn value, if there is a loggedin user
 * @param {*state} state
 * @returns {isLoggedIn|*|boolean}
 */
const isLoggedIn = state => {
	return state.auth.isLoggedIn
}

export default {
	loading,
	token,
	user,
	isLoggedIn
}
