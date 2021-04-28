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
    colors: ["#41B883", "#E46651", "#00D8FF", "#ffc500", "#fdc0c0"],
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