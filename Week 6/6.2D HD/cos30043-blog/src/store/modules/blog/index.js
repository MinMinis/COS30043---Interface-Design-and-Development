import blogAction from './actions.js'
import blogGetter from './getters.js'
import blogMutation from './mutations.js'
const blogModule = {
  state() {
    return {
      blogTitle: '',
      blogPhotoName: '',
      blogPhotoFileURL: null,
      blogPhotoPreview: null,
      blogHTML: '',
      uploadedImages: new Set()
    }
  },
  mutations: blogMutation,
  actions: blogAction,
  getters: blogGetter
}
export default blogModule
