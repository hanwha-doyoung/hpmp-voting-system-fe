import { Doughnut, mixins  } from "vue-chartjs";
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["options"],
  methods: {
    update() {
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
    this.$data._chart.update();
  },
};
