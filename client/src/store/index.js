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
        },
        signout(state) {
            state.user = null
            localStorage.clear()
        }
    },
    getters: {
        loggedIn: state => {
            return state.user
        },
        getUser: state => {
            const storedUser = JSON.parse(localStorage.getItem('vuex')).user
            if (state.user || storedUser) {
                return state.user || storedUser
            } else {
                return false
            }
        }
    },
    actions: {
        login(context, payload) {
            context.commit('login', payload)

        },
        signout(context) {
            context.commit('signout')
        }
    }
})
export default store