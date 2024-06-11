const app = Vue.createApp({
  components: {
    paginate: VuejsPaginateNext,
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      perPage: 5,
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
  mounted() {
    fetch("js/units.json")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.data = json;
      });
  },
});

app.mount("#app");
