<template>
  <div class="crawls-index">
    <h1>All Crawls</h1>
    <div v-for="crawl in crawls" v-bind:key="crawl.id">
      <h2>{{ crawl.name }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      crawls: [],
    };
  },
  created: function () {
    this.indexCrawls();
  },
  methods: {
    indexCrawls: function () {
      axios.get("/crawls").then((response) => {
        console.log("crawls index", response);
        this.crawls = response.data;
      });
    },
  },
};
</script>
