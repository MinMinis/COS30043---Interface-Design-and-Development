<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getBlogHTML', 'getBlogTitle', 'getBlogPhotoFileURL'])
  }
}
</script>
<template>
  <div>
    <h1 class="text-center my-4">{{ getBlogTitle }}</h1>
    <img
      :src="getBlogPhotoFileURL"
      alt="Blog Photo"
      class="img-thumbnail rounded mx-auto d-block"
      v-if="getBlogPhotoFileURL"
    />
    <div v-html="getBlogHTML"></div>
    <router-link :to="{ name: 'create-post' }" class="btn btn-secondary mt-4"
      >Back to Create Post</router-link
    >
  </div>
</template>
