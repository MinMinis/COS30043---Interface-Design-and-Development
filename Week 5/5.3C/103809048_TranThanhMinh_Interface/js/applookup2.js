var units = [
  {
    code: "ICT10001",
    desc: "Problem Solving with ICT",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "COS10005",
    desc: "Web Development",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "INF10003",
    desc: "Introduction to Business Information Systems",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "INF10002",
    desc: "Database Analysis and Design",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "COS10009",
    desc: "Introduction to Programming",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "INF30029",
    desc: "Information Technology Project Management",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "ICT30005",
    desc: "Professional Issues in Information Technology",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "ICT30001",
    desc: "Information Technology Project",
    cp: 12.5,
    type: "Core",
  },
  {
    code: "COS20001",
    desc: "User-Centred Design",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "TNE10005",
    desc: "Network Administration",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "COS20016",
    desc: "Operating System Configuration",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "SWE20001",
    desc: "Development Project 1 - Tools and Practices",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "COS20007",
    desc: "Object Oriented Programming",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "COS30015",
    desc: "IT Security",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "COS30043",
    desc: "Interface Design and Development",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "COS30017",
    desc: "Software Development for Mobile Devices",
    cp: 12.5,
    type: "Software Development",
  },
  {
    code: "INF20012",
    desc: "Enterprise Systems",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "ACC10007",
    desc: "Financial Information for Decision Making",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "INF20003",
    desc: "Requirements Analysis and Modelling",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "ACC20014",
    desc: "Management Decision Making",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "INF30005",
    desc: "Business Process Management",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "INF30003",
    desc: "Business Information Systems Analysis",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "INF30020",
    desc: "Information Systems Risk and Security",
    cp: 12.5,
    type: "Systems Analysis",
  },
  {
    code: "INF30001",
    desc: "Systems Acquisition & Implementation Management",
    cp: 12.5,
    type: "Systems Analysis",
  },
];

const Unit = {
  data() {
    return { units };
  },
  template: `
    <div class="my-4">
        <h1>Unit Code: {{ $route.params.id}}</h1>
        <ul class="list-group" v-for="unit in filteredUnits">
            <li class="list-group-item">{{unit.code}}</li>
            <li class="list-group-item">{{unit.desc}}</li>
            <li class="list-group-item">{{unit.cp.toFixed(2)}}</li>
            <li class="list-group-item">{{unit.type}}</li>
        </ul>
    </div>
    `,
  computed: {
    filteredUnits() {
      return this.units.filter((unit) => unit.code === this.$route.params.id);
    },
  },
};
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{ path: "/unit/:id", component: Unit }],
});
const app = Vue.createApp({});
app.component("app-lookup2", {
  data() {
    return {
      units,
    };
  },
  template: `
    <div>
        <h1>Unit Information System</h1>
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">More info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="unit in units" :key="unit.code">
                        <td>{{ unit.code }}</td>
                        <td>{{ unit.desc }}</td>
                        <td><router-link class="link-info" :to="'/unit/' + unit.code">Show details</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
});
app.use(router);
app.mount("#app");
