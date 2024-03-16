import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		userEmail: null,
	}),
	actions: {
		login(userEmail) {
			this.isAuthenticated = true;
			this.userEmail = userEmail;
			sessionStorage.setItem('email', userEmail);
		},
		logout() {
			this.isAuthenticated = false;
			this.userEmail = null;
			sessionStorage.removeItem('email');
		},
	},
});
