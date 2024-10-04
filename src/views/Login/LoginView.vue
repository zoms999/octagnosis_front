<template>
	<div class="text-center" style="margin-right: 270px; padding: 20px 0 0 0">
		<div class="form-signin border rounded">
			<h1 class="h3 mb-3 fw-normal">로그인</h1>
			<div class="form-floating">
				<input
					type="email"
					class="form-control"
					id="floatingInput"
					placeholder="name@example.com"
					@keyup.enter="submit()"
					v-model="state.form.email"
				/>
				<label for="floatingInput">Email address</label>
			</div>
			<div class="form-floating">
				<input
					type="password"
					class="form-control"
					id="floatingPassword"
					placeholder="Password"
					@keyup.enter="submit()"
					v-model="state.form.password"
				/>
				<label for="floatingPassword">Password</label>
			</div>
			<div class="checkbox mb-3 text-center">
				<label>
					<input type="checkbox" value="remember-me" @keyup.enter="submit()" />
					Remember me
				</label>
			</div>
			<button class="btn btn-lg btn-primary" @click="submit()">로그인</button>
			<p class="mt-5 mb-3 text-muted">
				&copy; Copyright 1999. 한국진로적성센터. All rights reserved.
			</p>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const state = reactive({
	form: {
		email: '',
		password: '',
	},
});

const store = useAuthStore();
const { isAuthenticated, userEmail } = storeToRefs(store);
const { login } = store;

const router = useRouter();
const submit = () => {
	axios
		.post('/api/login', state.form)
		.then(res => {
			console.log('res -->', res); // 응답 데이터 확인
			if (res.data) {
				login(res.data); // 로그인 성공 시 스토어의 login 액션 호출
				router.push({ name: 'home' });
				window.alert('로그인하였습니다.');
				console.log('LoginView isAuthenticated --' + isAuthenticated.value);
				console.log('LoginView authPersn --' + res.data.authPersn);
				console.log('LoginView mngrId --' + res.data.mngrId);
			} else {
				window.alert('로그인 정보가 존재하지 않습니다.');
			}
		})
		.catch(() => {
			window.alert('로그인 정보가 존재하지 않습니다.');
		});
};
</script>

<style lang="scss" scoped>
.form-signin {
	max-width: 440px;
	padding: 20px;
	margin: auto;
}

.form-signin .form-floating:focus-within {
	z-index: 2;
}

.form-signin input[type='email'] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
