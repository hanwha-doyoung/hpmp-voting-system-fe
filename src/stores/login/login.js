import actions from "./actions";
import mutations from "./mutations";

const state = {
    isLogin: false,
    isLoginError: false,
}

const getters = {
    isAuthenticated: (state) => {
        return state.isLogin;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}