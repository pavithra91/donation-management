<template>
  <v-container>
    <v-row class="my-5">
      <v-col offset-lg="1">
        <label class="text-h3">Watchlist</label>
      </v-col>
    </v-row>
    <v-layout row justify-center>
      <v-row>
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
      watchlist: true,
    };
  },
  mounted() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (localStorage.getItem("user_name") == "undefined") {
      this.$router.push("/SignIn");
    } else if (localStorage.getItem("user_name") != "") {
      this.id = localStorage.getItem("user_token");
    }

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

    fetch("http://localhost:3000/api/campaign/getWatchlist", requestOptions)
      .then(async (response) => {
        const resdata = await response.json();
        this.campaign = resdata.data;
      })
      .catch((err) => console.log(err.message));

  },

  methods: {

  },
};
</script>
