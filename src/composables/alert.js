import { ref } from 'vue';

const alerts = ref([]);
export function useAlert() {
	const vAlert = (msg, type = 'error') => {
		alerts.value.push({ msg, type });

		setTimeout(() => {
			alerts.value.shift();
		}, 2000);
	};

	const vSuccess = msg => {
		vAlert(msg, 'success');
	};
	return {
		alerts,
		vAlert,
		vSuccess,
	};
}
