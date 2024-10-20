<template>
	<AppError v-if="error" :message="error.message"></AppError>
	<template v-else>
		<table
			class="table table-bordered Tbl1"
			id="dataTable"
			width="100%"
			cellspacing="0"
		>
			<thead>
				<tr>
					<th class="w60">순번</th>
					<th>기관명</th>
					<th class="w170">사업자번호</th>
					<th class="w160">연락처</th>
					<th class="w150">대표</th>
					<th class="w250">책임자명</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(item, idx) in OrgList"
					:key="item.LogId"
					@click="setOrg(item)"
					class="Poit"
				>
					<td>{{ ++idx }}</td>
					<td>{{ item.CompyNm }}</td>
					<td>{{ item.BizNum }}</td>
					<td>{{ item.Tel1 }}</td>
					<td>{{ item.CeoNm }}</td>
					<td>{{ item.MngerNm1 }}({{ item.MngerPhone1 }})</td>
				</tr>
			</tbody>
			<tfoot></tfoot>
		</table>
	</template>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { useAlert } from '@/hooks/useAlert';

const { vAlert, vSuccess } = useAlert();

// Props / Emit  ****************************

const Props = defineProps({
	OrgList: { type: Array, default: () => [] },
});

var Emits = defineEmits(['update:modelValue', 'setOrg']);

// Hook  ************************************

// Model / Data *****************************

const VirNum = ref(0);

// Model / Data  ****************************

// Html ref  ********************************

// Axios / Route  ***************************

// Modal  ***********************************

// Watch  ***********************************

// Method  **********************************

const setOrg = item => {
	Emits('setOrg', item);
};

// Etc  *************************************
</script>

<style lang="scss" scoped></style>
