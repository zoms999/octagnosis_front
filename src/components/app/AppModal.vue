<template>
	<Transition>
		<div v-if="modelValue">
			<div
				class="modal-backdrop fade __web-inspector-hide-shortcut__ show"
			></div>

			<div
				class="modal fade show d-block"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div
					class="modal-dialog"
					:style="{ maxWidth: width + 'px !important' }"
				>
					<div class="modal-content">
						<div class="modal-header">
							<slot name="header">
								<h1 class="modal-title fs-5" id="exampleModalLabel">
									{{ title }}
								</h1>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
									@click="$emit('update:modelValue', false)"
								></button>
							</slot>
						</div>
						<div class="modal-body">
							<slot></slot>
						</div>
						<div class="modal-footer">
							<slot name="actions"> </slot>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>

<script setup>
defineProps({
	modelValue: Boolean,
	title: {
		type: String,
	},
	width: {
		type: String,
	},
});
defineEmits(['close', 'update:modelValue']);
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: all 0.3s ease;
}
.v-enter-to,
.v-leave-from {
	opacity: 1;
}
</style>
