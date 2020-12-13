import api from './api'

export function createPost (post) {
	return api.post('posts', {
		title: post.title,
		body: post.body
	})
}

export function updatePost (post) {
	return api.put(`posts/${post.id}`, {
		title: post.title,
		body: post.body
	})
}
