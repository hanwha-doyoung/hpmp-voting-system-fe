import actions from "./actions";
import mutations from "./mutations";

const state = {
    votes: [],
    vote: "",
    desc: "",
    proposals: [],
    voted: false,
    votedList: {},
    voteResult: [],
    colors: ["#FF9CA8", "#FA7089", "#FFF5D1", "#FFCB97", "#C4D18B"],
    count: 0,
};

const getters = {
    getVote:(state) => {
        return state.vote;
    },
    getVoteResults: (state) => {
        return state.voteResult;
    },
    getProposals: (state) => {
        return state.proposals;
    },
    getColors: (state) => {
        return state.colors;
    },
    getVoteDesc:(state) => {
        return state.desc;
    },
    getCount:(state) => {
        return state.count;
    },
    getVotes:(state) => {
        return state.votes;
    },
    getVotedList:(state) => {
        return state.votedList;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}