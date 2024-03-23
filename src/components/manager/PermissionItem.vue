<template>
	<div class="row">
		<div class="col-1 lbl">{{ label }}</div>
		<div class="col-3 d-flex">
			<div
				class="btn-group"
				role="group"
				aria-label="Basic radio toggle button group"
			>
				<input
					type="radio"
					:class="['btn-check', { active: permission === 'none' }]"
					name="permission"
					:id="`${label}None`"
					autocomplete="off"
					v-model="permission"
					value="none"
				/>
				<label :for="`${label}None`" class="btn btn-outline-primary"
					>없음</label
				>

				<input
					type="radio"
					:class="['btn-check', { active: permission === 'view' }]"
					name="permission"
					:id="`${label}View`"
					autocomplete="off"
					v-model="permission"
					value="view"
				/>
				<label :for="`${label}View`" class="btn btn-outline-primary"
					>보기</label
				>

				<input
					type="radio"
					:class="['btn-check', { active: permission === 'write' }]"
					name="permission"
					:id="`${label}Write`"
					autocomplete="off"
					v-model="permission"
					value="write"
				/>
				<label :for="`${label}Write`" class="btn btn-outline-primary"
					>쓰기</label
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// props로 전달받은 label과 permission을 선언합니다.
const { label, modelValue } = props;
const permission = ref(modelValue);

// permission 값이 변경될 때마다 이벤트를 발생시킵니다.
watch(
	() => permission.value,
	newValue => {
		emit('update:modelValue', newValue);
	},
);
</script>

<style lang="scss" scoped>
// 원하는 스타일을 적용할 수 있습니다.
.lbl {
	// 레이블 스타일링
}

.btn-check {
	// 버튼 체크 스타일링
}

.active {
	// 활성 상태 스타일링
}
</style>
