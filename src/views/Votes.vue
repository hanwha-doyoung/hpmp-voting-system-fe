<template>
    <v-content>
        <v-container fluid>
            <v-card max-width="100vh" style="border: transparent" outlined>
                <v-layout column>
                    <v-flex>
                        <v-container/>
                    </v-flex>
                    <v-flex>
                        <v-list-item v-if="userName">
                            <v-list-item-avatar width="12vh" style="margin: 0" height="80px">
                                <v-avatar size="60px" color="indigo">
                                    <span class="white--text headline" v-if="userName">{{ userName.charAt(0) }}</span>
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-subtitle class="headline">
                                    <span style="font-weight: bold">{{ userName }} </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>

                        </v-list-item>
                    </v-flex>
                    <v-flex>
                        <v-container/>
                    </v-flex>
                </v-layout>
            </v-card>
            <div style="height: calc(100vh - 264px); overflow-y:scroll;">
                <div style="padding: 0 0 5px 10px">
                    <h3>등록된 투표</h3>
                </div>
                <span v-for="vote in allVotes" v-bind:key="vote.votename">
                    <v-card max-width="100%" outlined style="padding: 20px 0 20px 0;" v-bind:style="[votedList[vote.votename]==='false' ? {'background':'#87cefa'} : {'background':'rgb(245,246,250)'}]" @click="hasVoted(vote.votename, vote.description)">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="title">{{ vote.votename }}</v-list-item-title>
                                <v-list-item-subtitle class="subtitle">{{ vote.description }}</v-list-item-subtitle>
                            </v-list-item-content>   
                            <v-list-item-content align="right">
                                <v-list-item-title class="title">{{vote.count}}/10</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <div style="margin-left: 10px">
                            <v-chip small v-if="votedList[vote.votename] === 'true'" class="ma-2" color="info">투표 완료</v-chip>
                        </div>
                    </v-card>
                    <v-spacer style="padding:2px 0 2px 0;"/>
                </span>
            </div>
                <ResultModal/>
                <VotingModal/>
        </v-container>
    </v-content>
</template>

<script>
    import ResultModal from "./ResultModal";
    import VotingModal from "./VoteModal";
    import {mapState} from "vuex";

    export default {
        components: { ResultModal, VotingModal },
        computed: {
            ...mapState({
                userId: state => state.common.userId,
                userName: state => state.common.userName,
                voted: state => state.vote.voted,
                allVotes: state => state.vote.votes,
                proposals: state => state.vote.proposals,
                votes: state => state.vote.votes,
                votedList: state => state.vote.votedList,
            }),
        },
        data() {
            return {
                chipBool: false,
                localVotes: [],
                test: {},
            }
        },
        methods: {
            modalOn : function(votename, desc) {
                this.$store.commit('vote/SET_VOTE', votename);
                this.$store.commit('vote/SET_VOTE_DESC', desc);
                this.$store.dispatch('common/setModalResult', 'on');
            },
            hasVoted(votename, desc) {
                // this.$store.dispatch('vote/hasVoted', votename)
                // .then((response) => {
                    if(this.$store.getters['common/isAdmin'] || this.votedList[votename]==='true') {
                        this.modalOn(votename, desc);
                    } else {
                        this.votingModalOn(votename, desc);
                        // response ? this.modalOn(votename, desc) : this.votingModalOn(votename, desc);
                    }
                // });
            }, 
            votingModalOn : function(votename, desc) {
                this.$store.commit('vote/SET_VOTE', votename);
                this.$store.commit('vote/SET_VOTE_DESC', desc);
                // TODO: check if needed
                this.$store.dispatch('vote/getAllProposals', votename);
                this.$store.dispatch('common/setModalVote', 'on');
            },
            
            
        },
        created() { 
            // const t = this;
            this.$store.dispatch('vote/getAllVotes');
            this.$store.dispatch('vote/getUserVotedInfo', this.userId);
            // .then(function() {
            //     t.localVotes = t.$store.getters['vote/getVotes'];
            //     // for(let i=0; i<t.localVotes.length; i++) {
            //         t.$store.dispatch('vote/hasVoted', t.localVotes[0].votename)
            //         .then(function(res) {
            //             let k = t.localVotes[0].votename;
            //             t.test[k] = res;
            //     //         console.log(t.test);
            //     //         // t.$store.commit("vote/SET_VOTED_LIST", t.test);
            //     //         // console.log(t.$store.getters['vote/getVotedList']);
            //         })
            //     // }
            // })
        }
    };
</script>