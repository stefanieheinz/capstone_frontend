<template>
  <div class="crawls-index">
    <h1>All Crawls</h1>
    <div v-for="crawl in crawls" v-bind:key="crawl.id">
      <h2>{{ crawl.name }}</h2>
      <router-link tag="button" class="special" v-bind:to="`/crawls/${crawl.id}`">More Info</router-link>
    </div>
    <dialog id="crawl-details">
      <form>
        <h1>Crawl Info</h1>
        <p>Crawl Name: {{ currentCrawl.name }}</p>
        <p>Crawl Date: {{ currentCrawl.date }}</p>
        <button v-on:click="updateCrawl(currentCrawl)">Update</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      crawls: [],
      currentCrawl: {},
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
    // showCrawl: function (crawl) {
    //   this.currentCrawl = crawl;
    //   document.querySelector("#crawl-details").showModal();
    // },
    updateCrawl: function (crawl) {
      console.log("update crawl", crawl);
      var params = {
        name: crawl.name,
        date: crawl.date,
      };
      axios.patch("http://localhost:3000/crawls" + crawl.id, params).then((response) => {
        console.log("Update success", response.data);
      });
    },
  },
};
</script>
