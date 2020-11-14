<template>
	<FilterWrapper name="Тип">
		<div class="filter__by-type">
			<label class="filter__radio">
				<input 
					type="radio"
					name="type" 
					class="filter__radio-input"
					value="Отель"
					checked
					@change="$emit('input', $event.target.value)"
				>
				<div class="filter__radio-body">
					Отели
				</div>
			</label>
			<label class="filter__radio">
				<input 
					type="radio" 
					name="type" 
					class="filter__radio-input"
					value="Апартаменты"
					@change="$emit('input', $event.target.value)"
				>
				<div class="filter__radio-body">
					Апартаменты
				</div>
			</label>
		</div>
	</FilterWrapper>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.filter__by-type {
	display: flex;
	padding: 0 21px;
}
.filter__radio-input
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
		& ~ .filter__radio-body
		{
			display: flex;
			min-height: 40px;
			padding: 0 15px;
			margin-right: 8px;
			font-size: 15px;
			line-height: 40px;
			background: #F9F7F2;
			border-radius: 50px;
			cursor: pointer;
			
		}
		
		// включен и выбран
		&:checked ~ .filter__radio-body .filter__radio-box{
			border-color: rgba(25, 28, 33, 0.7);
			border-width: 2px;
		}
		&:checked 
		{
			&~ .filter__radio-body
			{
				background: #FDE283;
			}

		}
	}

}

</style>
