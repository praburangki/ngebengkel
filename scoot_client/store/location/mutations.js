export default {
  setLocation(state, payload) {
    state.current = payload;
  },
  locationError(state) {
    state.locationError = true;
  },
  locationLoading(state, payload) {
    state.isLoading = payload;
  }
};
