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
      <input type="submit" value="Add" />
    </form>
    <div v-for="barCrawl in sortedBarCrawls" v-bind:key="barCrawl.id">
      {{ barCrawl.bar.name }}
      {{ barCrawl.bar.address }}
      <input type="datetime-local" name="meeting-time" v-model="barCrawl.formatted_scheduled_time" />
      <button v-on:click="updateBarCrawl(barCrawl)">Update</button>
    </div>
    <router-link class="special" to="/crawls">Back to all crawls</router-link>
  </div>
</template>

<style>
#map {
  height: 300px;
  width: 100%;
}
</style>

<script>
/* global mapboxgl, MapboxDirections, mapboxSdk */
import axios from "axios";
export default {
  data: function () {
    return {
      crawl: { bar_crawls: [] },
      bars: [],
      newBarCrawl: {},
      errors: [],
    };
  },
  mounted: function () {
    this.showCrawl();
    this.indexBars();
  },
  created: function () {},
  methods: {
    showCrawl: function () {
      axios.get("/crawls/" + this.$route.params.id).then((response) => {
        console.log("show crawls", response.data);
        this.crawl = response.data;
        this.setupMap();
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
    showBarCrawl: function () {
      axios.get("/bar_crawls/" + this.$route.params.id).then((response) => {
        console.log("show bar crawls scheduled time", response.data);
        this.bar_crawls = response.data;
      });
    },
    updateBarCrawl: function (barCrawl) {
      var params = {
        bar_id: barCrawl.bar.id,
        crawl_id: this.$route.params.id,
        scheduled_time: barCrawl.formatted_scheduled_time,
      };
      axios.patch("/bar_crawls/" + barCrawl.id, params).then((response) => {
        console.log("bar crawls update scheduled time", response);
        // this.$router.push("/bar_crawls");
      });
    },
    setupMap: function () {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3RlZmFuaWVoZWlueiIsImEiOiJja3B2YTR1cmIxM2szMnVxdWNtOHFiencyIn0.OSiYqhH8bpXuJbsLPHtqbg";
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-104.9909, 39.7545], // starting position [lng, lat]
        zoom: 16, // starting zoom
      });

      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        "top-left"
      );
      console.log("Add bar markers", this.crawl.bars);
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.crawl.bars.forEach((bar) => {
        mapboxClient.geocoding
          .forwardGeocode({
            query: bar.address,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then(function (response) {
            if (response && response.body && response.body.features && response.body.features.length) {
              var feature = response.body.features[0];
              // Create a marker and add it to the map.
              var popup = new mapboxgl.Popup({ offset: 25 }).setText(bar.name);
              new mapboxgl.Marker().setLngLat(feature.center).setPopup(popup).addTo(map);
            }
          });
      });

      // // create the popup
      // var popup = new mapboxgl.Popup({ offset: 25 }).setText(".");
      // // Create a default Marker and add it to the map.
      // var marker1 = new mapboxgl.Marker().setLngLat([-104.9903, 39.7392]).setPopup(popup).addTo(map);
      // console.log(marker1);
      // // Create a default Marker, colored black, rotated 45 degrees.
      // var marker2 = new mapboxgl.Marker({ color: "black", rotation: 45 }).setLngLat([-105.270546, 40.014984]).addTo(map);
      // console.log(marker2);
    },
  },
  computed: {
    sortedBarCrawls: function () {
      return this.crawl.bar_crawls.slice().sort((a, b) => (a.scheduled_time > b.scheduled_time ? 1 : -1));
    },
  },
};
</script>
