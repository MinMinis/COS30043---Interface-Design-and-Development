<script>
import Delete from './icons/IconDelete.vue'
import Edit from './icons/IconEdit.vue'
export default {
  props: {
    title: String,
    content: String,
    imageUrl: String,
    header: String,
    date: String,
    user: String,
    id: String,
    like: Number
  },
  components: {
    Delete,
    Edit
  },
  computed: {
    truncatedContent() {
      const numWords = 30
      if (!this.content) return ''
      const words = this.content.split(' ')
      return words.length > numWords ? words.slice(0, numWords).join(' ') + '...' : this.content
    }
  }
}
</script>

<template>
  <div class="card m-2 w-50 card-hover card-square">
    <div class="card-header" v-if="header">
      <h2>
        {{ header }}
      </h2>
    </div>
    <img :src="imageUrl" :alt="title" class="card-img-top img-thumbnail image-square" />
    <div
      class="card-img-overlay hoverComponent"
      v-if="this.$store.getters.getEditStage && user == this.$store.getters.userId"
    >
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'posts' }" class="btn btn-primary">
          <Edit class="icon-link icon-link-hover" />
        </router-link>
        <router-link :to="{ name: 'posts' }" class="btn btn-danger">
          <Delete class="icon-link icon-link-hover" />
        </router-link>
      </div>
    </div>
    <div class="card-body overlayLink">
      <h3 class="card-title text-wrap">{{ title }}</h3>
      <h6 class="card-subtitle mb-2 text-muted" v-if="user">Author id: {{ user }}</h6>
      <p class="card-text" v-html="truncatedContent"></p>
      <router-link
        :to="{ name: 'view-post', params: { id } }"
        class="link-offset-3 link-info"
        v-if="id"
      >
        Read More
      </router-link>
    </div>
    <div class="card-footer text-body-secondary" v-if="date !== undefined">
      {{ date }}
    </div>
  </div>
</template>

<style scoped>
.hoverComponent {
  opacity: 0;
  transition: opacity 0.3s;
}
.hoverComponent:hover {
  opacity: 1;
}
.card-hover:hover {
  transform: scaleX(1.05) scaleY(1.05);
  transition: ease-in-out 0.3s;
}
.overlayLink {
  z-index: 10;
}
.image-square {
  object-fit: contain;
  height: 200px;
  width: auto;
}
.card-square {
  width: 250px;
  height: auto;
}
</style>
