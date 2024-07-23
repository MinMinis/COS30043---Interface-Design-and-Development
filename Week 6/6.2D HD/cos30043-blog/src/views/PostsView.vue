<script>
import PostCard from '../components/PostCard.vue'

export default {
  components: {
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
    this.$store.dispatch('loadPosts')
    this.posts = this.getPosts
    this.$store.commit('setEdit', true)
  },
  beforeUnmount() {
    this.$store.commit('setEdit', false)
  }
}
</script>

<template>
  <main>
    <h1>Posts</h1>
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
