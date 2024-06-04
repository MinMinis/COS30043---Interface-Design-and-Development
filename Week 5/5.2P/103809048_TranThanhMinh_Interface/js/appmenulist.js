const app = Vue.createApp({});
app.component("mymenu", {
  props: ["menu"],
  template: `
    <div class="row">
        <div class="col-4" v-for="(item, index) in menu" :key="index">
            {{item}}
        </div>
    </div>
    `,
});
app.mount("#app");
