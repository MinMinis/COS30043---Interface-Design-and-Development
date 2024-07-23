import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
export default {
  async loadPosts(context) {
    const query = await getDocs(collection(db, 'posts'))
    const posts = []
    query.forEach((doc) => {
      posts.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        imageUrl: doc.data().photo,
        date: doc.data().date,
        like: doc.data().like,
        user: doc.data().user
      })
    })
    context.commit('setPosts', posts)
  },
  async updatePost(context, payload) {
    const post = {
      title: payload.title,
      content: payload.content,
      imageUrl: payload.imageUrl
    }
    const token = context.rootGetters.token
    const response = await fetch(
      `https://cos30043-da9de-default-rtdb.firebaseio.com/posts/${payload.id}.json?auth=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
      }
    )
    const responseData = await response.json()
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to update.')
      throw error
    }
    context.commit('updatePost', payload)
  },
  async deletePost(context, payload) {
    const token = context.rootGetters.token
    const response = await fetch(
      `https://cos30043-da9de-default-rtdb.firebaseio.com/posts/${payload}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    )
    if (!response.ok) {
      const error = new Error('Failed to delete.')
      throw error
    }
    context.commit('deletePost', payload)
  }
}
