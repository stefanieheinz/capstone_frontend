<template>
  <div class="initial-login container">
    <form class="login-form" v-on:submit.prevent="submit()">
      <h2 class="initial-label">Login</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label class="label">Email:</label>
        <input class="input" type="email" v-model="email" />
      </div>
      <div>
        <label class="label">Password:</label>
        <input type="password" v-model="password" />
      </div>
      <input class="submit" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "stef@test.com",
      password: "password",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$parent.flashMessage = "Logged in successfully!";
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<style scoped>
/* .label {
  text-align: center;
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
}
.initial-label {
  font-size: 75px;
  margin-left: 12em;
  font-family: Arial, Helvetica, sans-serif;
}
.submit {
  margin-left: 44em;
  font-family: Arial, Helvetica, sans-serif;
} */
</style>
