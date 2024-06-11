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

const app = Vue.createApp({
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

app.mount("#app");
