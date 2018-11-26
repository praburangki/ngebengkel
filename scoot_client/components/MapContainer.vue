<template>
  <div>
    <div v-if="isLoading">Getting nearest bengkel, please wait...</div>
    <div v-else>
      <div id="gMap" ref="gMap" class="google-map"/>
      <div class="bengkel-list">
        <ul>
          <li v-for="(bengkel) in markers" :key="bengkel.name" @click="handleClick(bengkel)">
            <div class="bengkel-name">{{ bengkel.name }}</div>
            <div class="bengkel-address">{{ bengkel.address }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    markers: [],
    infoWindow: null,
    mapInstance: null,
    directionsService: null,
    directionsDisplay: null
  }),
  computed: {
    userPos() {
      return {
        position: { ...this.$store.state.location.current }
      };
    }
  },
  created() {
    const { lat, lng } = this.userPos.position;
    fetch(`http://localhost:3008/api/closest?lat=${lat}&lng=${lng}`)
      .then(res => res.json())
      .then(data => {
        this.markers = data.list;

        this.populateMap();
      });
  },
  methods: {
    handleClick(bengkel) {
      const userPos = new google.maps.LatLng(
        this.userPos.position.lat,
        this.userPos.position.lng
      );
      const bengkelPos = new google.maps.LatLng(
        bengkel.position.lat,
        bengkel.position.lng
      );
      const request = {
        origin: userPos,
        destination: bengkelPos,
        travelMode: 'DRIVING'
      };

      this.directionsService.route(request, (result, status) => {
        if (status == 'OK') {
          this.directionsDisplay.setDirections(result);
        }
      });
    },
    populateMap() {
      const element = document.getElementById('gMap');
      const { position: userPosition } = this.userPos;
      const options = {
        zoom: 11,
        center: new google.maps.LatLng(userPosition.lat, userPosition.lng)
      };
      this.mapInstance = new google.maps.Map(element, options);
      const infowindow = new google.maps.InfoWindow();
      const userIcon = require('~/assets/userMarker.png');
      const userMarker = new google.maps.Marker({
        position: this.userPos.position,
        icon: userIcon,
        map: this.mapInstance
      });

      this.markers.forEach(markerItem => {
        const { position, name } = markerItem;
        const { lat, lng } = position;
        const markerPos = new google.maps.LatLng(lat, lng);
        const marker = new google.maps.Marker({
          position: markerPos,
          map: this.mapInstance
        });
        marker.addListener('click', () => {
          infowindow.setOptions({
            content: name
          });
          infowindow.open(this.mapInstance, marker);
          this.mapInstance.panTo(marker.getPosition());
        });
      });

      this.directionsService = new google.maps.DirectionsService();
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.mapInstance);
    }
  }
};
</script>

<style scoped>
.bengkel-list {
  max-width: 400px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0 20px;
  text-align: left;
}

li {
  margin: 30px 0;
  padding: 20px 20px;
  border: solid 1px black;
}

.bengkel-name {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}

.google-map {
  width: 100vw;
  height: 250px;
  margin: 0 auto;
  background: gray;
}
</style>
