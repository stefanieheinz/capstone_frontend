<template>
  <div class="bars-index">
    <div id="map"></div>
    <div v-for="bar in bars" v-bind:key="bar.id">
      <!-- <h2>{{ bar.name }}</h2> -->
    </div>
  </div>
</template>

<script>
/* global mapboxgl, MapboxDirections, mapboxSdk */
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
        this.setupMap();
      });
    },
    setupMap: function () {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic3RlZmFuaWVoZWlueiIsImEiOiJja3B2YTR1cmIxM2szMnVxdWNtOHFiencyIn0.OSiYqhH8bpXuJbsLPHtqbg";
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-104.9909, 39.7545], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        "top-left"
      );
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      this.bars.forEach((bar) => {
        console.log("Address", bar.address);
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
    },
  },
};
</script>

<style scoped>
/* h2 {
  font-size: 2.85em;
  text-align: center;
  color: inherit;
  border-bottom: solid 1px rgba(128, 128, 128, 0.15);
  text-decoration: none;
  -moz-transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out, border-bottom-color 0.35s ease-in-out;
  -webkit-transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out, border-bottom-color 0.35s ease-in-out;
  -ms-transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out, border-bottom-color 0.35s ease-in-out;
  transition: background-color 0.35s ease-in-out, color 0.35s ease-in-out, border-bottom-color 0.35s ease-in-out;
} */

h2:hover {
  color: #ef8376;
  border-bottom-color: transparent;
}

#map {
  height: 500px;
}
</style>
