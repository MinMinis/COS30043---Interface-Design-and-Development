export default {
  updateBlogTitle(state, payload) {
    state.blogTitle = payload
  },
  updateBlogPhotoName(state, payload) {
    state.blogPhotoName = payload
  },
  updateBlogPhotoFileURL(state, payload) {
    state.blogPhotoFileURL = payload
  },
  updateBlogPhotoPreview(state, payload) {
    state.blogPhotoPreview = payload
  },
  updateBlogHTML(state, payload) {
    state.blogHTML = payload
  },
  updateUploadedImages(state, images) {
    state.uploadedImages = images
  },
  setAllToNull(state) {
    state.blogTitle = ''
    state.blogPhotoName = ''
    state.blogPhotoFileURL = null
    state.blogPhotoPreview = null
    ;(state.blogHTML = ''), (state.uploadedImages = new Set())
  }
}
