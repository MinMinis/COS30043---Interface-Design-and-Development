import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

export default {
  async createBlogPost(context, payload) {
    context.commit('setLoading', true)
    console.log(context.rootGetters.userId)
    try {
      const blogPost = {
        title: payload.title,
        photo: payload.coverPhotoURL,
        content: payload.content,
        date: new Date().toISOString(),
        user: context.rootGetters.userId,
        like: 0
      }
      const docRef = await setDoc(doc(db, 'posts', blogPost.date), blogPost)
      console.log('Document written with ID: ', docRef)
      context.commit('setLoading', false)
      context.commit('setAllToNull')
      return true
    } catch (error) {
      console.error('Error creating blog post:', error)
      context.commit('setLoading', false)
      context.commit('setError', error.message || 'Failed to create blog post.')
      return false
    }
  }
}
