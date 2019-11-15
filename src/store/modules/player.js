import api from "@/api";

const state = {
  deviceID: "",
  playback: "",
  playbackContext: ""
};

const getters = {
  getDeviceID: (state) => state.deviceID,
  getPlayback: (state) => state.playback,
  getPlaybackContext: (state) => state.playbackContext,
  isPlaying: (state) => state.playback.is_playing
};

const mutations = {
  SET_DEVICE_ID(state, deviceID) {
    state.deviceID = deviceID;
  },
  SET_PLAYBACK(state, playback) {
    state.playback = playback;
  },
  SET_PLAYBACK_CONTEXT(state, playback) {
    state.playbackContext = playback;
  }
};

const actions = {
  init: async function({ commit, rootGetters, dispatch }) {
    window.onSpotifyWebPlaybackSDKReady = () => {};

    async function waitForSpotifyWebPlaybackSDKToLoad() {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve(window.Spotify);
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify);
          };
        }
      });
    }

    async function waitUntilUserHasSelectedPlayer(sdk) {
      return new Promise((resolve) => {
        let interval = setInterval(async () => {
          let state = await sdk.getCurrentState();
          if (state !== null) {
            resolve(state);
            clearInterval(interval);
          }
        });
      });
    }

    (async () => {
      const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
      const token = rootGetters["auth/getAccessToken"];

      // eslint-disable-next-line
      const player = new Player({
        name: "Vue Spotify Web Player",
        getOAuthToken: (cb) => {
          cb(token);
        }
      });

      // Error handling
      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
        dispatch("auth/login", null, { root: true });
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("playback_error", ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener("player_state_changed", (state) => {
        if (state) {
          dispatch("setPlaybackContext", state);
          dispatch("setPlayback");
        }
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        commit("SET_DEVICE_ID", device_id);

        api.spotify.player.transferUsersPlayback([device_id], true);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // Connect to the player!
      let connected = await player.connect();

      if (connected) {
        await waitUntilUserHasSelectedPlayer(player);
      }
    })();
  },

  async setPlayback({ commit }) {
    try {
      const response = await api.spotify.player.getCurrentPlayback();
      commit("SET_PLAYBACK", response.data);
    } catch (e) {
      console.log(e);
    }
  },

  setPlaybackContext({ commit }, context) {
    commit("SET_PLAYBACK_CONTEXT", context);
  }
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
