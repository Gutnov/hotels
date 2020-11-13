<template>
	<FilterWrapper name="Поиск по странам и городам">
		<div class="filter__by-country">
			<div class="filter__input-wr">
				<input 
					type="text" 
					placeholder="Введите страну, например, Россия"
					class="filter__input"
					@focus="inputFocus = true"
					@blur="onBlur"
					@change="$emit('input', $event.target.value)"
					:value="value"
					ref="input"
				>
				<ul class="filter__countries"  :class="{active: inputFocus}">
					<li v-for="c in countries" :key="c">
						<a 
							href="#"
							:data-value="c"
							@click="countriesClick"
							ref="countries"
						>{{c}}</a>
					</li>
				</ul>
			</div>
		</div>
	</FilterWrapper>
</template>

<script>
export default {
	name: 'FilterByCountry',
	props:['value'],
	data() {
		return {
			countries: ['Нидерланды', 'Греция', 'Россия', 'Польша'],
			inputFocus: false,
			inputValue: ''
		}
	},
	methods: {
		countriesClick(e) {
			this.$refs.input.value =  e.target.dataset.value
			this.$refs.input.dispatchEvent(new Event('change'))
			this.inputFocus = false
		},
		onBlur() {		
			setTimeout(() => {
				this.inputFocus = false
				this.$refs.input.blur()
			}, 200);
		}
	},
}
</script>

<style lang="scss">
	.filter__by-country {
		padding: 0 20px;
	}
	.filter__input-wr {
		position: relative;
	}
	.filter__input {
		display: inline-block;
		width: 100%;
		height: 40px;
		padding-left: 15px;
		font-size: 15px;
		line-height: 12px;
		border: 1.5px solid #D5CDBE;
		border-radius: 2px;
		outline: none;

		&::placeholder {color: #837F78;}
	}
	.filter__countries {
		display: none;
		position: absolute;
		z-index: 2;
		top: 100%;
		left: 0;
		width: 100%;
		padding-top: 25px;
		font-size: 15px;
		line-height: 20px;
		background: #FFFFFF;
		box-shadow: 0px 10px 30px rgba(31, 21, 1, 0.1);
		border-radius: 2px;

		&.active{display: block;}

		li {
			margin-bottom: 25px;
			padding-left: 30px;
		}
		a {
			display: inline-block;
			width: 100%;
			cursor: pointer;
		}
	}
</style>
