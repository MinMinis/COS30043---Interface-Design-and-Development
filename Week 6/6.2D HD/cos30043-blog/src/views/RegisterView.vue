<script>
import TheForm from '../components/TheForm.vue'
import TheLoading from '../components/TheLoading.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  components: {
    TheForm,
    TheLoading
  },
  data() {
    return {
      fields: [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'name', label: 'Name', type: 'text' }
      ],
      isSubmitting: ref(false)
    }
  },
  computed: {
    store() {
      return useStore()
    },
    isLoading() {
      return this.store.getters['isLoading']
    },
    userId() {
      return this.store.getters['userId']
    },
    error() {
      return this.store.getters['error']
    }
  },
  methods: {
    async handleSubmit(formData) {
      if (this.isSubmitting) return
      this.isSubmitting = true

      try {
        const success = await this.store.dispatch('signup', formData)
        if (success) {
          this.$router.replace({ name: 'posts' })
        }
      } catch (error) {
        console.error('Error during registration:', error)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<template>
  <main>
    <TheForm
      :fields="fields"
      submitLabel="Register"
      @submit="handleSubmit"
      :isSubmitting="isSubmitting"
      v-if="!isLoading"
    >
      <template #header>
        <h1 class="text-center my-4">Register</h1>
      </template>
      <template #footer>
        <p class="text-success text-center mt-4" v-if="userId && !error">Register successfully</p>
        <p class="text-danger text-center mt-4" v-if="error">
          {{ error }}
        </p>
      </template>
    </TheForm>
    <TheLoading v-else />
  </main>
</template>
