import { octag } from '.';

export function getPosts(params) {
	return octag.get('/', { params });
}

export function getPostById(id) {
	return octag.get(`/${id}`);
}

export function createPost(data) {
	return octag.post('', data);
}

export function updatePost(id, data) {
	return octag.put(`/${id}`, data);
}

export function deletePost(id) {
	return octag.delete(`/${id}`);
}
