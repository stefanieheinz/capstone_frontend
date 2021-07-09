<template>
  <div class="crawls-show">
    <div id="map"></div>
    <h2>{{ crawl.name }}</h2>
    <p>Date: {{ crawl.date }}</p>
    <p>Name: {{ crawl.name }}</p>
    <form v-on:submit.prevent="createBarCrawl()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Bar:
      <select v-model="newBarCrawl.bar_id">
        <option v-for="bar in bars" v-bind:value="bar.id" v-bind:key="bar.id">
          {{ bar.name }}
        </option>
      </select>
      <span>Selected: {{ newBarCrawl.bar_id }}</span>
      <input type="submit" value="Create" />
    </form>
    <div v-for="bar in crawl.bars" v-bind:key="bar.id">
      {{ bar.name }}
      {{ bar.address }}
    </div>
    <router-link class="special" to="/crawls">Back to all crawls</router-link>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  width: 100%;
  height: 300px;
}
</style>

<script>
/* global mapboxgl */
import axios from "axios";
export default {
  data: function () {
    return {
      crawl: {},
      bars: [],
      newBarCrawl: {},
      errors: [],
    };
  },
  created: function () {
    this.showCrawl();
    this.indexBars();
  },
  methods: {
    showCrawl: function () {
      axios.get("/crawls/" + this.$route.params.id).then((response) => {
        console.log("show crawls", response.data);
        this.crawl = response.data;
      });
    },
    indexBars: function () {
      axios.get("/bars").then((response) => {
        console.log("bars index", response);
        this.bars = response.data;
      });
    },
    createBarCrawl: function () {
      var params = {
        bar_id: this.newBarCrawl.bar_id,
        crawl_id: this.$route.params.id,
      };
      axios
        .post("/bar_crawls", params)
        .then((response) => {
          console.log("bar_crawls create", response);
        })
        .catch((error) => {
          console.log("bar_crawls create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
  mounted: function () {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic3RlZmFuaWVoZWlueiIsImEiOiJja3B2YTR1cmIxM2szMnVxdWNtOHFiencyIn0.OSiYqhH8bpXuJbsLPHtqbg";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-104.9903, 39.7392], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    console.log(map);

    // create the popup
    var popup = new mapboxgl.Popup({ offset: 25 }).setText("People do mad weed here.");
    // Create a default Marker and add it to the map.
    var marker1 = new mapboxgl.Marker().setLngLat([-104.9903, 39.7392]).setPopup(popup).addTo(map);
    console.log(marker1);
    // Create a default Marker, colored black, rotated 45 degrees.
    var marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 }).setLngLat([-105.270546, 40.014984]).addTo(map);
    console.log(marker2);
  },
};
</script>
