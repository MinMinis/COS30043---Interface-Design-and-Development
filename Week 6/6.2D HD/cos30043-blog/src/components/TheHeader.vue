<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink :to="{ name: 'home' }">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 container-xl justify-content-evenly">
            <li class="nav-item">
              <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'posts' }" class="nav-link">Posts</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
            </li>
            <li class="nav-item" v-if="user">
              <RouterLink :to="{ name: 'create-post' }" class="nav-link">Create Post</RouterLink>
            </li>
            <li class="nav-item dropdown" v-if="user">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User
              </button>
              <ul class="dropdown-menu">
                <li>
                  <button class="dropdown-item disabled" type="button">{{ email }}</button>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink
                    :to="{ name: 'profile' }"
                    class="dropdown-item my-2 d-flex justify-content-center align-items-center"
                    type="button"
                    >Profile</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    :to="{ name: 'my-posts' }"
                    class="dropdown-item my-2 d-flex justify-content-center align-items-center"
                    type="button"
                    >My Posts</RouterLink
                  >
                </li>
                <li class="d-flex justify-content-center align-items-center">
                  <button @click="logout" class="btn btn-danger">Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUserName
    },
    email() {
      return this.$store.getters.getUserEmail
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$store.commit('setUserNull')
    }
  }
}
</script>
