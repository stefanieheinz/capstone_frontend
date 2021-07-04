<template>
  <div class="bars-index">
    <h1>All Bars</h1>
    <div v-for="bar in bars" v-bind:key="bar.id">
      <h2>{{ bar.name }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      bars: [],
    };
  },
  created: function () {
    this.indexBars();
  },
  methods: {
    indexBars: function () {
      axios.get("/bars").then((response) => {
        console.log("bars index", response);
        this.bars = response.data;
      });
    },
  },
};
</script>
