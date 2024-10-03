<template>
	<header class="header">
		<div
			class="container-fluid d-flex justify-content-between align-items-center"
		>
			<div class="header-left">
				<img src="@/assets/img/logo3.png" alt="로고" class="logo" />
			</div>
			<div class="header-right">
				<div v-if="isAuthenticated" class="user-info">
					<span class="welcome-text">{{ userEmail }}님 환영합니다</span>
					<button @click="handleLogout" class="logout-btn">로그아웃</button>
				</div>
				<div v-else>
					<router-link to="/login" class="login-link">로그인</router-link>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const store = useAuthStore();
const { userEmail, userMngrId, isAuthenticated } = storeToRefs(store);
const { logout } = store;
const router = useRouter();

const emailFromStorage = sessionStorage.getItem('email');
if (emailFromStorage) {
	isAuthenticated.value = true;
	userEmail.value = emailFromStorage;
	userMngrId.value = sessionStorage.getItem('mngrId');
} else {
	isAuthenticated.value = false;
	userEmail.value = null;
	userMngrId.value = null;
}
console.log('userMngrId ->' + userMngrId.value);
const handleLogout = () => {
	logout();
	router.push({ name: 'login' });
};
</script>

<style scoped>
.header {
	background-color: #34495e;
	padding: 10px 0;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
	width: 180px;
	height: auto;
	margin-left: 15px;
}

.header-right {
	display: flex;
	align-items: center;
	margin-right: 15px;
}

.user-info {
	display: flex;
	align-items: center;
}

.welcome-text {
	color: #ecf0f1;
	margin-right: 15px;
	font-size: 14px;
}

.logout-btn,
.login-link {
	background-color: #3498db;
	color: white;
	border: none;
	padding: 8px 15px;
	border-radius: 4px;
	font-size: 14px;
	text-decoration: none;
	transition: background-color 0.3s ease;
}

.logout-btn:hover,
.login-link:hover {
	background-color: #2980b9;
}
</style>
