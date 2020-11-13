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
		border-radius: 2px;
		position: relative;
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
		cursor: pointer;

		img {transition: transform .3s;}

		&.closed img {
			transform: rotateZ(180deg);
		}
	}
	.filter__content {
		width: 100%;
		padding: 0;
		border: 1px solid transparent;
		border-top: none;
		max-height: 0;
		transition: padding .1s linear, max-height .1s linear;
		overflow: hidden;
		&.active {
			border-color: #F3EFEA;
			max-height: 300px; 
			padding: 30px 0;
			overflow: visible;
		}
	}
</style>
