
export  default {
    SET_ALL_VOTES(state, list) {
        state.votes = list;
    },
    SET_VOTE(state, name) {
        state.vote = name;
    },
    SET_PROPOSALS(state, list) {
        state.proposals = list;
    },
    SET_VOTED(state, voted) {
        state.voted = voted;
    },
    SET_VOTE_RESULT(state, list) {
        state.voteResult = list;
    },
    SET_VOTE_DESC(state, voteDes) {
        state.desc = voteDes;
    },
    SET_VOTED_LIST(state, list) {
        state.votedList = list;
    },
    LOGOUT(state) {
        state.votes = [];
        state.vote = "";
        state.desc = "";
        state.proposals = [];
        state.voted = false;
        state.voteResult = [];
    }
}