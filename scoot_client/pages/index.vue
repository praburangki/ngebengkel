<template>
  <section class="container">
    <div v-if="location.isLoading">
      Getting your location, please wait.
    </div>
    <div v-else>
      <div v-if="location.locationError">
        <p>Something went wrong, please retry</p>
      </div>
      <div v-else-if="!location.current">
        <h2 class="subtitle">My Vehicle is Broken</h2>
        <div 
          class="button--green" 
          @click="getUserPos">
          HELP!
        </div>
      </div>
      <div v-else>
        <MapContainer/>
      </div>
    </div>
  </section>
</template>

<script>
import MapContainer from '~/components/MapContainer';

export default {
  components: {
    MapContainer
  },
  computed: {
    location() {
      return this.$store.state.location;
    }
  },
  methods: {
    getUserPos() {
      this.$store.dispatch('location/getCurrentPos');
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
