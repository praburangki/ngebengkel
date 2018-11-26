<template>
  <div>
    <div v-if="isLoading">Getting nearest bengkel, please wait...</div>
    <div v-else>
      <div 
        id="gMap"
        ref="gMap"
        class="google-map">
        <h1>ha</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  data: () => ({
    isLoading: false,
    markers: [],
    infoWindow: null
  }),
  computed: {
    gMaps: gmapApi,
    userPos() {
      return {
        position: { ...this.$store.state.location.current }
      };
    }
  },
  mounted() {
    const element = document.getElementById('gMap');
    const { position: userPosition } = this.userPos;
    const options = {
      zoom: 11,
      center: new google.maps.LatLng(userPosition.lat, userPosition.lng)
    };
    const map = new google.maps.Map(element, options);
    const infowindow = new google.maps.InfoWindow();
    this.markers.forEach(({ position, name }) => {
      const { lat, lng } = position;
      const markerPos = new google.maps.LatLng(lat, lng);
      const marker = new google.maps.Marker({ position: markerPos, map });
      marker.addListener('click', () => {
        infowindow.setOptions({
          content: name
        });
        infowindow.open(map, marker);
        map.panTo(marker.getPosition());
      });
    });

    // const directionsService = new google.maps.DirectionsService();
    // const directionsDisplay = new google.maps.DirectionsRenderer();
    // directionsDisplay.setMap(map);

    // const request = {
    //   origin: new google.maps.LatLng(
    //     this.markers[0].position.lat,
    //     this.markers[0].position.lng
    //   ),
    //   destination: new google.maps.LatLng(
    //     this.markers[2].position.lat,
    //     this.markers[2].position.lng
    //   ),
    //   travelMode: 'DRIVING'
    // };
    // directionsService.route(request, function(result, status) {
    //   if (status == 'OK') {
    //     directionsDisplay.setDirections(result);
    //   }
    // });
  },
  created() {
    const markers = [
      {
        name: 'Madiun Motor',
        address:
          'Jl. Raya Pengosekan, Peliatan, Ubud, Kabupaten Gianyar, Bali 80571',
        position: {
          lat: -8.5257205,
          lng: 115.2634142
        }
      },
      {
        name: 'Mawan Motor',
        address:
          'Jalan Raya Mawang Lot Tunduh Ubud, Lodtunduh, Ubud, Kabupaten Gianyar, Bali 80571',
        position: {
          lat: -8.571277,
          lng: 115.260374
        }
      },
      {
        name: 'Bengkel Mobil Panggilan🚙',
        address: 'Jl. Seroja, Tonja, Denpasar Utara, Kota Denpasar, Bali 80235',
        position: {
          lat: -8.634101,
          lng: 115.2286863
        }
      },
      {
        name: 'Bengkel Mobil Merta Putra',
        address:
          'Jl. Raya Demayu, Singakerta, Ubud, Kabupaten Gianyar, Bali 80571',
        position: {
          lat: -8.5233053,
          lng: 115.2389431
        }
      },
      {
        name: 'Yuhnior Bengkel',
        address:
          'Jl. WR Supratman No.201, Sumerta Kelod, Denpasar Tim., Kota Denpasar, Bali 80237',
        position: {
          lat: -8.6470283,
          lng: 115.2424273
        }
      }
    ];
    this.markers = markers;

    // const directionDisplay = this.gMaps.maps.DirectionDisplay();
    // directionDisplay.setMap(this.$refs.mapRef);
  },
  methods: {
    handleClick(destPos) {
      const directionDisplay = new google.maps.DirectionsRenderer();
      directionDisplay.setMap(this.$refs.mapRef);
      console.log(directionDisplay);
      // console.log(gmapApi());
      // const directionService = this.google.maps.DirectionService();
      // const request = {
      //   origin: this.userPos(),
      //   destination: destPos,
      //   travelMode: 'DRIVING'
      // };
      // directionsService.route(request, function(result, status) {
      //   console.log(result);
      //   // if (status == 'OK') {
      //   //   directionsDisplay.setDirections(result);
      //   // }
      // });
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100vw;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
