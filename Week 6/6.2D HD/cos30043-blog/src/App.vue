<script>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase' // Adjust the path to your firebase configuration file
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('loadPosts')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit('setUser', user)
        this.$store.dispatch('getCurrentUser')
        this.$store.commit('setGlobalUser', {
          id: this.$store.getters.userId,
          name: this.$store.getters.userName
        })
      } else {
        this.$store.commit('setGlobalUser', null)
      }
    })
  }
}
</script>

<template>
  <div class="container">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>
