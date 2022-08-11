<template>
  <div>
    <v-banner>
      <v-img :src="require('../assets/img/banner/1.png')" class="my-3" max-width="100%" max-height="100%" />
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

    <v-divider style="margin-top: 50px;"></v-divider>




    <div class="category-container">

      <v-row>

        <v-col></v-col>

        <v-col>
          <p class="font-weight-black" style="font-size: xx-large; padding-left: 100px; padding-top: 20px;">
            Browse fundraisers by category
          </p>
        </v-col>
        <v-col></v-col>

      </v-row>
      <v-layout row justify-center class="category-icon-div">
        <v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ medical.svg')" width="100" height="100" />
            </div>
            <div>
              <v-btn plain style="padding: 0; margin: 0; color: black;">Medical & Health</v-btn>
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 25px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ memorial.svg')" width="100" height="100" />
            </div>
            <div>
              Memorials & Funerals
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ NP.svg')" width="100" height="100" />
            </div>
            <div>
              NonProfit/Charity
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ school.svg')" width="100" height="100" />
            </div>
            <div>
              Schools & Education
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

      </v-layout>
      <v-layout row justify-center class="category-icon-div">
        <v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-col>
            <div style="padding-left: 1px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ pets.svg')" width="100" height="100" />
            </div>
            <div>
              Pets & Animals
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 1px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ disaster.svg')" width="100" height="100" />
            </div>
            <div>
              Disaster Relief
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 25px">
              <v-img :src="require('../assets/img/icons/icon_vertical_club.svg')" width="100" height="100" />
            </div>
            <div>
              Clubs & Community
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 5px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ sport.svg')" width="100" height="100" />
            </div>
            <div>
              Sports & Teams
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>

      </v-layout>

      <v-layout row justify-center class="category-icon-div">
        <v-row>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ creative.svg')" width="100" height="100" />
            </div>
            <div>
              Creative Projects
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ fun.svg')" width="100" height="100" />
            </div>
            <div style="padding-left: 20px">
              Events
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ kids.svg')" width="100" height="100" />
            </div>
            <div style="padding-left: 10px">
              Kids & Family
            </div>

          </v-col>
          <v-col>
            <div style="padding-left: 10px">
              <v-img :src="require('../assets/img/icons/icon_vertical_ LGBT.svg')" width="100" height="100" />
            </div>
            <div style="padding-left: 35px">
              LGBT
            </div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-layout>
    </div>


    <div>
      <v-layout style="margin-top: 100px;margin-bottom: 100px;">
        <v-row>
          <v-col cols="2"></v-col>
          <v-col>
            <v-row>
              <v-col cols="4" style="margin-left: 30px;">
                <v-img src="../assets/img/icons/pc_optimized.png" width="100px" height="100px"></v-img>
              </v-col>
              <v-col>
                <v-row  style="margin-top: 5px;">
                  <span style="font-weight: bold; font-size: 20px;">Create</span>
                </v-row>
                <v-row>Anyone can start a Charity campaign for FREE.</v-row>            
              </v-col>
            </v-row>
          </v-col>
          <v-col>
                        <v-row>
              <v-col cols="4" style="margin-left: 30px;">
                <v-img src="../assets/img/icons/megaphone-2_optimized.png" width="100px" height="100px"></v-img>
              </v-col>
              <v-col>
                <v-row  style="margin-top: 5px;">
                  <span style="font-weight: bold; font-size: 20px;">Share</span>
                </v-row>
                <v-row>Easily share your campaign and reach more people.</v-row>            
              </v-col>
            </v-row>
          </v-col>
          <v-col>
                                    <v-row>
              <v-col cols="4"  style="margin-left: 30px;">
                <v-img src="../assets/img/icons/wallet_optimized.png" width="100px" height="100px"></v-img>
              </v-col>
              <v-col>
                <v-row  style="margin-top: 5px;">
                  <span style="font-weight: bold; font-size: 20px;">Share</span>
                </v-row>
                <v-row>Receive and access your money right away.</v-row>            
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
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
