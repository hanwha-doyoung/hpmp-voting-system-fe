import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

import login from "./login/login";
import common from "./common/common";
import vote from "./vote/vote";

Vue.use(Vuex);

export default new Vuex.Store({
   state: {
      apiURL: process.env.VUE_APP_API_URL,
   },
   modules: {
      login,
      common,
      vote,
   },
   plugins: [
      createPersistedState()
   ]
});