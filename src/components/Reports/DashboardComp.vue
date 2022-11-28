<template>
<v-container>
  <v-row>
    <v-col md="4">
      <v-card width="300" height="150" class="my5">
        <v-card-title class="mx-6 red--text text--lighten-2">Campaigns</v-card-title>
        <v-row>
          <v-col md="2"></v-col>
          <v-col md="6">
            <h2 class="red--text text--darken-1">{{ noOfCampaigns }}</h2>
          </v-col>
        </v-row>
        <img
          class="illustrator-img"
          :src="require('../../assets/img/dashboard/1.png')"
          alt=""
          style=""
        />
      </v-card>
    </v-col>

    <v-col md="4">
      <v-card width="300" height="150" class="my5">
        <v-card-title class="mx-6 deep-purple--text text--lighten-2">Donations</v-card-title>
        <v-row>
          <v-col md="1"></v-col>
          <v-col md="6">
            <h2 class="deep-purple--text text--darken-1">$ {{donations}}</h2>
          </v-col>
        </v-row>
        <img
          class="illustrator-img"
          :src="require('../../assets/img/dashboard/2.png')"
          alt=""
          style=""
        />
      </v-card>
    </v-col>

    <v-col md="4">
      <v-card width="300" height="150" class="my5">
        <v-card-title class="mx-6 teal--text text--lighten-2">Users</v-card-title>
        <v-row>
          <v-col md="2"></v-col>
          <v-col md="6">
            <h2 class="teal--text text--darken-1">{{noOfUsers}}</h2>
          </v-col>
        </v-row>
        <img
          class="illustrator-img"
          width="120"
          height="177"
          :src="require('../../assets/img/dashboard/4.png')"
          alt=""
          style=""
        />
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
          <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    chart-id="doughnut-chart"
    dataset-id-key="label"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { Doughnut } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
    components: {
    Doughnut
  },
  props: {
cssClasses: {
      default: '',
      type: String
    },
        width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
        noOfCampaigns : 0,
        donations : 0,
        noOfUsers : 0,
        chtdata: [],
        approve: 50,
        chartData: {
        labels: ['Pending', 'Under Review', 'Approved', 'Rejected'],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: [2,0,3, 1]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  created(){
this.initialize();
  },
  methods:{
    initialize() {
              fetch(
                process.env.VUE_APP_API_URL + "/misc/getAdminDashboardDetails")
        .then(async (response) => {
          const resdata = await response.json();

            this.noOfCampaigns = resdata.data[0].allCampaigns;
            this.donations = resdata.data[0].amounRaised;
            this.noOfUsers = resdata.data[0].noOfUsers;

           // this.chtdata.push(resdata.data[1].Pending);
          //  this.chtdata.push(resdata.data[1].UnderReview)
          //  this.chtdata.push(resdata.data[1].Approved)
          //  this.chtdata.push(resdata.data[1].Rejected)

            this.approve = resdata.data[1].Approved;

            console.log(this.approve);
        })
        .catch((err) => console.log(err.message));
    }
  },
};
</script>

<style scoped>
.illustrator-img {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 5%;
}
.v-img__img--contain {
  object-fit: contain;
}
</style>
