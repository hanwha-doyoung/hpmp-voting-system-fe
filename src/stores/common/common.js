import actions from "./actions";
import mutations from "./mutations";

const state = {
    tabIndex: 0,
    userName: "",
    userId: "",
    isAdmin: false,
    dialog: false,
    navigation_tab: false,
    modal_navigation: false,
    modal_result: false,
    modal_vote: false,
}

const getters = {
    isAdmin:(state) => {
        return state.isAdmin;
    },
    modalResult:(state) => {
        return state.modal_result;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}