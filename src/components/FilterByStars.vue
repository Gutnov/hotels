<template>
	<FilterWrapper name="Звезды">
		<div class="filter__by-stars">
			<label 
				v-for="check in checkboxes"
				:key="randomNum()"
				class="filter__checbox"
			>
				<input 
					type="checkbox"
					name="stars"
					class="filter__checbox-input"
					:value="check"
					@change="onChange"
				>
				<div class="filter__checbox-body">
					<span class="filter__checbox-box"></span>
					<span class="filter__checbox-text">{{genitiveStars(check)}}</span>
				</div>
			</label>
		</div>
	</FilterWrapper>
</template>

<script>
export default {
	name: 'FilterByStars',
	props: ['value'],
	data() {
		return {
			checkboxes: [0, 1, 2, 3, 4, 5],
			checkedInputs:[]
		}
	},
	methods: {
		onChange(e) {
			if (!e.target.checked) {
				const index = this.checkedInputs.findIndex(val => val == e.target.value)
				this.checkedInputs.splice(index, 1)
			} else {
				this.checkedInputs.push(e.target.value)
			}

			let set = new Set(this.checkedInputs)
			this.$emit('input', [...set])
		},
		randomNum() {
			return Math.floor(Math.random() * 999999999999999999).toString()
		},
		genitiveStars(cnt) {
			return (
				cnt == 0 ? 	'Без звезд' :
				cnt == 1 ? cnt + ' звезда' :
				cnt == 5 ? cnt + ' звезд' :
				cnt + ' звезды'
			)
		},
	},
}
</script>

<style lang="scss">

.filter__by-stars {
	padding: 0 20px;
}
.filter__checbox
{
	position: relative;
	display: block;
	margin-bottom: 21px;
	font-size: 0;

	&:last-child{margin-bottom: 0;}
}
.filter__checbox-input
{
	position: absolute;
	width: 0;
	height: 0;
	top: 0;
	left: 0;
	z-index: -10;
	visibility: hidden;
	opacity: 0;
	&:enabled
	{
		// включен
		& ~ .filter__checbox-body
		{
			display: flex;
			align-items: center;
			cursor: pointer;
			.filter__checbox-box { border-color:#D5CDBE; }
			.filter__checbox-text { color: #000; }
		}
		// включен, но не выбран
		&:not(:checked)
		{
			& ~ .filter__checbox-body:hover .filter__checbox-box
			{
				background-position: center center;
			}
		}
		// включен и выбран
		&:checked
		{
			&~ .filter__checbox-body .filter__checbox-box
			{
				border-color: #FF4641;
				background-position: center center;
				background-color: #FF4641;
				background-image: url('../assets/img/checked.svg');
				background-repeat: no-repeat;
			}
			&~ .filter__checbox-body .filter__checbox-text { color: #191C21; }
		}
		// состояние фокуса
		&:focus ~ .filter__checbox-body .filter__checbox-box { outline: 2px solid grey; }
		&:hover ~ .filter__checbox-body .filter__checbox-text { color: #191C21; }
	}
	// выключен и выбран
	&:disabled:checked ~ .filter__checbox-body .filter__checbox-box,
	&:disabled:checked ~ .filter__checbox-body .filter__checbox-text
	{
		border-color: rgba(103, 115, 135, 0.4);
		color: #c2c7cf;
	}
}
// базовые стили для выключенного состояния
.filter__checbox-box
{
	width: 20px;
	height: 20px;
	border: 2px solid #D5CDBE;
	display: inline-block;
	vertical-align: top;
	border-radius: 2px;
}
.filter__checbox-text
{
	font-size: 14px;
	display: inline-block;
	vertical-align: top;
	color: #c2c7cf;
	margin-left: 10px;
}
</style>
