import axios from 'axios'

export const api = axios.create({
	baseURL: 'https://golang.zone/api/v1/',
	headers: {
		Authorization: 'Bearer {token}'
	}
})
