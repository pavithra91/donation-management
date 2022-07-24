<template>
    <div class="main-container">
        <div class="sub-container" v-if="campaign">
            <div class="main-title"> {{ campaign.campaignName }}</div>
        </div>
        <div class="sub-container" v-else>
            No Data Found
        </div>

        <v-container>

<CampaignTemp :massage="massage" />

        </v-container>

    </div>

    
</template>

<script>

import CampaignTemp from '@/components/CampaignTemp.vue'


export default {
    name: 'Campaign',
    components: {
      CampaignTemp
    },
    props: ['id'],
    data() {
        return {
            campaign: null,
            massage: null
        }
    },
    mounted() {
        fetch('http://localhost:3000/api/campaign/getCampaign?id=' + this.id)
            .then(async (response) => {
          const resdata = await response.json()

          this.campaign = resdata.data

          this.massage = resdata.data

          })
          .catch(err => console.log(err.message))   
    }
}
</script>


<style scoped>
.main-title {
  padding-top: 100px;
  padding-bottom: 60px;
  font-size: 40px;
  font-weight: bold;
  margin-left: 28%;
}
</style>