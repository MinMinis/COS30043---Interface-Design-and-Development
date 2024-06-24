const api = "localhost:8000";
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
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="input.username">
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="input.password">
                </div>
                <p class="alert-danger text-center" v-if="!valid.status">{{ valid.message }}</p>
                <button type="submit" class="btn btn-primary">Login</button>
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
      valid: {
        status: true,
        message: "",
      },
    };
  },
  mounted() {
    console.log("hi");
  },

  methods: {
    login() {
      const { username, password } = this.input;
      if (username.trim() === "" || password.trim() === "") {
        this.valid.status = false;
        this.valid.message = "You need to fill in both username and password.";
        return;
      } else {
        this.valid.status = true;
        this.valid.message = "";
      }

      const requestLogin = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      // Simulating login with fetch, replace with actual authentication logic
      fetch(api + "/login", requestLogin)
        .then((response) => response.json())
        .then((data) => {
          if (data === null) {
            this.valid.message = "Invalid credentials";
            this.valid.status = false;
          } else if (data.response) {
            this.valid.message = data.response;
            this.valid.status = false;
          } else {
            // Assuming successful login, emit authenticated event and navigate to dashboard
            this.$emit("authenticated", true);
            this.$router.replace({ name: "DashboardHome" });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.valid.message = "Failed to login. Please try again.";
          this.valid.status = false;
        });
    },
  },
});

app.component("Dashboard", {
  template: `
    <div class="container">
      <ul class="nav nav-tabs my-4">
        <li class="nav-item">
          <router-link to="/dashboard/view" class="nav-link" aria-current="page" :class="{ 'active': $route.path === '/dashboard/view' }">
            View
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/create" class="nav-link" :class="{ 'active': $route.path === '/dashboard/create' }">
            Create
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/update" class="nav-link" :class="{ 'active': $route.path === '/dashboard/update' }">
            Update
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dashboard/delete" class="nav-link" :class="{ 'active': $route.path === '/dashboard/delete' }">
            Delete
          </router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
  `,
});
app.component("ViewUnits", {
  template: `
    <div class="container">
      <h2>View Units</h2>
      <table class="table table-bordered table-striped mt-5" v-if="units > 0">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Credit Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(unit, index) in units" :key="index">
            <td>{{ unit.name }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
      <p class="alert-danger p-4 text-center my-2" v-if="error !== ''">{{error}}</p>
    </div>
  `,
  data() {
    return {
      units: [],
      error: "",
    };
  },
  mounted() {
    console.log("ViewUnits component mounted"); // Ensure this logs when the component is mounted
    this.error = "";
    fetch(api + "/units")
      .then((response) => {
        if (!response.ok) {
          this.error = "Network response was not ok";
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          console.log("No data returned");
          this.error = "No data returned";
        } else {
          this.units = data; // Assuming data is an array of units
        }
      })
      .catch((error) => {
        console.error("Error fetching units:", error);
        this.error = "Failed to fetch units. Please try again";
      });
  },
});

app.component("CreateUnit", {
  template: `
    <div class="container">
      <h2>Create Unit</h2>
      <!-- Form for creating a new student -->
    </div>
  `,
  data() {
    return {
      input: { name: "", age: "" },
      error: "",
    };
  },
  mounted() {
    console.log("ViewUnits component mounted"); // Ensure this logs when the component is mounted
    this.error = "";
    fetch(api + "/students")
      .then((response) => {
        if (!response.ok) {
          this.error = "Network response was not ok";
        }
        return response.json();
      })
      .then((data) => {
        if (data === null) {
          console.log("No data returned");
          this.error = "No data returned";
        } else {
          this.students = data; // Assuming data is an array of students
        }
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        this.error = "Failed to fetch students. Please try again";
      });
  },
});

app.component("UpdateUnit", {
  template: `
    <div class="container">
      <h2>Update Unit</h2>
      <!-- Form for updating student details -->
      <p>Editing student: {{ students[id].name }}</p>
    </div>
  `,
  data() {
    return {
      students: studMarks,
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
});

app.component("DeleteUnit", {
  template: `
    <div class="container">
      <h2>Delete Unit</h2>
      <p>Are you sure you want to delete {{ students[id].name }}?</p>
      <!-- Delete confirmation button -->
    </div>
  `,
  data() {
    return {
      students: studMarks,
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
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
      redirect: "/dashboard/view",
      children: [
        {
          name: "ViewUnits",
          path: "view",
          component: app.component("ViewUnits"),
        },
        {
          path: "create",
          component: app.component("CreateUnit"),
          name: "CreateUnit",
        },
        {
          path: "update",
          component: app.component("UpdateUnit"),
          name: "UpdateUnit",
        },
        {
          path: "delete",
          component: app.component("DeleteUnit"),
          name: "DeleteUnit",
        },
      ],
    },
    { path: "/", redirect: "/login" },
  ],
  linkActiveClass: "active",
});
app.use(router);
app.mount("#app");
