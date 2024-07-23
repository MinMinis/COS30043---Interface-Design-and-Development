<script>
import TheWelcome from '../components/TheWelcome.vue'
import PostCard from '../components/PostCard.vue'

export default {
  components: {
    TheWelcome,
    PostCard
  },
  data() {
    return {
      posts: []
    }
  },
  computed: {
    getPosts() {
      return this.$store.getters.getPosts
    }
  },
  mounted() {
    this.posts = this.getPosts
    this.$store.commit('setEdit', false)
  },
  beforeUnmount() {
    this.$store.commit('setEdit', true)
  }
}
</script>

<template>
  <main>
    <TheWelcome />
    <section
      class="card-group justify-content-between w-100 align-items-center"
      v-if="posts.length > 0"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :content="post.content"
        :imageUrl="post.imageUrl"
        :user="post.user"
        :date="post.date"
        :id="post.id"
      />
    </section>
  </main>
</template>
