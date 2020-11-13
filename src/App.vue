<template>
	<div class="hotels">
		<div class="container">
			<div class="hotels__content">
				<aside class="hotels__aside">
					<div class="hotels__aside-inner">
						<FilterByCountry v-model="filters[0].value" />
						<FilterByStars v-model="filters[1].value"/>
					</div>
				</aside>
				<main class="hotels__main" v-if="filteredHotels.length">
					<Hotel v-for="(hotel, index) in filteredHotels" :key="hotel + index" :hotelData="hotel" />
				</main>
				<h1 v-else>Ничего не найдено</h1>
			</div>
			<button class="hotels__more" @click="moreHotels">Показать еще отели</button>
		</div>
	</div>
</template>

<script>
	import Hotel from '@/components/Hotel'
	import FilterByCountry from '@/components/FilterByCountry'
	import FilterByStars from '@/components/FilterByStars'

	export default {
		name: 'App',
		data() {
			return {
				hotels: [],
				hotelsSliced: [],
				hotelsCnt: 6,
				filters: [
					{name: 'country', value: '',getter: obj => obj.country.toLowerCase()},
					{name: 'stars',value: '', getter: obj => obj.stars},
				]
			}
		},
		components: {
			Hotel,
			FilterByCountry,
			FilterByStars,
		},
		computed: {
			filteredHotels() {
				return this.filters.reduce((hotels, {value,getter,name}) => {
					if(!value) return hotels
					if (name == 'stars') {
						if (value.length) {
							return value.reduce((prev, i) => {
								return [...prev, ...hotels.filter(n => getter(n) == i)]
							}, []) 
						}
						return hotels
					}
					return hotels.filter(n => getter(n) === value.toLowerCase())
					
				}, this.hotelsSliced);
			}
		},
		methods: {
			clickHotel() {
				this.count++
			},
			moreHotels() { 
				const nextHotels = this.hotels.slice(this.hotelsCnt, this.hotelsCnt + 6)
				this.hotelsSliced = [...this.hotelsSliced, ...nextHotels]
				this.hotelsCnt += 6
			},
			randomNum() {
				return Math.floor(Math.random() * 999999999999999999).toString()
			},
		},
		async beforeMount() {
			await this.$store.dispatch('fetchHotels')
			this.hotels = this.$store.getters.getHotels
			this.hotelsSliced = this.hotels.slice(0, this.hotelsCnt)
		},
	}

</script>

<style lang="scss">
	@import 'assets/scss/fonts';
	@import 'assets/scss/base';

	.hotels {
		padding-top: 56px;
	}

	.hotels__more {
		display: block;
		margin: 0 auto;
		min-height: 50px;
		padding: 0 20px;
		margin-bottom: 85px;
		font-size: 15px;
		font-weight: 500;
		line-height: 17px;
		border: 2px solid #F0EADE;
		border-radius: 2px;
	}

	.hotels__content {
		display: flex;
	}

	.hotels__aside {
		position: relative;
		min-width: 300px;
		margin-right: 21px;
	}

	.hotels__aside-inner {
		position: sticky;
		left: 0;
		top: 20px;
	}

	.filter__by-stars {
		padding: 0 20px;
	}


	

</style>
