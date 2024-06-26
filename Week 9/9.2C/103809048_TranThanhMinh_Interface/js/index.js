const api = "http://localhost:8080";
const app = Vue.createApp({});
// let authenticated = false;
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
        <router-link to="/logout" class="nav-link" :class="{ 'active': $route.path === '/logout' }" replace>
          Logout
        </router-link>
      </li>
    </ul>
  `,
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
                  <label class="form-label" for="username">Username</label>
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
  // mounted() {
  //   if (authenticated) {
  //     this.$router.replace({ name: "Dashboard" });
  //   }
  // },
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
          if (data.success == false || data === null) {
            this.valid.message = "Invalid credentials";
            this.valid.status = false;
          } else if (data.success == true) {
            // authenticated = true;
            this.$router.replace({ name: "Dashboard" });
          } else {
            this.valid.message = data.response;
            this.valid.status = false;
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
app.component("Logout", {
  // I want to wait 3 seconds before redirecting to login
  template: `
    <div class="container">
      <h2 class="text-center mt-5">Logging out...</h2>
    </div>
  `,
  mounted() {
    // if (authenticated) {
    //   authenticated = false;
    setTimeout(() => {
      this.$router.replace({ name: "Login" });
    }, 2000);
    // } else {
    //   this.$router.replace({ name: "Login" });
    // }
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
  // mounted() {
  //   if (!authenticated) {
  //     this.$router.replace({ name: "Login" });
  //   }
  // },
});
app.component("paginate", VuejsPaginateNext);
app.component("ViewUnits", {
  template: `
    <div class="container">
      <h2>View Units</h2>
      <table class="table table-bordered table-striped mt-5" v-if="units.length > 0">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Credit Points</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(unit, index) in paginatedData" :key="index">
            <td>{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
      <paginate :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="handlePageClick"
      :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"
      :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
      :prev-link-class="'page-link'" :next-link-class="'page-link'">
      </paginate>
      <p class="alert-danger p-4 text-center my-2" v-if="error !== ''">{{error}}</p>
    </div>
  `,
  data() {
    return {
      units: [],
      currentPage: 1,
      perPage: 10,
      error: "",
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.units.length / this.perPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.units.slice(start, end);
    },
  },
  methods: {
    handlePageClick(pageNum) {
      this.currentPage = pageNum;
    },
  },
  mounted() {
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
          // sort the data by code
          data.sort((a, b) => a.code.localeCompare(b.code));
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
    <div class="row row-cols-6 w-auto">
      <div class="col container-fluid w-50">
        <h2 class="text-center">Create Unit</h2>
        <form @submit.prevent="createData">
          <div class="form-group">
            <label class="form-label" for="code">Code:</label>
            <input type="text" v-model="input.code" class="form-control" id="code" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="desc">Description:</label>
            <input type="text" v-model="input.desc" class="form-control" id="desc" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="cp">Credit Points:</label>
            <input type="number" step="0.1" v-model="input.cp" class="form-control" id="cp" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="type">Type:</label>
            <select v-model="input.type" class="form-control" id="type" required>
              <option value="" disabled>Select type</option>
              <option value="Core">Core</option>
              <option value="system analysis">System Analysis</option>
              <option value="software development">Software Development</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary mt-4">Create Unit</button>
        </form>
      </div>
      <div class="col container-fluid w-50">
        <h3>Output Message</h3>
        <p>Status code: {{ output.status }}</p>
        <p>Response: {{ output.response }}</p>
      </div>
    </div>
  `,
  data() {
    return {
      input: { code: "", desc: "", cp: "", type: "" },
      output: { status: "", response: "" },
    };
  },
  methods: {
    createData() {
      this.output.status = "";
      this.output.response = "";

      if (
        !this.input.code ||
        !this.input.desc ||
        !this.input.cp ||
        !this.input.type
      ) {
        this.output.response = "All fields are required.";
        return;
      }

      const payload = {
        code: this.input.code,
        desc: this.input.desc,
        cp: parseFloat(this.input.cp),
        type: this.input.type,
      };

      fetch(api + "/units", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (!response.ok) {
            this.output.status = response.status;
            const text = await response.text();
            this.output.response = text || "Network response was not ok";
            return;
          }
          this.output.status = response.status;
          return response.json();
        })
        .then((data) => {
          if (data && data.success === false) {
            this.output.status = "403";
            this.output.response = data.message;
          } else if (data && data.success === true) {
            this.output.status = "200";
            this.output.response = data.message;
            this.input = { code: "", desc: "" };
          } else {
            this.output.status = "403";
            this.output.response = "Failed to create unit. Please try again.";
          }
        })
        .catch((error) => {
          this.output.status = "403";
          this.output.response =
            error.message || "Failed to create unit. Please try again.";
        });
    },
  },
  mounted() {
    this.input.type = "Core";
    this.input.cp = "12.5";
  },
});

app.component("UpdateUnit", {
  template: `
  <div class="row row-cols-6 w-auto">
    <div class="col container-fluid w-50">
      <h2 class="text-center">Update Unit</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label class="form-label" for="code">Enter Unit Code for updating:</label>
          <input type="text" v-model="input.code" class="form-control" id="code" >
        </div>
        <div class="form-group">
          <label class="form-label" for="desc">Description:</label>
          <input type="text" v-model="input.desc" class="form-control" id="desc" >
        </div>
        <div class="form-group">
          <label class="form-label" for="cp">Credit Points:</label>
          <input type="number" step="0.1" v-model="input.cp" class="form-control" id="cp" >
        </div>
        <div class="form-group">
          <label class="form-label" for="type">Type:</label>
          <select v-model="input.type" class="form-control" id="type" >
          <option value="" disabled>Select type</option>
          <option value="Core">Core</option>
          <option value="system analysis">System Analysis</option>
          <option value="software development">Software Development</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Update Unit</button>
        </form>
      </div>
      <div class="col container-fluid w-50">
        <h3>Output Message</h3>
        <p>Status code: {{output.status}}</p>
        <p>Response: {{output.response}}</p>
      </div>
    </div>
    `,
  data() {
    return {
      input: { code: "", desc: "", cp: "", type: "" },
      output: { status: "", response: "" },
    };
  },
  methods: {
    submitForm() {
      this.output.status = "";
      this.output.response = "";
      if (!this.input.code) {
        this.output.response = "Code field is  to update.";
        return;
      }
      const payload = {
        code: this.input.code,
        desc: this.input.desc,
        cp: parseFloat(this.input.cp),
        type: this.input.type,
      };
      fetch(api + "/units", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            this.output.response = "Network response was not ok";
          }
          this.output.status = 200;
          return response.json();
        })
        .then((data) => {
          if (data && data.success === false) {
            this.output.status = 403;
            this.output.response = data.message;
          } else if (data && data.success === true) {
            this.output.status = 200;
            this.output.response = data.message;
            this.input = { code: "", desc: "", cp: "", type: "" };
          } else {
            this.output.status = 403;
            this.output.response = "Failed to update unit. Please try again";
          }
        })
        .catch((error) => {
          this.output.status = "403";
          this.output.response = "Failed to update unit. Please try again";
        });
    },
  },
});

app.component("DeleteUnit", {
  template: `
  <div class="row row-cols-6 w-auto">
    <div class="col container-fluid w-50">
      <h2 class="text-center">Delete Unit</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label class="form-label" for="code">Enter Unit Code for deleting:</label>
          <input type="text" v-model="input.code" class="form-control" id="code" >
        </div>
        <button type="submit" class="btn btn-primary mt-4">Delete Unit</button>
        </form>
      </div>
      <div class="col container-fluid w-50">
        <h3>Output Message</h3>
        <p>Status code: {{output.status}}</p>
        <p>Response: {{output.response}}</p>
      </div>
    </div>
    `,
  data() {
    return {
      input: { code: "" },
      output: { status: "", response: "" },
    };
  },
  methods: {
    submitForm() {
      this.output.status = "";
      this.output.response = "";
      if (!this.input.code) {
        this.output.response = "Code field is required.";
        return;
      }
      fetch(api + "/units/" + this.input.code, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            this.output.response = "Network response was not ok";
          }
          this.output.status = 200;
          return response.json();
        })
        .then((data) => {
          if (data && data.success === false) {
            this.output.status = 403;
            this.output.response = data.message;
          } else if (data && data.success === true) {
            this.output.status = 200;
            this.output.response = data.message;
          } else {
            this.output.status = 403;
            this.output.response = "Failed to delete unit. Please try again";
          }
        })
        .catch((error) => {
          this.output.status = "403";
          this.output.response = "Failed to delete unit. Please try again";
        });
    },
  },
});
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/login", component: app.component("Login"), name: "Login" },
    { path: "/logout", name: "Logout", component: app.component("Logout") },
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
