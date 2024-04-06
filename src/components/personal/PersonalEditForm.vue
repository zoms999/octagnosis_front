<template>
	<div class="ActionBtn">
		<div></div>
		<div>
			<button class="btn btn-primary me-2" @click="edit">수정</button>
			<button class="btn btn-secondary" @click="$emit('GoBack')">
				목록으로
			</button>
		</div>
	</div>
	<div class="Tit1">
		<div>개인 기본정보</div>
		<div></div>
	</div>
	<div class="container ItemBox">
		<div class="row">
			<div class="col-1 lbl">아이디</div>
			<div class="col-2">
				<div class="input-group">
					<input type="text" class="form-control" v-model="personal.AcuntId" />
				</div>
			</div>
			<div class="col-1 lbl">비밀번호</div>
			<div class="col-2">
				<div class="input-group">
					<input
						id="pw"
						:type="passwordFieldType"
						class="form-control"
						:value="personal.Pw"
						@input="$emit('update:pw', $event.target.value)"
					/>
					<button class="button" @click.prevent="togglePasswordVisibility">
						<span class="icon">
							<i
								class="bi"
								:class="{
									'bi-eye-slash': showPassword,
									'bi-eye-fill': !showPassword,
								}"
							></i>
						</span>
					</button>
					<slot name="actionsPw"> </slot>
				</div>
			</div>
			<div class="col-1 lbl">가입일</div>
			<div class="col-2">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						v-model="personal.PersnInsDt"
					/>
				</div>
			</div>
			<div class="col-1 lbl">사용기한</div>
			<div class="col-2">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						v-model="personal.PersnInsDt"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	personal: Object,
});

const showPassword = ref(false);
const passwordFieldType = ref('password');
const togglePasswordVisibility = () => {
	console.log(showPassword.value);
	showPassword.value = !showPassword.value;
	passwordFieldType.value = showPassword.value ? 'text' : 'password';
};
</script>

<style lang="scss" scoped></style>
