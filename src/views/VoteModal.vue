<template>
    <v-dialog v-model="status" max-width="800">
        <v-card>
            <v-col cols="12" sm="3" align="left">
                <v-btn icon height="4vh">
                    <v-icon @click.stop="modalOff()">mdi-close</v-icon>
                </v-btn>
            </v-col>
            <v-card-text align="center" style="boarder-radius: 10px">
                <h1 class="headline" style="font-weight: bold;">{{vote}} 투표</h1>
                <div style="height: calc(100vh - 264px); margin-top:20px; overflow-y:scroll;">
                    <v-card max-width="100%" outlined style="padding: 30px 0 30px 0;" color="rgb(245,246,250)">
                        <v-radio-group v-model="selectedProposal">
                            <v-radio v-for="(proposal, index) in proposals" :key="proposal" :label="proposal" v-bind:value="index+1"></v-radio>
                        </v-radio-group>
                    </v-card>
                    <v-spacer style="padding:5px 0 5px 0;"/>
                </div>
                <v-btn @click="submitVote()">투표하기</v-btn>
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