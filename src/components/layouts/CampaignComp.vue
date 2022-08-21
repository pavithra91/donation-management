<template>
    <v-container>
        <v-row>
            <v-col class="my-5" offset-md="1" offset-sm="1" offset-lg="1" cols="3" v-for="item in campaign" :key="item.id">
                <v-card max-width="344">
                    <v-img :src=item.mainImg height="200" contain>
                    </v-img>

                    <v-row>
                        <v-col cols="11" class="d-inline-block  text-truncate">
                            <v-card-title>
                                <router-link :to="{ name: 'Campaign', params: { id: item.id } }">
                                    <label>{{ item.campaignName }}</label></router-link>
                            </v-card-title>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="9" class="text-truncate mx-4">
                            {{ item.shortDescription }}
                        </v-col>
                        <v-btn icon color="grey">
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </v-row>


                    <v-row>
                        <v-col class="mx-4">
                            <v-progress-linear :value="calccampaignProgress" height="8" color="#09cc7f">
                            </v-progress-linear>
                        </v-col>
                    </v-row>

                    <v-layout row class="mx-0 pa-0">
                        <v-col cols="6">
                            <label class="font-weight-medium">Raised : </label>
                            <label class="font-weight-medium">Rs. {{ item.raiedAmount.toLocaleString() }}</label>
                        </v-col>
                        <v-col cols="6" class="text-right">                 
                            <label class="font-weight-medium">Goal : </label>
                            <label class="font-weight-medium">Rs. {{ item.goalAmount.toLocaleString() }}</label>
                        </v-col>
                    </v-layout>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "CampaignComp",
    props: ["campaign"],
    data() {
        return {

        }
    },
    mounted() {
        console.log(this.campaign);

        if (this.campaign == null) {
            console.log("null campaign");
        }
    },
    computed: {
        calccampaignProgress() {
            return this.prgoessVal = (this.campaign.raiedAmount / this.campaign.goalAmount) * 100;
        }

    }
}
</script>
