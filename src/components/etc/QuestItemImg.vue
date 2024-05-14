<template>
	<img :src="getImageUrl()" alt="이미지" />
</template>

<script setup>
const getImageUrl = () => {
	// public 폴더 내의 이미지 경로를 반환합니다.
	return '/img/example.jpg';
};
</script>
