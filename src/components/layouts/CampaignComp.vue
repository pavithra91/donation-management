<template>
  <v-container>
    <v-row>
      <v-col cols="4" v-for="item in campaign" :key="item.id">
        <v-card max-width="344">
          <v-chip v-if="(item.campaignStatus == 'Approved')" class="my-2" color="primary"
            style="position: absolute; z-index: 1;">
            <v-icon left>
              mdi-check-decagram
            </v-icon>Verified
          </v-chip>
          <v-img :src="item.mainImg" height="200" contain> </v-img>

          <v-row>
            <v-col cols="11" class="d-inline-block text-truncate">
              <v-card-title>
                <router-link :to="{ name: 'Campaign', params: { id: item.id } }">
                  <label>{{ item.campaignName }}</label>
                </router-link>
              </v-card-title>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8" class="text-truncate mx-4">
              {{ item.shortDescription }}
            </v-col>
            <v-col cols="2">
              <v-btn icon v-if="watchlist" color="red">
                <v-icon @click="removeCampaignFromWatchList(item.id)">mdi-heart</v-icon>
              </v-btn>
              <v-btn icon v-else color="grey">
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>


            <v-spacer></v-spacer>
            <v-col cols="3">

            </v-col>
          </v-row>

          <v-row>
            <v-col class="mx-4">
              <v-progress-linear :value="(item.raiedAmount / item.goalAmount) * 100" height="8" color="#09cc7f">
              </v-progress-linear>
            </v-col>
          </v-row>

          <v-layout row class="mx-0 pa-0">
            <v-col cols="6">
              <label class="font-weight-medium">Raised : </label>
              <label class="font-weight-medium">Rs. {{ item.raiedAmount.toLocaleString() }}</label>
            </v-col>
            <v-col cols="6" class="text-right">
              <label class="font-weight-medium">Goal : </label>
              <label class="font-weight-medium">Rs. {{ item.goalAmount.toLocaleString() }}</label>
            </v-col>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CampaignComp",
  props: ["campaign", "watchlist"],
  data() {
    return {};
  },
  methods: {
    removeCampaignFromWatchList(item) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: item,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/campaign/removeFromWatchlist",
        requestOptions
      )
        .then(async (response) => {
          const resdata = await response.json();
          this.campaign = resdata.data;
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>