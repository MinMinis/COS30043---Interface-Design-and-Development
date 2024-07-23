export default {
  setGlobalUser(state, payload) {
    state.id = payload.id
    state.name = payload.name
    state.email = payload.email
  },
  setUserNull(state) {
    state.id = null
    state.name = ''
    state.email = ''
  }
}
