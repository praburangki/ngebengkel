const getPosition = options =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

export default {
  getCurrentPos({ commit }) {
    commit('locationLoading', true);
    getPosition()
      .then(({ coords: { latitude, longitude } }) => {
        commit('setLocation', {
          lat: latitude,
          lng: longitude
        });
      })
      .catch(err => {
        commit('locationError');
      })
      .finally(() => {
        commit('locationLoading', false);
      });
  }
};
