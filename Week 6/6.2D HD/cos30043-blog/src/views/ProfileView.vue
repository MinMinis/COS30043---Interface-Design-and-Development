<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUserName
    },
    email() {
      return this.$store.getters.getUserEmail
    }
  }
}
</script>
<template>
  <section class="container mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-7">
        <div class="card p-3 py-4">
          <h2 class="text-center">My Profile</h2>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-secondary disabled" type="button">{{ email }}</button>
          </div>
          <div class="d-flex justify-content-center align-items-center my-4">
            <button class="btn btn-secondary disabled" type="button">{{ user }}</button>
          </div>
          <div class="d-flex justify-content-evenly align-items-center my-4">
            <button class="btn btn-info disabled" type="button">Posts: 0</button>
            <router-link
              :to="{ name: 'my-posts' }"
              class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >See my posts</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
