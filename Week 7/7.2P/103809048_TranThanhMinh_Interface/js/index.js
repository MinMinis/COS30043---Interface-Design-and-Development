const app = Vue.createApp({
  data() {
    return {
      data: [],
      error: null,
    };
  },
  mounted() {
    fetch("js/units.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.data = data;
      })
      .catch((error) => {
        console.error("Error:", error);
        this.error = error;
      });
  },
});

app.mount("#app");
