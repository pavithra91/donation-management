<template>
  <v-container>
    <v-row class="my-5">
      <v-col offset-lg="1">
        <label class="text-h3">Campaign Dashboard</label>
      </v-col>
    </v-row>
    <v-layout row justify-center>
      <v-row>
        <v-col cols="1">

        </v-col>
        <v-col>
          <CampaignComp :campaign="campaign" :watchlist="watchlist" />
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>


<script>
import CampaignComp from "@/components/layouts/CampaignComp.vue";
export default {
  name: "Campaign-Dashboard",
  components: {
    CampaignComp,
  },
  data() {
    return {
      campaign: null,
      watchlist: false,
    };
  },
  mounted() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    this.id = this.$session.get("user_token");

    var raw = JSON.stringify({
      id: this.id,
    });

    var requestOptions = {
      method: "POST",
      mode: "cors",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // var campaignlist = []

    fetch(process.env.VUE_APP_API_URL + "/campaign/getCampaigns", requestOptions)
      .then(async (response) => {
        const resdata = await response.json();
        this.campaign = resdata.data;
        //   resdata.data.forEach(element => {
        //   this.campaignlist.push(element)
        //  });

        resdata.data.forEach((element) => {
          console.log(element);
        });
      })
      .catch((err) => console.log(err.message));

    // .then(res => res.json())
    //  .then(data => this.campaignlist = data)
    //  .catch(err => console.log(err.message))
  },

  methods: {
    addWatchlist(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
.topfund {
  background: #ffffff;
}

.topfund-container {
  padding-top: 10px;
}
.main-title {
  padding-top: 100px;
  padding-bottom: 60px;
  font-size: 40px;
  font-weight: bold;
  margin-left: 41%;
}
</style>