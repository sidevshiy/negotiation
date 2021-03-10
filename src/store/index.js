import Vue from 'vue';
import Vuex from 'vuex';
import * as weatherApi from '@/api/weather.js';


Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		employerOffer: null,
		employeeOffer: null,
		temperature: null
	},
	getters: {
		allResults: state => (state.employerOffer && state.employeeOffer) ? true : false,
		employerOffer: state => state.employerOffer,
		employeeOffer: state => state.employeeOffer,
		doWeWork: state => state.employerOffer >= state.employeeOffer ? true : false,
		temperature: state => state.temperature,
	},
	mutations: {
		setEmployer(state,  { value } ){
			state.employerOffer = value;
		},
		setEmployee(state, { value }){
			state.employeeOffer = value;
		},
		reset(state){
			state.employerOffer = null;
			state.employeeOffer = null;
		},
		setTemprature(state, value){
			state.temperature = value;
		}
	},
	actions: {
		async setEmployer({ commit }, fields){
			commit('setEmployer', fields[0]);
			let data = await weatherApi.load();
			console.log(data)
		},
		setEmployee({ commit }, fields){
			commit('setEmployee', fields[0]);
		},
		async setTemprature({ commit }){
			let data = await weatherApi.load();
			commit('setTemprature', data)
		},
		reset({ commit }){
			commit('reset');
		}
	},
	strict: process.env.NODE_ENV !== 'production'
});



export default store;