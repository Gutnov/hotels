<template>
	<div class="filter">
		<div 
			class="filter__header"
			@click="opened = !opened"
			:class="{closed: !opened}"
		>
			<div class="filter__name">{{name}}</div>
			<img src="@/assets/img/arrow-up.svg" alt="">
		</div>
		<div class="filter__content" :class="{active:opened}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FilterWrapper',
	props: ['name'],
	data() {
		return {
			opened: true
		}
	},
}
</script>

<style lang="scss">
	.filter {
		position: relative;
		margin-bottom: 20px;
	}
	.filter__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 65px;
		padding: 0 20px;
		font-size: 15px;
		line-height: 17px;
		font-weight: 500;
		border: 1px solid #F3EFEA;
		border-radius: 2px 2px 0 0;
		cursor: pointer;

		img {transition: transform .3s;}

		&.closed img {
			transform: rotateZ(180deg);
		}
	}
	.filter__content {
		width: 100%;
		padding: 0;
		max-height: 0;
		overflow: hidden;
		border: 1px solid transparent;
		border-radius: 0 0 2px 2px;
		border-top: none;
		transition: padding .1s linear, max-height .1s linear;
		&.active {
			border-color: #F3EFEA;
			max-height: 300px; 
			padding: 30px 0;
			overflow: visible;
		}
	}
</style>
