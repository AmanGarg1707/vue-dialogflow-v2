<template>
	<div class="container">
		<div class="row text-center">
			<div class="col-md-12 heading">{{welcomeTitle}}</div>
		</div>
	</div>
</template>

<script>
import config from "../../config";
export default {
	data() {
		return {
			welcomeTitle: config.locale.strings.welcomeTitle
		};
	}
};
</script>

<style lang="scss" scoped>
$color: #42a5f5;
.heading {
	font-size: 30px;
	font-weight: 700;
	letter-spacing: 1px;
	padding: 5px 15px;
	color: white;
	background-color: $color;
}
</style>