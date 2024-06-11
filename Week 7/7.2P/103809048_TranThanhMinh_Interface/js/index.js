const app = Vue.createApp({
  data() {
    return {
      data: [],
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
      });
  },
});

app.mount("#app");
