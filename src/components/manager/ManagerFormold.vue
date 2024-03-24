<template>
	<form>
		<div class="mb-3"></div>
		<div class="mb-3"></div>

		<div class="container-xl px-4 mt-4">
			<nav class="nav nav-borders">
				<a
					class="nav-link active ms-0"
					href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details"
					target="__blank"
					>Profile</a
				>
				<a
					class="nav-link"
					href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page"
					target="__blank"
					>Billing</a
				>
				<a
					class="nav-link"
					href="https://www.bootdey.com/snippets/view/bs5-profile-security-page"
					target="__blank"
					>Security</a
				>
				<a
					class="nav-link"
					href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"
					target="__blank"
					>Notifications</a
				>
			</nav>
			<hr class="mt-0 mb-4" />
			<div class="row">
				<div class="col-xl-4">
					<div class="card mb-4 mb-xl-0">
						<div class="card-header">Profile Picture</div>
						<div class="card-body text-center">
							<img
								class="img-account-profile rounded-circle mb-2"
								src="http://bootdey.com/img/Content/avatar/avatar1.png"
								alt=""
							/>
							<div class="small font-italic text-muted mb-4">
								JPG or PNG no larger than 5 MB
							</div>
							<button class="btn btn-primary" type="button">
								Upload new image
							</button>
						</div>
					</div>
				</div>
				<div class="col-xl-8">
					<div class="card mb-4">
						<div class="card-header">Account Details</div>
						<div class="card-body">
							<form>
								<div class="mb-3">
									<label class="small mb-1" for="email">이메일</label>
									<div class="input-group">
										<input
											class="form-control"
											id="email"
											type="text"
											placeholder="Enter your email"
											:value="email"
											@input="$emit('update:email', $event.target.value)"
										/>

										<slot name="actionsDupl"> </slot>
									</div>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="mngrNm">이름</label>
										<input
											class="form-control"
											id="mngrNm"
											type="text"
											placeholder="Enter your name"
											:value="mngrNm"
											@input="$emit('update:mngrNm', $event.target.value)"
										/>
										<input
											id="pw"
											type="password"
											class="form-control"
											:value="pw"
											@input="$emit('update:pw', $event.target.value)"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="phone">핸드폰</label>
										<input
											class="form-control"
											id="phone"
											type="text"
											placeholder="Enter your phone"
											:value="phone"
											@input="$emit('update:phone', $event.target.value)"
										/>
									</div>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="tel">연락처</label>
										<input
											class="form-control"
											id="tel"
											type="text"
											placeholder="연락처"
											:value="tel"
											@input="$emit('update:tel', $event.target.value)"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="authPersn">authPersn</label>
										<input
											class="form-control"
											id="authPersn"
											type="text"
											placeholder="Enter your authPersn"
											:value="authPersn"
											@input="$emit('update:authPersn', $event.target.value)"
										/>
									</div>
								</div>
								<div class="mb-3">
									<label class="small mb-1" for="authRsltView"
										>authRsltView</label
									>
									<input
										class="form-control"
										id="authRsltView"
										type="text"
										placeholder="Enter your authRsltView"
										:value="authRsltView"
										@input="$emit('update:authRsltView', $event.target.value)"
									/>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="authAdmin">authAdmin</label>
										<input
											class="form-control"
											id="authAdmin"
											type="text"
											placeholder="Enter your authAdmin"
											:value="authAdmin"
											@input="$emit('update:authAdmin', $event.target.value)"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="authLogView"
											>authLogView</label
										>
										<input
											class="form-control"
											id="authLogView"
											type="text"
											placeholder="Enter your authLogView"
											:value="authLogView"
											@input="$emit('update:authLogView', $event.target.value)"
										/>
									</div>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="authStati">authStati</label>
										<input
											class="form-control"
											id="authStati"
											type="text"
											placeholder="Enter your authStati"
											:value="authStati"
											@input="$emit('update:authStati', $event.target.value)"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="authBbs">authBbs</label>
										<input
											class="form-control"
											id="authBbs"
											type="text"
											placeholder="Enter your authBbs"
											:value="authBbs"
											@input="$emit('update:authBbs', $event.target.value)"
										/>
									</div>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="authOrg">authOrg</label>
										<input
											class="form-control"
											id="authOrg"
											type="text"
											placeholder="Enter your authOrg"
											:value="authOrg"
											@input="$emit('update:authOrg', $event.target.value)"
										/>
									</div>
									<div class="col-md-6"></div>
								</div>
								<slot name="actions"> </slot>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
</template>

<script setup>
// const vFocus = {
// 	mounted: el => {
// 		el.focus();
// 	},
// };
defineProps({
	useYn: String,
	email: String,
	mngrNm: String,
	phone: String,
	tel: String,
	authPersn: String,
	authRsltView: String,
	authAdmin: String,
	authLogView: String,
	authStati: String,
	authBbs: String,
	authOrg: String,
});
defineEmits([
	'update:useYn',
	'update:email',
	'update:mngrNm',
	'update:phone',
	'update:tel',
	'update:authPersn',
	'update:authRsltView',
	'update:authAdmin',
	'update:authLogView',
	'update:authStati',
	'update:authBbs',
	'update:authOrg',
]);
</script>

<style lang="scss" scoped></style>
