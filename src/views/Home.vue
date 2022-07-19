<template>
<div>
<v-banner>
     <v-img :src="require('@/assets/img/banner/1.png')" class="my-3" max-width="100%" max-height="100%" />
</v-banner>

<div class="topfund">
<v-layout row justify-center class="topfund-container">
  <v-flex md3>
    <TopFundRaiser />
  </v-flex>
   <v-flex md3>
    <TopFundRaiser />
  </v-flex>
   <v-flex md3>
    <TopFundRaiser />
  </v-flex>
</v-layout>
</div>
</div>
</template>

<script>
import TopFundRaiser from '@/components/TopFundRaiser.vue'
  export default {
    name: 'Home',
    components: {
      TopFundRaiser
    },
  }
</script>

<style scoped>
.topfund{
  background: #f8fcff;
}
.topfund-container{
  padding-top: 100px;
}
</style>
