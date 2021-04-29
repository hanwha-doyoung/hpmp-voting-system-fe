export default {
    LOGIN(state, payload) {
        localStorage.uid = payload.uid;
        localStorage.userName = payload.userName;
        state.isLogin = true;
        state.isLoginError = false;
    },
    LOGIN_ERROR(state) {
        state.isLogin = false;
        state.isLoginError = true;
    },
    LOGOUT(state) {
        delete localStorage.uid;
        state.isLogin = false;
        state.isLoginError = false;
    },
    LOGIN_ERROR_RESET(state) {
        if(state.isLoginError) state.isLoginError = false;
    }
}