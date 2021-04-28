import axios from "axios";

export default {
    login({ rootState, commit }, { id, password }) {
        return axios
            .post(
                rootState.apiURL+"auth/login",
                {
                    username: id,
                    password: password
                }
            )
            .then(function(response) {
                commit("LOGIN", {response: response.data, uid: id});
                commit("common/SET_USER", response.data, {root: true});
            })
            .catch(function (error) {
                console.log("error : ", error);
                commit("LOGIN_ERROR");
            }
        );
    },
    logout({commit}) {
        commit("LOGOUT");
        commit("common/LOGOUT", null, {root:true});
        commit("vote/LOGOUT", null, {root:true});
    }
   
}