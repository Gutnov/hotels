<template>
	<div class="hotels">
		<div class="container">
			<div class="hotels__content">
				<aside class="hotels__aside">
					<div class="hotels__aside-inner">
						<FilterByCountry v-model="filters[0].value" />
						<FilterByStars v-model="filters[1].value" />
						<FilterByType v-model="filters[2].value"/>
						<FilterByPrice v-model="filters[3].value"/>
					</div>
				</aside>
				<main class="hotels__main" v-if="hotelsSliced.length">
					<Hotel 
						v-for="(hotel, index) in hotelsSliced" 
						:key="hotel + index"
						:hotelData="hotel"
					/>
				</main>
				<h1 v-else>Ничего не найдено</h1>
			</div>
			<button class="hotels__more" @click="hotelsCnt += 6">Показать еще отели</button>
		</div>
	</div>
</template>

<script>
import Hotel from '@/components/Hotel'
import FilterByCountry from '@/components/FilterByCountry'
import FilterByStars from '@/components/FilterByStars'
import FilterByType from '@/components/FilterByType'
import FilterByPrice from '@/components/FilterByPrice'

export default {
	name: 'App',
	data() {
		return {
			hotels: [],
			hotelsCnt: 6,
			filters: [
				{name: 'country', value: '', getter: obj => obj.country.toLowerCase()},
				{name: 'stars', value: '', getter: obj => obj.stars},
				{name: 'type', value: 'Отель', getter: obj => obj.type.toLowerCase()},
				{name: 'price', value: '', getter: obj => obj.min_price},
			]
		}
	},
	components: {
		Hotel,
		FilterByCountry,
		FilterByStars,
		FilterByType,
		FilterByPrice
	},
	computed: {
		filteredHotels() {
			return this.filters.reduce((hotels, {value, getter, name}) => {
				if(!value) return hotels
				if (name == 'stars') {
					if (value.length) {
						return value.reduce((prev, i) => {
							return [...prev, ...hotels.filter(n => getter(n) == i)]
						}, []) 
					}
					return hotels
				}
				if (name == 'price') {
					if (value.length) {
						return hotels.filter(n => {
							return getter(n) >= value[0] && 
							getter(n) <= value[1]
						})
					}
					return hotels
				}
				return hotels.filter(n => getter(n) === value.toLowerCase())
			}, this.hotels);
		},
		hotelsSliced() {
			return this.filteredHotels.slice(0, this.hotelsCnt)
		},
	},
	methods: {
		randomNum() {
			return Math.floor(Math.random() * 999999999999999999).toString()
		},
	},
	watch: {
		filteredHotels() {
			this.hotelsCnt = 6
		}
	},
	async beforeMount() {
		await this.$store.dispatch('fetchHotels')
		this.hotels = this.$store.getters.getHotels
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

	.filter__by-stars {
		padding: 0 20px;
	}
</style>
