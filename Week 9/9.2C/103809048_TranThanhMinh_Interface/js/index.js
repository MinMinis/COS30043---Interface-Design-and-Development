var studMarks = [
  { name: "John", marks: 80 },
  { name: "Ally", marks: 75 },
  { name: "Bob", marks: 60 },
  { name: "Doe", marks: 85 },
  { name: "Jane", marks: 90 },
  { name: "Tom", marks: 70 },
  { name: "Tim", marks: 65 },
  { name: "Sam", marks: 55 },
  { name: "Max", marks: 40 },
  { name: "Kim", marks: 30 },
  { name: "Jim", marks: 20 },
  { name: "Zoe", marks: 10 },
  { name: "Ron", marks: 5 },
  { name: "Ben", marks: 0 },
  { name: "Ken", marks: 100 },
  { name: "Leo", marks: 95 },
  { name: "Roy", marks: 85 },
  { name: "Ray", marks: 75 },
  { name: "Rex", marks: 65 },
  { name: "Raj", marks: 55 },
  { name: "Ria", marks: 45 },
  { name: "Ric", marks: 35 },
  { name: "Rid", marks: 25 },
  { name: "Rim", marks: 15 },
  { name: "Rin", marks: 10 },
  { name: "Rit", marks: 5 },
];
const app = Vue.createApp({});
app.component("nav-bar", {
  template: `
    <ul class="nav nav-tabs my-4">
      <li class="nav-item">
        <router-link to="/login" class="nav-link" aria-current="page" :class="{ 'active': $route.path === '/login' }">
          Login
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link" :class="{ 'active': $route.path === '/dashboard' }">
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/logout" class="nav-link" :class="{ 'active': $route.path === '/logout' }" @click="logout()" replace>
          Logout
        </router-link>
      </li>
    </ul>
  `,
  methods: {
    logout() {
      this.$root.logout();
    },
  },
});

app.component("Login", {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <div class="card mt-5">
            <div class="card-body">
              <h5 class="card-title text-center">Login</h5>
              <form>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="input.username">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="input.password">
                </div>
                <button type="submit" class="btn btn-primary" @click="login">Login</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-4"></div>
      </div>
    </div>
  `,
  data() {
    return {
      input: { username: "", password: "" },
      valid: false,
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        const { username, password } = this.input;
        const requestLogin = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        };
        // request to firebase to check if the user is valid and in the database
        fetch("https://jsonplaceholder.typicode.com/posts", requestLogin)
          .then((response) => response.json())
          .then((data) => {
            if (data === null) {
              alert("Invalid credentials");
              return;
            } else {
              this.$emit("authenticated", true);
              this.$router.replace({ name: "dashboard" });
            }
          });

        this.$router.push("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    },
  },
});
app.component("Dashboard", {
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table table-bordered table-striped mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students">
                <td>{{ student.name }}</td>
                <td>{{ student.marks }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      students: studMarks,
    };
  },
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/login", component: app.component("Login"), name: "Login" },
    { path: "/logout", name: "Logout" },
    {
      path: "/dashboard",
      component: app.component("Dashboard"),
      name: "Dashboard",
    },
    { path: "/", redirect: "/login" },
  ],
});
app.use(router);
app.mount("#app");
