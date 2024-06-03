Vue.createApp({
  data() {
    return {
      input: "",
      randomNumber: 0,
      message: "",
    };
  },
  computed: {},
  methods: {
    random() {
      this.randomNumber = Math.floor(Math.random() * 100) + 1;
      this.input = "";
      this.message = "Start guessing...";
    },
    check() {
      if (this.input == this.randomNumber) {
        this.message = "❤️️ You got it! ❤️️";
      } else if (this.input > this.randomNumber) {
        this.message = "Guess lower";
      } else {
        this.message = "Guess higher";
      }
    },
    startOver() {
      this.random();
    },
    giveUp() {
      this.message = `😞 The number is ${this.randomNumber} 😞`;
    },
  },
  mounted() {
    this.random();
  },
}).mount("#app");
