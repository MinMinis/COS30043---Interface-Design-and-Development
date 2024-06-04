const app = Vue.createApp({});
app.component("app-mypost", {
  data: function () {
    return {
      statPosts: [],
      strStatus: "",
    };
  },
  template: `
    <div>
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
      this.statPosts.push(this.strStatus);
      this.strStatus = "";
    },
    remove: function (index) {
      this.statPosts.splice(index, 1);
    },
  },
});
app.mount("#app");
