export default {
    SET_USER(state, data) {
        state.userName = data.userName;
        state.userId = data.userId;
        state.isAdmin = data.isAdmin;
    },
    LOGOUT(state) {
        state.tabIndex = 0;
        state.userName = "";
        state.isAdmin = false;
        state.dialog = false;
        state.navigation_tab = false;
        state.modal_result = false;
        state.modal_vote = false;
    },
    SET_TABINDEX(state, index) {
        state.tabIndex = index;
    },
    SET_NAVIGATION_TAB(state, status) {
        state.navigation_tab = status;
    },
    SET_MODAL_NAVIGATION(state, status) {
        state.modal_navigation = status;
    },
    SET_DIALOG(state, payload) {
        state.dialog = payload;
    },
    SET_MODAL_RESULT(state, status) {
        state.modal_result = status;
    },
    SET_MODAL_VOTE(state, status) {
        state.modal_vote = status;
    }
    
}