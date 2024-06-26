const app = Vue.createApp({
  data() {
    return {
      form: {
        fname: "",
        lname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        street: "",
        suburb: "",
        postcode: "",
        phone: "",
        termsandcondition: false,
      },
      error: {
        fname: "",
        lname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        street: "",
        suburb: "",
        postcode: "",
        phone: "",
        termsandcondition: "",
      },
    };
  },
  methods: {
    resetError() {
      this.error = {
        fname: "",
        lname: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        street: "",
        suburb: "",
        postcode: "",
        phone: "",
        termsandcondition: "",
      };
    },
    checkForm(e) {
      this.resetError();
      if (!this.form.fname) {
        this.error.fname = "First name is required";
      } else if (!/^[a-zA-Z]*$/g.test(this.form.fname)) {
        this.error.fname = "First name must only contain letters";
      }

      if (!this.form.lname) {
        this.error.lname = "Last name is required";
      } else if (!/^[a-zA-Z]*$/g.test(this.form.lname)) {
        this.error.lname = "Last name must only contain letters";
      }

      if (!this.form.username) {
        this.error.username = "Username is required";
      } else if (this.form.username.length < 3) {
        this.error.username = "Username must be at least 3 characters";
      }

      if (!this.form.password) {
        this.error.password = "Password is required";
      } else if (this.form.password.length < 8) {
        this.error.password = "Password must be at least 8 characters";
      } else if (!/[$%^&*]/.test(this.form.password)) {
        this.error.password =
          "Password must contain at least one special character";
      }

      if (!this.form.confirmPassword) {
        this.error.confirmPassword = "Confirm Password is required";
      } else if (this.form.confirmPassword !== this.form.password) {
        this.error.confirmPassword = "Password does not match";
      }

      if (!this.form.email) {
        this.error.email = "Email is required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          this.form.email
        )
      ) {
        this.error.email = "Email is invalid";
      }

      if (this.form.street.length > 40) {
        this.error.street = "Street Address must be less than 40 characters";
      }

      if (this.form.suburb.length > 20) {
        this.error.suburb = "Suburb must be less than 20 characters";
      }

      if (!this.form.postcode) {
        this.error.postcode = "Postcode is required";
      } else if (!/^\d{4}$/.test(this.form.postcode)) {
        this.error.postcode = "Postcode must be 4 digits";
      }

      if (!this.form.phone) {
        this.error.phone = "Phone is required";
      } else if (!/^04\d{8}$/.test(this.form.phone)) {
        this.error.phone = "Phone number must be 10 digits and start with 04";
      }

      if (!this.form.termsandcondition) {
        this.error.termsandcondition = "Terms and Condition is required";
      }

      if (
        this.error.fname ||
        this.error.lname ||
        this.error.username ||
        this.error.password ||
        this.error.confirmPassword ||
        this.error.email ||
        this.error.street ||
        this.error.suburb ||
        this.error.postcode ||
        this.error.phone ||
        this.error.termsandcondition
      ) {
        e.preventDefault();
      }
    },
  },
});
app.mount("#app");
