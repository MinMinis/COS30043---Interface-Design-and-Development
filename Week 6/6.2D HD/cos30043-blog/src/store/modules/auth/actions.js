import { auth, db } from '../../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
export default {
  async login(context, payload) {
    context.commit('setError', null)
    if (!payload.email || !payload.password) {
      context.commit('setError', 'Email and password are required.')
      return false
    }
    context.commit('setLoading', true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, payload.email, payload.password)
      const user = userCredential.user
      context.commit('setUser', {
        token: user.accessToken,
        userId: user.uid,
        tokenExpiration: user.stsTokenManager.expirationTime
      })
      context.dispatch('getCurrentUser')
      context.commit('setLoading', false)
      return true
    } catch (error) {
      context.commit('setLoading', false)
      context.commit('setError', error.message || 'Failed to authenticate. Check your login data.')
      return false
    }
  },
  async signup(context, payload) {
    context.commit('setError', null)
    if (!payload.email || !payload.password || !payload.name) {
      context.commit('setError', 'Email and password and name are required.')
      return false
    }
    context.commit('setLoading', true)

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: payload.name
      })
      context.dispatch('getCurrentUser')
      context.commit('setUser', {
        token: user.accessToken,
        userId: user.uid,
        tokenExpiration: user.stsTokenManager.expirationTime
      })
      context.commit('setLoading', false)
      return true
    } catch (error) {
      context.commit('setLoading', false)
      context.commit('setError', error.message || 'Failed to register. Check your signup data.')
      return false
    }
  },
  async getCurrentUser(context) {
    const userId = context.state.userId
    if (!userId) {
      return
    }
    try {
      const dataBase = await getDoc(doc(db, 'users', userId))
      const user = dataBase.data()
      context.commit('setUser', {
        token: context.state.token,
        userId: userId,
        tokenExpiration: context.state.tokenExpiration,
        name: user.name
      })
      context.commit('setGlobalUser', {
        id: userId,
        name: user.name,
        email: user.email
      })
    } catch (error) {
      context.commit('setError', error.message || 'Failed to fetch user data.')
    }
  },
  logout(context) {
    context.commit('logout')
  }
}
