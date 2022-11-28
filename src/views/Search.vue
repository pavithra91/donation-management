<template>
    <v-container>
        <v-row class="my-5">
            <v-col offset-lg="1">
                <label class="text-h3">Browse </label> <label class="text-h3"> {{ categoryName }} fundraisers</label>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-row>
                    <v-col></v-col>
                    <v-col cols="8">
                        <v-card>
                            <v-card-title>Filter</v-card-title>

                            <v-divider style="padding-bottom: 10px;"></v-divider>

                        <!--    <v-col class="px-3" style="padding-bottom: 0;">
                                <v-text-field label="Search" dense outlined></v-text-field>
                            </v-col> -->

                            <v-col class="px-3" style="padding-top: 0; padding-bottom: 0;">
                                <v-select :items="categoryItems" label="Category" v-model="categoryVal" outlined dense @change="categoryChange($event)"></v-select>
                            </v-col>

                            <v-col class="px-3" style="padding-top: 0; padding-bottom: 0;">
                                <v-select :items="proviceList" v-model="province" outlined dense label="Province" @change="provinceChange($event)"></v-select>
                            </v-col>

                            <v-row>
                                <v-col cols="2"></v-col>
                                <v-spacer></v-spacer>
                                <v-col>
                                    <v-btn color="primary" outlined text @click="filterCampaign()">
                                        Search
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="9" style="padding-top: 0;">
                <CampaignComp :campaign="campaign" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CampaignComp from "@/components/layouts/CampaignComp.vue";
export default {
    props: ['category', 'categoryName'],
    components: {
        CampaignComp
    },
    data() {
        return {
            campaign: null,
            categoryVal: "",
            province: "",
            categoryItems: ['Medical & Health', 'Memorials & Funerals', 'NonProfit/Charity', 'Schools & Education', 'Pets & Animals', 'Disaster Relief', 'Clubs & Community', 'Sports & Teams', 'Creative Projects', 'Events', 'Kids & Family', 'LGBT'],
            proviceList: ['Western Province', 'Southern Province', 'Central Province', 'Eastern Province', 'Northern Province', 'North Western Province', 'North Central Province', 'Sabaragamuwa Province', 'Uva Province',],
        }
    },
    created() {
        this.initialize();
    },
    methods: {
        initialize() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                category: this.category,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(process.env.VUE_APP_API_URL + "/campaign/getCampaignByCategory", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                    }
                    this.campaign = resdata.data;
                })
        },
        categoryChange($event){   
            this.categoryName = $event;
            this.province = "";
            let categoryID = this.categoryItems.indexOf($event) + 1;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                category: categoryID,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(process.env.VUE_APP_API_URL + "/campaign/getCampaignByCategory", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                    }
                    
                    if(resdata.msg == "No data found"){
                        this.campaign = [];
                    }
                    else
                    {
                        this.campaign = resdata.data;
                    }
                })
        },
        provinceChange($event){
            let province = $event;
            this.categoryName = $event;
            this.categoryVal = "";
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                province: province,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch(process.env.VUE_APP_API_URL + "/campaign/getCampaignByProvince", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                    }
                    
                    if(resdata.msg == "No data found"){
                        this.campaign = [];
                    }
                    else
                    {
                        this.campaign = resdata.data;
                    }
                })
        },
        filterCampaign(){

        }
    },
    mounted() {

    }
}
</script>