<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title">Campaign Dashboard</div>

      <div class="topfund">
        <v-layout row justify-center class="topfund-container">

              <v-flex md-12>
               
              </v-flex>

              <v-flex md-12>
                  <CampaignCompDashboard />
              </v-flex>

               <v-flex md-12>
               
              </v-flex>


        </v-layout>
      </div>

    </div>
  </div>
</template>


<script>
import CampaignCompDashboard from '@/components/CampaignCompDashboard.vue'
  export default {
    name: 'Campaign-Dashboard',
    components: {
      CampaignCompDashboard
    },
  }
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