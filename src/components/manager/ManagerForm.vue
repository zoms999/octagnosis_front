<template>
	<form>
		<div class="mb-3"></div>
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
									<input
										class="form-control"
										id="email"
										type="text"
										v-focus
										placeholder="Enter your email"
										:value="email"
										@input="$emit('update:email', $event.target.value)"
									/>
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
											@input="$emit('update:email', $event.target.value)"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="inputLastName"
											>Last name</label
										>
										<input
											class="form-control"
											id="inputLastName"
											type="text"
											placeholder="Enter your last name"
											value="Luna"
										/>
									</div>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="inputOrgName"
											>Organization name</label
										>
										<input
											class="form-control"
											id="inputOrgName"
											type="text"
											placeholder="Enter your organization name"
											value="Start Bootstrap"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="inputLocation"
											>Location</label
										>
										<input
											class="form-control"
											id="inputLocation"
											type="text"
											placeholder="Enter your location"
											value="San Francisco, CA"
										/>
									</div>
								</div>
								<div class="mb-3">
									<label class="small mb-1" for="inputEmailAddress"
										>Email address</label
									>
									<input
										class="form-control"
										id="inputEmailAddress"
										type="email"
										placeholder="Enter your email address"
										value="name@example.com"
									/>
								</div>
								<div class="row gx-3 mb-3">
									<div class="col-md-6">
										<label class="small mb-1" for="inputPhone"
											>Phone number</label
										>
										<input
											class="form-control"
											id="inputPhone"
											type="tel"
											placeholder="Enter your phone number"
											value="555-123-4567"
										/>
									</div>
									<div class="col-md-6">
										<label class="small mb-1" for="inputBirthday"
											>Birthday</label
										>
										<input
											class="form-control"
											id="inputBirthday"
											type="text"
											name="birthday"
											placeholder="Enter your birthday"
											value="06/10/1988"
										/>
									</div>
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
	email: String,
	mngrNm: String,
});
defineEmits(['update:email', 'update:mngrNm']);
</script>

<style lang="scss" scoped></style>