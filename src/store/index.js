import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		hotels: []
	},
	mutations: {
		setHotels(state, h){
			state.hotels = h
		}
	},
	actions: {
		async fetchHotels({commit}) {
			let res = await fetch('hotels.json');
			res = await res.json();
			commit('setHotels', res.hotels) 
		}
	},
	getters: {
		getHotels: s => s.hotels
	},
	modules: {}
})
