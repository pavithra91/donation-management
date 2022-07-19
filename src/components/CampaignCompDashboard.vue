<template>
  <v-container>
     <div v-for="campaign in campaignlist" :key="campaign.id">
    <v-layout row>
      <v-flex md-8>     
        <v-img class="white--text align-end mb-9" height="200px" src="https://cdn.vox-cdn.com/thumbor/OTaHOVtIR6t8L0doPD-Kq6XYqeA=/0x0:1754x1241/1200x800/filters:focal(737x481:1017x761)/cdn.vox-cdn.com/uploads/chorus_image/image/68040475/GettyImages_1060748862.0.jpg">
          <v-row>            
              <v-col lg="9">
                <v-card-title>
                  <router-link :to ="{name: 'Campaign', params: { id: campaign.id }}">
                  <v-btn key="{{campaign.id}}" text class="v-title">
                    {{ campaign.campaignName }}
                  </v-btn>
                  </router-link>
                </v-card-title>
              </v-col>
              <v-col lg="3">
                <v-card-title>
                  <v-btn text class="v-goal">
                    Goal : {{ campaign.goalAmount }}
                  </v-btn>
                  <v-icon @click="addWatchlist">mdi-heart</v-icon>
                </v-card-title>
              </v-col>
          </v-row>
        </v-img>

      </v-flex>
    </v-layout>
            </div>
  </v-container>
</template>


<script>
export default {

  data() {
    return {
      id: "",
campaignlist: []
     // campaignlist: [
    //    { campaignName: "Campaign 1", id: 1, goalAmount: 2000 },
    //    { campaignName: "Campaign 2", id: 2, goalAmount: 5000 },
    //    { campaignName: "Campaign 3", id: 3, goalAmount: 8000 }
    //  ]
    }
  },

  mounted() {

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: "APNZn4jjhEvTLE9CQW8Z",
      });

var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

     // var campaignlist = []

      fetch("http://localhost:3000/api/campaign/getCampaigns", requestOptions)
      .then(async (response) => {
          const resdata = await response.json()

          resdata.data.forEach(element => {
            this.campaignlist.push(element)
          });

          this.campaignlist.forEach(element => {
            console.log(element.campaignName);
          });

        
          })
          .catch(err => console.log(err.message))
      
   // .then(res => res.json())
  //  .then(data => this.campaignlist = data)
  //  .catch(err => console.log(err.message))

   

  },

  methods: {
    addWatchlist(e) {
         console.log(e) 
    }
  }

}
</Script>


<style scoped>
.v-title {
  font-size: 30px;
  font-weight: bold;
  color: white;
}

.v-goal {
  font-size: 20px;
  color: white;
}

.v-campaign-container{
  margin-bottom: 10px;
}
</style>

