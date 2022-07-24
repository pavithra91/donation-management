<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title">Watch List</div>

      <div class="topfund">
        <v-layout row justify-center class="topfund-container">

              <v-flex md-12>
               
              </v-flex>

              <v-flex md-12>
                  <WachlistComp />
              </v-flex>

               <v-flex md-12>
               
              </v-flex>


        </v-layout>
      </div>

    </div>
  </div>
</template>


<script>
import WachlistComp from '@/components/WachlistComp.vue'
  export default {
    name: 'Watchlist',
    components: {
      WachlistComp
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