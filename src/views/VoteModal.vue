<template>
    <v-dialog v-model="status" max-width="600">
        <v-card>
            <v-col cols="12" sm="3" align="left">
                <v-btn icon height="4vh">
                    <v-icon @click.stop="modalOff()">mdi-close</v-icon>
                </v-btn>
            </v-col>
            <v-card-text align="center" style="boarder-radius: 10px">
                <h1 class="headline" style="font-weight: bold; margin-bottom: 20px">{{vote}} 투표</h1>
                    <v-card max-width="100%" outlined style="padding: 30px 30px 30px 30px;" color="rgb(245,246,250)">
                        <v-list-item class="title">{{des}}</v-list-item>
                        <v-radio-group v-model="selectedProposal" max-width="80%">
                            <v-radio v-for="(proposal, index) in proposals" :key="proposal" :label="proposal" color="secondary" v-bind:value="index+1" style="margin-bottom: 20px;"></v-radio>
                        </v-radio-group>
                    </v-card>
                    <v-spacer style="padding:5px 0 5px 0;"/>
                <v-btn width="85%" rounded large style="border-radius: 10px; font-size: large; font-weight: bold" @click="submitVote()">투표하기</v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
    export default {
        name: "VoteModal",
        components: {
        },
        computed: {
            ...mapState({
                vote: state => state.vote.vote,
                des: state => state.vote.desc,
                proposals: state => state.vote.proposals,
            }),
            status: {
                get() {
                    return this.$store.state.common.modal_vote;
                },
                set(val) {
                    this.$store.commit('common/SET_MODAL_VOTE', val);
                }
            },
        },
          data() {
            return {
                selectedProposal: null,
            };
        },
        methods: {
            modalOff : function () {
                this.$store.dispatch('common/setModalVote', 'off');
            },
            submitVote() {
                this.$store.dispatch('vote/submitVote', {
                    voteName: this.vote,
                    idx: this.selectedProposal,
                })
                this.modalOff();
                location.replace(document.referrer);
            }
            
        },
        
        
    }
</script>

<style>
    .proposal{
        font-size: 20px;
    }
</style>