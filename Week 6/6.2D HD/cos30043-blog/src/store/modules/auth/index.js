import authAction from './actions.js'
import authGetter from './getters.js'
import authMutation from './mutations.js'
const authModule = {
  state() {
    return {
      token: '',
      userId: null,
      tokenExpiration: '',
      isLoading: false,
      error: null,
      name: ''
    }
  },
  mutations: authMutation,
  actions: authAction,
  getters: authGetter
}
export default authModule
