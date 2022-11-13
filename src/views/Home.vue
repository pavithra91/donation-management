<template>
  <v-container>
    <v-banner>
      <v-img :src="require('../assets/img/banner/1.png')" class="my-2" max-width="100%" max-height="100%" />
    </v-banner>

    <div class="wrapper">
  <div class="static-txt">Fundraise for...</div>
  <ul class="dynamic-txts">
    <li><span>Yourself</span></li>
    <li><span>Friends</span></li>
    <li><span>Charity</span></li>
  </ul>
</div>

    <v-layout row justify-center>
      <v-row class="my-3">
        <v-col v-for="campaign in campaignList" :key="campaign.id">
          <TopFundRaiser :campaign="campaign" />
        </v-col>
      </v-row>
    </v-layout>

    <v-layout row justify-center>
      <v-row>
        <v-col class="text-center">
          <label class="text-h2"> Browse fundraisers by category </label>
        </v-col>
      </v-row>
    </v-layout>
    <v-layout row justify-center>
      <v-row>
        <v-col offset-lg="2" offset-md="2">
          <v-row>
            <v-col class="mx-2 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ medical.svg')" width="100" height="100" />
            </v-col>
          </v-row>
         <router-link :to="{ name: 'Search', params: { category: 1 }}"><label>Medical & Health</label></router-link> 
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-5 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ memorial.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <router-link :to="{ path: '/Search?category='+'2'}"><label>Memorials & Funerals</label></router-link>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ NP.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label>NonProfit/Charity</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-5 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ medical.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label> Schools & Education</label>
        </v-col>
      </v-row>
    </v-layout>

    <v-layout class="my-5"  row justify-center>
      <v-row>
        <v-col offset-lg="2" offset-md="2">
          <v-row>
            <v-col class="mx-2 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ pets.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-3">Pets & Animals</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-5 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ disaster.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-7">Disaster Relief</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-4 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_club.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label>Clubs & Community</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-5 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ sport.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-5">Sports & Teams</label>
        </v-col>
      </v-row>  
    </v-layout>

    <v-layout class="my-5"  row justify-center>
      <v-row>
        <v-col offset-lg="2" offset-md="2">
          <v-row>
            <v-col class="mx-2 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ creative.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-3">Creative Projects</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-9 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ fun.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-13">Events</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-4 pa-5">
              <v-img :src="require('../assets/img/icons/icon_vertical_ kids.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-8">Kids & Family</label>
        </v-col>

        <v-col>
          <v-row>
            <v-col class="mx-5 pa-5">
               <v-img :src="require('../assets/img/icons/icon_vertical_ LGBT.svg')" width="100" height="100" />
            </v-col>
          </v-row>
          <label class="mx-14">LGBT</label>
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
  data(){
    return {
      campaignList: null
    }
  },
  mounted(){
    fetch('http://localhost:3000/api/campaign/getTopFundRaisers')
      .then(async (response) => {
        const resdata = await response.json()
        this.campaignList = resdata.data

      })
      .catch(err => console.log(err.message))
  }
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


*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}
.wrapper{
  display: flex;
  position: absolute;
  left:10%; top: 15%;

}
.wrapper .static-txt{
  color: #cef5e5;
  font-size: 60px;
  font-weight: 400;
  
}

.wrapper .dynamic-txts{
  margin-left: 15px;
  line-height: 90px;
  height: 90px;
  overflow: hidden;
}
.dynamic-txts li{
  list-style:none;
  color: #4caf50 ;
  font-size: 60px;
  font-weight: 500;
  top:0;
  position: absolute;
  
  animation: slide 12s steps(4)
  infinite;
}
.dynamic-txts li {
  position: relative;
}

.dynamic-txts li ::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  border-left: 2px solid #4caf50 ;
  left:0;
  animation: typing 3s steps(10)
  infinite;
}

@keyframes typing{
  40%,
  60%{
    left: calc(100% + 30px);
  }
  100%{
    left:0;
  }
}

@keyframes slide{
  100%{
    top: -360px;
  }
}

</style>
