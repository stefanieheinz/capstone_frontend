<template>
  <div class="bar_crawls-new">
    <h1>New Photo</h1>
    <form v-on:submit.prevent="createBarCrawl()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newBarCrawl.name" />
      Width:
      <input type="text" v-model="newBarCrawl.width" />
      Height:
      <input type="text" v-model="newBarCrawl.height" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newBarCrawl: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createBarCrawl: function () {
      var params = {
        name: this.newBarCrawl.name,
        width: this.newBarCrawl.width,
        height: this.newBarCrawl.height,
      };
      axios
        .post("/bar_crawls", params)
        .then((response) => {
          console.log("bar_crawls create", response);
          this.$router.push("/bar_crawls");
        })
        .catch((error) => {
          console.log("bar_crawls create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
