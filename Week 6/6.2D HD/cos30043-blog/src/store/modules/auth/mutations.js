export default {
  setUser(state, payload) {
    state.token = payload.token
    state.userId = payload.userId
    state.tokenExpiration = payload.tokenExpiration
    state.name = payload.name
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.isLoading = payload
  },
  logout(state) {
    state.token = null
    state.userId = null
    state.tokenExpiration = null
    state.name = null
  }
}
