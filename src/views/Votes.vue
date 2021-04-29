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
                            <v-list-item-avatar width="12vh" style="margin: 0" height="120px">
                                <v-avatar size="80px" color="#a76666">
                                    <span class="white--text headline" v-if="userName" style="font-size: x-large; font-weight: bold">{{ userName.charAt(0) }}</span>
                                </v-avatar>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-subtitle class="headline">
                                    <span style="font-weight: bold; font-size: xx-large">{{ userName }} </span>
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

                <span v-for="vote in allVotes" v-bind:key="vote.votename">
                    <v-card max-width="100%" outlined style="padding: 20px 0 20px 0;" v-bind:style="[votedList[vote.votename]==='true' ? {'background':'#999999'} : {'background':'rgb(245,246,250)'}]" @click="hasVoted(vote.votename, vote.description)">
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="title">{{ vote.votename }}</v-list-item-title>
                                <v-list-item-subtitle class="subtitle">{{ vote.description }}</v-list-item-subtitle>
                            </v-list-item-content>   
                            <v-list-item-content align="right">
                                <v-list-item-title class="title">{{vote.count}}/10</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item style="padding-left: unset">
                            <v-chip align="left" small v-if="votedList[vote.votename] === 'true'" class="ma-2" color="#dfc8c8" text-color="#a76666" style="font-weight: bold;">
                                <v-avatar left>
                                  <v-icon>mdi-checkbox-marked-circle</v-icon>
                                </v-avatar>
                                투표 완료
                            </v-chip>
                            <v-list-item-content>
                                <v-list-item-subtitle align="right" class="subtitle">투표 마감일: {{trim(vote.end)}}</v-list-item-subtitle>
                            </v-list-item-content>

                        </v-list-item>

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
            trim: function(date) {
              return date.substr(0, 10);
            },
            modalOn : function(votename, desc) {
                this.$store.commit('vote/SET_VOTE', votename);
                this.$store.commit('vote/SET_VOTE_DESC', desc);
                this.$store.dispatch('common/setModalResult', 'on');
            },
            hasVoted(votename, desc) {
                if(this.$store.getters['common/isAdmin'] || this.votedList[votename]==='true') {
                    this.modalOn(votename, desc);
                } else {
                    this.votingModalOn(votename, desc);
                }
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
            this.$store.dispatch('vote/getAllVotes');
            this.$store.dispatch('vote/getUserVotedInfo', this.userId);
        }
    };
</script>