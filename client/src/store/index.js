import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
    key: 'vuex',
    reducer: state => ({
        user: state.user
    })
})
const store = new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],

    state: {
        user: null
    },
    mutations: {
        login(state, payload) {
            state.user = payload
            

        }
    },
    actions: {
        login(context, payload) {
            context.commit('login', payload)

        }
    }
})
export default store