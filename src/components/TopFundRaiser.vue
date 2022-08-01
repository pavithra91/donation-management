<template>
<v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="../assets/img/main/case1.png"
      height="200px"
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder

      <v-btn
              icon
              color="grey"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
    </v-card-subtitle>

    <div class="progress"><v-progress-linear value="15" height="8" color="#09cc7f"></v-progress-linear></div>

<v-layout row class="raied-container">
    <v-flex md8 sm4>
        <div class="raied-text">Raised : 
            <div class="raied-amount">Rs. 2000</div>
        </div>
    </v-flex>
    <v-flex md4 sm4>
        <div class="raied-text">Goal : 
            <div class="raied-amount">Rs. 60000</div>
            
        </div>
    </v-flex>
</v-layout>
    <br />
  </v-card>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  mounted(){
    fetch('http://localhost:3000/api/campaign/getTopFundRaisers')
      .then(async (response) => {
        const resdata = await response.json()
        this.badges = resdata.data

      })
      .catch(err => console.log(err.message))
  }
}
</script>

<style scoped>
.progress{
    margin-left: 20px;
    margin-right: 20px;
}
.raied-container{
    margin: 10px;
    padding-left: 10px;
}
.raied-text{
    color: #072366;
    font-size: 14px;
}
.raied-amount{
    color: #072366;
    font-size: 14px;
    font-weight: bold;
}
</style>