<template>
	<FilterWrapper name="Цена">
		<div class="filter__by-price">
			<vue-slider 
				v-model="sliderValue"
				:min="0"
				:max="10000"
				:tooltip-formatter="formatter"
				:enable-cross="false"
				:interval="100"
				@drag-end="$emit('input', sliderValue)"
			/>
		</div>
	</FilterWrapper>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
	name: 'FilterByPrice',
	components: {
		VueSlider
	},
	data() {
		return {
			sliderValue: [3000, 7000],
			formatter: '{value} ₽'
		}
	},
	methods: {
		onChange() {
			console.log(this.sliderValue)
		}
	},
}
</script>

<style>
	.filter__by-price {
		padding: 0 27px;
	}
	.vue-slider-rail {
		background: #DFDACE;
		height: 3px;
	}
	.vue-slider-process {
		background: #FF4641;
	}
	.vue-slider-dot {
		width: 22px !important;
		height: 22px !important;
	}
	.vue-slider-dot-handle {
		background-color: #fff;
		border: 5px solid #FF4641;
	}
	.vue-slider-dot-tooltip-inner {
		background: #212121;
		color: #fff;
		border-color: #000;
		border-width: 3px;
		font-size: 13px;
		padding: 0 10px;
		border-radius: 2px;
		min-height: 22px;
		line-height: 22px;
	}
</style>
