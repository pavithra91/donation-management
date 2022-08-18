<template>
  <v-container>
    <v-banner>
    <v-img :src="require('../assets/img/banner/1.png')" class="my-2" max-width="100%" max-height="100%" />
</v-banner>
   <v-layout row justify-center>
      <v-row class="my-3">
        <v-col v-for="n in 3"
      :key="n">
          <TopFundRaiser />
        </v-col>
      </v-row>
   </v-layout>

   <v-layout row justify-center>
      <v-row>
        <v-col offset-lg="2" offset-md="2">
              <label class="text-h2"> Browse fundraisers by category </label>
        </v-col>
      </v-row>
   </v-layout>
      <v-layout row justify-center>
      <v-row>
        <v-col offset-lg="2" offset-md="2">

            <v-img :src="require('../assets/img/icons/icon_vertical_ medical.svg')" width="100" height="100" />

            Medical & Health
        </v-col>

        <v-col>
            <v-img :src="require('../assets/img/icons/icon_vertical_ memorial.svg')" width="100" height="100" />
            Memorials & Funerals
        </v-col>

                <v-col>
            <v-img :src="require('../assets/img/icons/icon_vertical_ NP.svg')" width="100" height="100" />
        </v-col>

                <v-col>
            <v-img :src="require('../assets/img/icons/icon_vertical_ medical.svg')" width="100" height="100" />
        </v-col>

      </v-row>
   </v-layout>
     </v-container>
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
.topfund {
  background: #f8fcff;
}

.topfund-container {
  padding-top: 100px;
}

.category-container {
  background: #c1dad5;
  padding-bottom: 80px;
}

.category-icon-div {
  padding-top: 50px;
}
</style>
