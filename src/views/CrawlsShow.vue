<template>
  <div class="crawls-show">
    <h2>{{ crawl.name }}</h2>
    <p>Date: {{ crawl.date }}</p>
    <p>Name: {{ crawl.name }}</p>
    <router-link to="/crawls">Back to all crawls</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      crawl: {},
    };
  },
  created: function () {
    this.showCrawl();
  },
  methods: {
    showCrawl: function () {
      axios.get("/crawls/" + this.$route.params.id).then((response) => {
        console.log("show crawls", response.data);
        this.post = response.data;
      });
    },
  },
};
</script>
