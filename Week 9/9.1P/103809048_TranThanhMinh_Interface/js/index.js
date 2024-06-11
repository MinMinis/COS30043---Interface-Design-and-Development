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
        <router-link to="/name-test" class="nav-link" aria-current="page" :class="{ 'active': $route.path === '/name-test' }">
          Name Test
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/post-management" class="nav-link" :class="{ 'active': $route.path === '/post-management' }">
          Post Management
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/student-mark" class="nav-link" :class="{ 'active': $route.path === '/student-mark' }">
          Student Marks
        </router-link>
      </li>
    </ul>
  `,
});

app.component("NameTest", {
  template: `
    <div>
      <h1 class="text-center">String Test</h1>
      <p>Please enter your name:</p>
      <input type="text" v-model="strName">
      <p v-if="strName.toLowerCase() == 'minh'">Awesome name!</p>
      <p v-if="strName.toLowerCase() !== 'minh' && strName != ''">{{strName}} is not my name</p>
    </div>
  `,
  data() {
    return {
      strName: "",
    };
  },
});
app.component("PostManagement", {
  data: function () {
    return {
      statPosts: [],
      strStatus: "",
    };
  },
  template: `
    <div>
        <h1 class="text-center">Status Post App</h1>
        <div class="row mt-4">
            <div class="col-3">
                <p>Status:</p>
            </div>
            <div class="col-6">
                <input type="text" class="form-control" v-model="strStatus">
            </div>
            <div class="col-3">
                <button type="button" class="btn btn-success" @click="add()">Post</button>
            </div>
        </div>
        <div class="row">
            <h2 class="text-center mt-4">Status Updates</h2>
            <p class="col-12 text-center mt-4" v-if="statPosts.length == 0">No post yet</p>
            <div class="col-12 text-center my-4">
                <div class="my-2" v-for="(post, index) in statPosts" :key="index">
                    {{post}}
                    <button type="button" class="btn btn-danger" @click="remove(index)">Delete</button>
                </div>
            </div>
        </div>
    </div>
    `,
  methods: {
    add: function () {
      if (this.strStatus.trim() == "") {
        return;
      }
      this.statPosts.push(this.strStatus);
      this.strStatus = "";
    },
    remove: function (index) {
      this.statPosts.splice(index, 1);
    },
  },
});
app.component("StudentMark", {
  template: `
  <div>
    <div class="table-responsive">
      <h1 class="text-center my-4">Student Marks</h1>
      <table class="table table-scripted table-hover">
        <thead>
          <tr>
            <th scope="col" id="th-name">Student Name</th>
            <th scope="col" id="th-marks">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in paginatedData" :key="student.name">
            <td headers="'th-name'">{{ student.name }}</td>
            <td headers="'th-marks'">{{ student.marks }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <paginate :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="handlePageClick"
        :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"
        :page-link-class="'page-link'" :prev-class="'page-item'" :next-class="'page-item'"
        :prev-link-class="'page-link'" :next-link-class="'page-link'">
    </paginate>
  </div>
  `,
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      data: studMarks,
      currentPage: 1,
      perPage: 3,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.data.length / this.perPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.data.slice(start, end);
    },
  },
  methods: {
    handlePageClick(pageNum) {
      this.currentPage = pageNum;
    },
  },
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    { path: "/name-test", component: app.component("NameTest") },
    { path: "/post-management", component: app.component("PostManagement") },
    { path: "/student-mark", component: app.component("StudentMark") },
  ],
});
app.use(router);
app.mount("#app");
