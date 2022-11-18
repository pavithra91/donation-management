<template>
  <v-container>
    <v-row class="my-5">
      <v-col offset-lg="1">
        <label  class="myFont">Watchlist</label>
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

    if (!this.$session.exists()) {
      this.$router.push("/SignIn");
    } else{
      this.id = this.$session.get('user_token');
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600&family=Poppins:wght@600&display=swap');

.myFont {
  font-size: 2.5rem;
  font-family: 'Archivo', sans-serif;
  line-height: 3rem;
}
</style>
