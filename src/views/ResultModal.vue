<template>
    <v-dialog v-model="status" max-width="800">
        <v-card>
            <v-col cols="12" sm="3" align="left">
                <v-btn icon height="4vh">
                    <v-icon @click.stop="modalOff()">mdi-close</v-icon>
                </v-btn>
            </v-col>
            <v-card-text align="center" style="boarder-radius: 10px">
                <h1 class="headline" style="font-weight: bold;">{{vote}} 결과</h1>
                <h3 class="subtitle">{{desc}}</h3>
                <pie-chart v-if="checkData()" ref="pieChart" :chart-data="chartData" :options="chartOptions"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>



<script>
import { mapState } from 'vuex';
import PieChart from "./PieChart";
    export default {
        name: "ResultModal",
        components: {
            PieChart
        },
        computed: {
            ...mapState({
                vote: state => state.vote.vote,
                desc: state => state.vote.desc,
                proposals: state => state.vote.proposals,
                results: state => state.vote.voteResult,
                status: state => state.common.modal_result,
                colors: state => state.vote.colors,
            }),
        },
        watch: {
            status(val) {
                const t = this;
                if(val === true) {
                    this.$store.dispatch('vote/getVoteCounts', this.vote)
                    .then(function() {
                        t.setDatasets();
                    });
                    this.$store.dispatch('vote/getAllProposals', this.vote)
                    .then(function() {
                        t.setLabels();
                        t.setColors();
                        t.$refs.pieChart.update();
                    })
                               
                } 
            }
        },
        data() {
            return {
                chartOptions: {
                    // borderWidth: "10px",
                    hoverBackgroundColor: "red",
                    // hoverBorderWidth: "10px",
                    legend: {
                        display: true,
                        position: 'bottom',
                    }
                },
                chartData: {
                    hoverBackgroundColor: "red",
                    hoverBorderWidth: 10,
                    datasets: [
                        {
                            label: "Vote Result",
                            data: [null],
                            backgroundColor: [null],
                            hoverOffset: 4,
                        }
                    ],
                    labels: [
                        null,
                    ]
                },
            }
        },
        methods: {
            checkModal: function() {
                return this.$store.getters['common/modalResult'];
            },
            checkData: function() {
                console.log("check data");
                if(this.chartData.datasets[0].data != [null] 
                && this.chartData.labels != [null] 
                && this.chartData.datasets[0].backgroundColor != [null]) {
                    return true;
                } else {
                    return false;
                }
            },
            modalOff: function () {
                this.$store.dispatch('common/setModalResult', 'off');
                // initiate chart data when modal closes
                this.chartData.datasets[0].data = null;
                this.chartData.labels = null;
                this.chartData.datasets[0].backgroundColor = null;
                this.$store.dispatch('vote/refreshModal');
            },
            setLabels: function() {
                this.$set(this.chartData, 'labels', this.proposals);
                // this.chartData.labels = this.proposals;
            },
            setDatasets: function() {
                let list = [];
                for(let i=0; i<this.results.length; i++) {
                    list.push(Number(this.results[i]));
                }
                // this.chartData.datasets[0].data = list;
                this.$set(this.chartData.datasets[0], 'data', list);
            },
            setColors: function() {
                let list = [];
                for(let i=0; i<this.results.length; i++) {
                    list.push(this.colors[i]);
                }
                // this.chartData.datasets[0].backgroundColor = list;
                this.$set(this.chartData.datasets[0], 'backgroundColor', list);
            }
        },
        
    }
</script>