import { createStore } from 'vuex'
import rootMutations from './mutations'
import rootActions from './actions'
import rootGetters from './getters'
import post from './modules/posts'
import authModule from './modules/auth'
import blog from './modules/blog'
const store = createStore({
  modules: {
    post,
    auth: authModule,
    blog
  },
  state() {
    return {
      id: null,
      name: '',
      email: ''
    }
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters
})
export default store
