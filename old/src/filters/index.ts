import moment from 'moment'

/**
 * Counts the items in an array
 *
 * @param {any} array
 * @returns {int} integer
 */
export function count (array) {
	return array.length
}

/**
 * Format the post date
 *
 * @param {any} date
 * @returns {date}
 */
export function postDate (date) {
	let _date = moment(date)
	let now = moment()
	let diffInDays = _date.from(now)
	let diffInYears = now.diff(_date, 'years')
	if (diffInYears !== 0) {
		return _date.format('MMMM Do YYYY')
	}
	if (diffInDays === 'a day ago') {
		return 'Yesterday'
	} else if (diffInDays === '2 days ago') {
		return 'Day Before Yesterday'
	}
	return _date.format('MMMM Do')
}

/**
 * Format the post title
 *
 * @param {any} title
 * @returns {string}
 */
export function capitalizeTitle (title) {
	return title
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word[0].toUpperCase() + word.substr(1)
		})
		.join(' ')
}

/**
 * Add at(@) infront of the username
 *
 * @param {any} username
 * @returns {string}
 */
export function atUsername (username) {
	return '@' + username
}

/**
 * Limit the length of text
 *
 * @param {any} text
 * @param {number} [length=200]
 * @returns {string}
 */
export function limitText (text, length = 200) {
	return text.substring(0, length) + '...'
}
