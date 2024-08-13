import { ref } from 'vue';
import { useBase64 } from '@vueuse/core';

export function useBase64Utils() {
	const base64 = ref('');

	const encodeBase64 = text => {
		try {
			const utf8Bytes = new TextEncoder().encode(text);
			const base64String = btoa(String.fromCharCode(...utf8Bytes));

			base64.value = base64String;
			return base64.value;
		} catch (error) {
			console.error('Failed to encode text:', error);
			return '';
		}
	};

	const decodeBase64 = text => {
		try {
			const decodedString = atob(text);
			// Convert the decoded string back to UTF-8
			const utf8Bytes = new Uint8Array(
				[...decodedString].map(char => char.charCodeAt(0)),
			);
			const decodedUtf8String = new TextDecoder().decode(utf8Bytes);
			base64.value = decodedUtf8String;
			return base64.value;
		} catch (error) {
			console.error('Failed to decode text:', error);
			return '';
		}
	};

	return {
		encodeBase64,
		decodeBase64,
	};
}
