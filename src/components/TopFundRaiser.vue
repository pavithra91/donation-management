<template>
  <v-card class="mx-auto" max-width="344">
    <v-img :src="campaign.mainImg" height="200px"></v-img>

    <v-row class="mt-0">
      <v-col md="11" lg="11" sm="8" class="d-inline-block text-truncate">
        <v-card-title class="my-0">
          <router-link :to="{ path: '/Campaign/' + campaign.id}"><label>{{ campaign.campaignName }}</label></router-link>
          
        </v-card-title>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col md="10" lg="10" sm="8" class="my-0">
        <v-card-text>
          <p class="truncate-lines mt-0">{{ campaign.shortDescription }}</p>
        </v-card-text>
      </v-col>
      <v-col md="1" lg="1" sm="2" class="float-md-left my-5 pa-0">
        <v-btn icon color="grey">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col md="11">
        <v-progress-linear
          :value="calccampaignProgress"
          height="8"
          color="#09cc7f"
        >
        </v-progress-linear>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- <div class="progress">
      <v-progress-linear
        value="15"
        height="8"
        color="#09cc7f"
      ></v-progress-linear>
    </div> -->

    <v-layout row class="raied-container">
      <v-flex md8 sm4>
        <div class="raied-text">
          Raised :
          <div class="raied-amount">
            Rs. {{ campaign.raiedAmount.toLocaleString() }}
          </div>
        </div>
      </v-flex>
      <v-flex md4 sm4>
        <div class="raied-text">
          Goal :
          <div class="raied-amount">
            Rs. {{ campaign.goalAmount.toLocaleString() }}
          </div>
        </div>
      </v-flex>
    </v-layout>
    <br />
  </v-card>
</template>

<script>
export default {
  name: "TopFundRaiser",
  props: ["campaign"],
  data() {
    return {};
  },
  computed: {
    calccampaignProgress() {
      return this.prgoessVal = (this.campaign.raiedAmount / this.campaign.goalAmount) * 100;
    },
  },
};
</script>

<style scoped>
.progress {
  margin-left: 20px;
  margin-right: 20px;
}
.raied-container {
  margin: 10px;
  padding-left: 10px;
}
.raied-text {
  color: #072366;
  font-size: 14px;
}
.raied-amount {
  color: #072366;
  font-size: 14px;
  font-weight: bold;
}

.truncate-lines {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: normal;
}
</style>