const app = Vue.createApp({
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    var self = this;
    $.getJSON("https://jsonplaceholder.typicode.com/posts", function (data) {
      console.log(data);
      self.data = data;
    }).fail(function () {
      alert("getJSON failed!");
    });
  },
});

app.mount("#app");
