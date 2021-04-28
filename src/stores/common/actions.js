export default {
    dialog({commit}, status) {
        commit("SET_DIALOG", status);
    },
    setNavigationTab({commit}, event) {
        if(event==='on') {
            commit('SET_NAVIGATION_TAB', true);
        } else if (event==='off') {
            commit('SET_NAVIGATION_TAB', false);
        }
    },
    setModalNavigation({commit}, event) {
        if(event==='on') {
            commit('SET_MODAL_NAVIGATION', true);
        } else if (event==='off') {
            commit('SET_MODAL_NAVIGATION', false);
        }
    },
    setModalResult({commit}, event) {
        if(event==='on') {
            commit('SET_MODAL_RESULT', true);
        } else if (event==='off') {
            commit('SET_MODAL_RESULT', false);
        }
    },
    setModalVote({commit}, event) {
        if(event==='on') {
            commit('SET_MODAL_VOTE', true);
        } else if (event ==='off') {
            commit('SET_MODAL_VOTE', false);
        }
    }
}