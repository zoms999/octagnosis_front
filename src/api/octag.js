import { octag } from '.';

export function getPosts(params) {
	return octag.get('/', { params });
}

export function getPostById(mngrId) {
	return octag.get(`/${mngrId}`);
}

export function createPost(data) {
	return octag.post('', data);
}

export function updatePost(mngrId, data) {
	return octag.put(`/${mngrId}`, data);
}

export function deletePost(mngrId) {
	return octag.delete(`/${mngrId}`);
}
