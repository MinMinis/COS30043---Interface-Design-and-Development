export default {
  setEdit(state, payload) {
    state.editPost = payload
  },
  setPosts(state, payload) {
    state.posts = payload
  },
  addPost(state, payload) {
    state.posts.push(payload)
  },
  updatePost(state, payload) {
    const postIndex = state.posts.findIndex((post) => post.id === payload.id)
    state.posts[postIndex] = payload
  },
  deletePost(state, payload) {
    state.posts = state.posts.filter((post) => post.id !== payload)
  }
}
