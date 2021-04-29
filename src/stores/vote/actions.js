import axios from "axios";

export default {
    createVote({ commit, rootState }, voteObj) {
        var obj = {};
        obj.adminId = localStorage.uid;
        obj.contractName = voteObj.voteName;
        obj.description = voteObj.description;
        obj.proposals = voteObj.proposals;
        obj.date = voteObj.date;
        return axios
            .post(
                rootState.apiURL+"deployVote",
                obj
            )
            .then(function () {
                commit('common/SET_DIALOG', false, {root:true});
            });
    },
    
    getAllVotes({ commit, rootState }) {
        return axios
            .get(rootState.apiURL+"getAllVotes")
            .then(function(response) {
                commit("SET_ALL_VOTES", response.data);
        })
    },

    getAllProposals({ commit, rootState }, voteName) {
        return axios
            .get(rootState.apiURL+"getAllProposals/"+ voteName)
            .then(function(responses) {
                let res = responses.data.proposals;
                let newRes = [];
                for(let i=1; i<res.length; i++)
                    newRes.push(res[i]);
                commit("SET_PROPOSALS", newRes);
            });
        
    },
    // hasVoted({ rootState, commit }, voteName) {
    //     return axios
    //         .get(rootState.apiURL + "user/" + localStorage.uid + "/" + voteName)
    //         .then(function (response) {
    //             commit("SET_VOTED", response.data);
    //             return response.data;
    //         });
    // },

    submitVote({ rootState }, voteObj) {
        var obj = {};
        obj.contractName = voteObj.voteName;
        obj.parameters = voteObj.idx;
        obj.userid = localStorage.uid;
        return axios
            .post(rootState.apiURL + "user/vote", obj)
            // .then(function() {
            //     commit("SET_VOTED", true);
            // })  
    },

    getVoteCounts({ rootState, commit }, voteName) {
        return axios
        .get(rootState.apiURL+"getAllProposalVoteCount/"+ voteName)
        .then(function(responses) {
            let res = responses.data.results;
            let newRes = [];
            for(let i=1; i<res.length; i++)
                newRes.push(res[i]);
            commit("SET_VOTE_RESULT", newRes);
        });
    },
    getUserVotedInfo({ rootState, commit }, userid) {
        return axios
        .get(rootState.apiURL+"getUserVotedInfo/"+ userid)
        .then(function(res) {
            commit("SET_VOTED_LIST", res.data);
        })
    },
    refreshModal({ commit }) {
        commit("SET_VOTE", "");
        commit("SET_PROPOSALS", []);
        commit("SET_VOTE_RESULT", []);
    },
}