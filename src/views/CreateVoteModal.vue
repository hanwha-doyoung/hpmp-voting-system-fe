<template>
    <v-dialog v-model="status" max-width="600">
        <v-card>
            <v-col cols="12" sm="3" align="left">
                <v-btn icon height="4vh">
                    <v-icon @click.stop="modalOff()">mdi-close</v-icon>
                </v-btn>
            </v-col>
            <v-card-text align="center" style="boarder-radius: 10px">
                <h1 class="headline" style="font-weight: bold;">투표 생성</h1>
                <h4>생성하려는 투표의 내용을 입력해주세요.</h4>
                <v-layout column>
                    <v-flex align-self-center style="width: 100%">
                        <div class="subtitle-1" style="text-align: left; font-weight: bold; margin: 10px 0 5px 5px;">
                            ▉ 투표명</div>
                        <v-form>
                            <v-text-field flat solo background-color="rgb(245,246,250)"
                                        style="border-radius: 10px;" v-model="voteName"
                                        placeholder="투표명을 입력하세요."></v-text-field>
                        </v-form>
                    </v-flex>
                    <v-flex align-self-center style="width: 100%">
                        <div class="subtitle-1" style="text-align: left; font-weight: bold; margin: 10px 0 5px 5px;">▉ 투표 설명</div>
                        <v-form>
                            <v-textarea solo background-color="rgb(245,246,250)" flat
                                        style="border-radius: 10px;" v-model="voteDesc" filled
                                        placeholder="투표 내용을 자세히 입력하세요." auto-grow></v-textarea>
                        </v-form>
                    </v-flex>
                    <v-flex align-self-center style="width: 100%">
                        <div class="subtitle-1" style="text-align: left; font-weight: bold; margin: 10px 0 5px 5px;">▉ 투표 종료일</div>
                        <v-form>
                            <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                            >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="date" prepend-icon="mdi-calendar" v-bind="attrs"
                                          @blur="date = parseDate(dateFormatted)" v-on="on"></v-text-field>
                            </template>

                                <v-date-picker v-model="date" no-title @input="menu1 = false"
                            ></v-date-picker>
                            </v-menu>
                        </v-form>
                    </v-flex>
                    <v-flex align-self-center style="width: 100%">
                        <div class="subtitle-1" style="font-weight: bold; text-align: left; margin: 10px 0 5px 5px;">▉ 선택지</div>
                            <v-text-field flat solo background-color="rgb(245,246,250)"
                                        style="border-radius: 10px;" v-model="textFields.value"
                                        placeholder="선택지를 입력하세요."></v-text-field>
                            
                            <div v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                                <v-text-field flat solo background-color="rgb(245,246,250)" 
                                style="border-radius: 10px;" placeholder="선택지를 입력하세요." v-model="textField.value"></v-text-field>
                                <v-btn icon color="gray" fab x-small @click="remove(i)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                            </div>
                            <v-btn rounded width="100%" icon color="gray" @click="add">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                    </v-flex>

                    <v-container style="height: calc(100vh - 900px);"/>
                    <v-flex align-self-center style="width: 85%">
                        <v-btn block rounded large style="border-radius: 10px; font-size: large"
                            v-bind:disabled="!voteName || !voteDesc"
                            v-bind:dark="!(!voteName || !voteDesc)"
                            @click="create()">투표 등록
                        </v-btn>
                    </v-flex>
                    <v-container/>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CreateVoteModal",
        computed: {
            status: {
                get() {
                    return this.$store.state.common.modal_navigation;
                },
                set(val) {
                    this.$store.commit('common/SET_MODAL_NAVIGATION', val);
                }
            },
        },
        data() {
            return {
                voteName: null,
                voteDesc: null,
                proposals: [],
                textFields: [],
                date: new Date().toISOString().substr(0, 10),
                dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
                menu1: false,
            }
        },
        methods: {
            formatDate (date) {
                if (!date) return null

                const [year, month, day] = date.split('-')
                return `${month}/${day}/${year}`
            },
            parseDate (date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            async createVote(voteObj) {
                await this.$store.dispatch('vote/createVote', voteObj);
            },
            modalOff : function () {
                this.$store.dispatch('common/setModalNavigation', 'off');
            },
            create: function() {
                this.proposals.push(this.textFields.value);
                for(let i=0; i<this.textFields.length; i++) {
                    this.proposals.push(this.textFields[i].value);
                }
                this.createVote({
                    voteName: this.voteName,
                    description: this.voteDesc,
                    proposals: this.proposals,
                    date: this.date,
                });                
                this.modalOff();
                window.location.reload();
            },
            add () {
                this.textFields.push({ 
                    value: "",
                })
            },
            remove: function(index) {
                this.textFields.splice(index,1)
            },
        }
    }
</script>
<style>
    .text-fields-row {
        display: flex;
    }
</style>