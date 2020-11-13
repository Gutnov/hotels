<template>
	<div class="hotel">
		<div class="hotel__img">
			<img :src="require(`@/assets/img/${imgSrc(hotelData.name)}.jpg`)" :srcset="require(`@/assets/img/${imgSrc(hotelData.name)}-2x.jpg`) + ' 2x'">
		</div>
		<div class="hotel__content">
			<div class="hotel__address">{{hotelData.address}}</div>
			<h3 class="hotel__name">{{hotelData.name}}</h3>
			<div class="hotel__labels">
				<div class="hotel__stars">
					<img src="@/assets/img/star.svg" alt="" v-for="img in hotelData.stars" :key="randomNum()">
					{{hotelData.stars + ' ' + genitiveStars(hotelData.stars)}}
				</div>
				<div class="hotel__type">{{hotelData.type}}</div>
			</div>
			<div class="hotel__description">
				{{hotelData.description}}
			</div>
		</div>
		<div class="hotel__right">
			<div class="hotel__rating">
				<div v-if="hotelData.rating" class="hotel__rating-is">
					<div class="hotel__rating-is-cnt">
						<img src="@/assets/img/star-red.svg" alt="">
						<span>{{hotelData.rating}}</span>
						<div class="hotel__rating-ok">&#183 <span>Хорошо</span> &#183</div>
							
						<span>{{hotelData["reviews_amount"] + ' ' + genitive(hotelData["reviews_amount"])}}</span>
					</div>
					<div class="hotel__rating-text">
						{{hotelData.last_review}}
					</div>
				</div>
				<div v-else class="hotel__rating-no">
					<img src="@/assets/img/no-rating.svg" alt="">
					<span>Нет оценок.</span>
				</div>
			</div>
			<div class="hotel__control">
				<div class="hotel__price">
					{{'от ' + hotelData.min_price.toLocaleString('ru-RU')}}
					<span>&#8381</span>
				</div>
				<button class="hotel__btn">Забронировать</button>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default {
	name: 'Hotel',
	props: ['hotelData'],
	computed: {

	},
	methods: {
		genitiveStars(cnt) {
			return cnt == 1 ? 'звезда' : cnt == 5 ? 'звёзд' : 'звезды'
		},
		imgSrc(src) {
			let pathern = new RegExp(' ', 'g')
			return this.hotelData.name.toLowerCase().replace(pathern, '-')
		},
		randomNum() {
			return Math.floor(Math.random() * 999999999999999999).toString()
		},
		genitive(cnt) {
			return Vue.filter('genitive')(cnt, {
				singular: 'Отзыв',
				many1: 'Отзыва',
				many2: 'Отзывов'
			})
		}
	},
}
</script>

<style lang="scss">
	.hotel {
		display: flex;
		margin-bottom: 29px;
		padding-bottom: 28px;
		border-bottom: 1px solid #F3EFEA;
	}
	.hotel__content {
		flex: 1;
		margin-right: 20px;
	}
	.hotel__img {
		max-width: 280px;
		max-height: 290px;
		margin-right: 23px;

		img {
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	}
	.hotel__address {
		font-size: 13px;
		line-height: 17px;
		margin-bottom: 6px;
		color: #515151;
	}
	.hotel__name {
		font-weight: 500;
		font-size: 21px;
		line-height: 24px;
		margin-top: 0;
		margin-bottom: 20px;
	}
	.hotel__labels {
		display: flex;
		margin-bottom: 20px;
	}
	.hotel__stars {
		margin-right: 10px;
		font-weight: 500;
		line-height: 17px;
		font-size: 13px;

		img {
			margin-right: 4px;
			&:last-child {margin-right: 4px;}
		}
	}
	.hotel__type {
		padding: 0 7px;
		font-size: 13px;
		line-height: 17px;
		color: #515151;
		border: 1px solid #D4D4D4;
		border-radius: 2px;
	}
	.hotel__right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.hotel__rating {
		padding: 25px 20px;
		background: #F9F7F2;
		max-width: 237px;

		img{margin-right: 3px;}

		span {
			margin-right: 3px;
			font-weight: 500;
			font-size: 14px;
			line-height: 17px;
		}
	}
	.hotel__rating-is-cnt {
		margin-bottom: 17px;
	}
	.hotel__rating-ok {
		display: inline-block;
		margin-right: 5px;
		color: #B7B2A8;

		span {
			color: #000;
			margin-right: 0;
		}
	}
	.hotel__rating-no {
		display: flex;
		align-items: center;
		color: #959595;
		font-size: 14px;

		img {margin-right: 9px;}
	}
	.hotel__control {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.hotel__price {
		font-weight: 500;
		font-size: 17px;
		line-height: 17px;
		margin-right: 11px;
	}
	.hotel__btn {
		min-height: 50px;
		padding: 0 20px;
		font-weight: 500;
		font-size: 14px;
		line-height: 17px;
		color: #fff;
		background: #FF4641;
		border: none;
		border-radius: 2px;
	}
</style>
