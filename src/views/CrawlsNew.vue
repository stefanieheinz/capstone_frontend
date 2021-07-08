<template>
  <div class="crawls-new">
    <h1>New Crawl</h1>
    <form v-on:submit.prevent="createCrawl()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Date:
      <input type="text" v-model="newCrawl.date" />
      Name:
      <input type="text" v-model="newCrawl.name" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCrawl: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
    createCrawl: function () {
      var params = {
        date: this.newCrawl.date,
        name: this.newCrawl.name,
      };
      axios
        .post("http://localhost:3000/crawls", params)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/crawls");
        })
        .catch((error) => {
          console.log("crawls create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
