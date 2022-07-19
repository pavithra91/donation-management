<template>

<v-row>
    <v-col style="margin-left: 200px;">
    <v-img src="https://images.gofundme.com/w6N_kKBEEcPGC9bK384LWJ1mYQ8=/720x405/https://d2g8igdw686xgo.cloudfront.net/66573895_165758986972661_r.jpeg">       
    </v-img>
    </v-col>
    <v-col>
        <v-card style="margin-left: 10px">
<v-card-title class="Title">5000 Rs</v-card-title>
<br />

<div class="noOfDonations">{{noOfDonations}}</div>
<div class="noOfDonationstxt">donations</div>

<v-row>
    <v-col>
        <v-btn style="margin-left: 30px; margin-top: 30px" x-large color="success" dark width="400px">Donate</v-btn>
    </v-col>
</v-row>

<v-row>
    <v-col>
        <v-btn outlined style="margin-left: 30px; margin-top: 10px" x-large > <v-icon style="margin-right: 10px;">mdi-heart</v-icon> Watchlist</v-btn>
    </v-col>
</v-row>


</v-card>

    </v-col>
    <v-col cols="2"></v-col>
</v-row>


</template>

<script>
export default {
    data() {
        return {
            noOfDonations: 1095
        }
    },
}
</script>

<style scoped>
.Title{
    color:#4caf50;
    font-size: xx-large;
    
}
.noOfDonations{
    color:#656969;
    font-size: xx-large;
    margin-left: 30px;
}
.noOfDonationstxt{
    color:#656969;
    font-size: medium;
    margin-left: 30px;
}
</style>