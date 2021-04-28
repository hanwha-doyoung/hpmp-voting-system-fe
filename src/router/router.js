import Vue from "vue";
import Router from "vue-router";
import AxiosPlugin from "vue-axios-cors";
import store from "../stores/index";

import Index from "../components/Index";
import Login from "../views/Login";
import Tab from "../views/Tab"

Vue.use(Router);
Vue.use(AxiosPlugin);
configAxiosDefaults();

function requireAuth(from, to, next) {
    if (localStorage.uid == undefined) {
      // next("/login?returnPath=/status")
      next("/login");
    } else {
      // 새로고침으로 store 가 초기화 된 경우
      if (!store.getters['login/isAuthenticated']) {
          store.commit("login/LOGIN",
            { uid: localStorage.uid });
          next("/");
      } else {
        next();
      }
    }
  }


const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // First Page : Login
    {
      path: "/",
      redirect: "/main",
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
        path: "/voting-system",
        component: Index,
        beforeEnter: requireAuth,
        children: [ 
          {
            name: "MainTab",
            path: "/main",
            component: Tab,
          },
          
        ]
    }
]
});

export default router;

function configAxiosDefaults() {
  Vue.prototype.$axios.defaults.baseURL = store.state.apiURL;

}
