<template>
    <div class="main-container">
        <div class="sub-container" v-if="campaign">
            <div class="main-title"> {{ campaign.campaignName }}</div>
        </div>
        <div class="sub-container" v-else>
            No Data Found
        </div>

        <v-container>

            <v-container>
                <v-row>
                    <v-col style="margin-left: 200px; padding-top: 0;">
                        <v-img :src=campaign.mainImg width="730" height="411">
                        </v-img>
                    </v-col>
                    <v-col>
                        <v-card style="margin-left: 10px">
                            <v-row>
                                <v-col cols="md-3" class="d-flex justify-center" style="padding-right: 0px;">
                                    <div class="Title">{{ campaign.raiedAmount }} </div>
                                </v-col>
                                <v-col style="
    padding-left: 0px;
">
                                    <div style="margin-top: 12px; margin-left:0px"> RS raised of {{ campaign.goalAmount
                                    }}
                                        Rs Goal</div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="9" style="padding-left: 38px;">
                                    <v-progress-linear :value="calccampaignProgress" height="8" color="#09cc7f">
                                    </v-progress-linear>
                                </v-col>
                                <v-col cols="1">

                                </v-col>

                            </v-row>

                            <br />

                            <div class="noOfDonations">{{ noOfDonations }}</div>
                            <div class="noOfDonationstxt">donations</div>

                            <v-row>
                                <v-col>
                                    <v-btn style="margin-left: 30px; margin-top: 30px" x-large color="success" dark
                                        width="400px" @click="makeDonation">Donate</v-btn>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col>
                                    <v-btn outlined style="margin-left: 30px; margin-top: 10px" x-large>
                                        <v-icon style="margin-right: 10px;">mdi-heart</v-icon> Watchlist
                                    </v-btn>
                                </v-col>
                                <v-col>

                                    <div class="text-center">
                                        <v-dialog v-model="dialog" width="550">
                                            <template v-slot:activator="{ on, attrs }">

                                                <v-btn outlined v-bind="attrs" v-on="on"
                                                    style="margin-left: 30px; margin-top: 10px" x-large>
                                                    <v-icon style="margin-right: 10px;">mdi-heart</v-icon> Share
                                                </v-btn>
                                            </template>

                                            <v-card>
                                                <v-card-title class="text-h5">
                                                    <div style="margin: 10px;">Help by sharing</div>
                                                </v-card-title>

                                                <v-card-text
                                                    style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
                                                    Fundraisers shared on social networks raise up to 5x more.
                                                </v-card-text>


                                                <v-divider style="margin-left: 20px; margin-right: 20px;"></v-divider>

                                                <v-card-text style="margin: 10px;">
                                                    <v-row>
                                                        <v-col>
                                                            <ShareNetwork network="facebook"
                                                                url="https://news.vuejs.org/issues/180"
                                                                :title=campaign.campaignName description="" quote=""
                                                                hashtags="vuejs,vite">
                                                                <i class="fab fah fa-lg fa-facebook-f"></i>
                                                                <span style="margin-left: 5px;">Facebook</span>

                                                            </ShareNetwork>
                                                        </v-col>
                                                        <v-col>
                                                            <ShareNetwork network="twitter"
                                                                url="https://news.vuejs.org/issues/180"
                                                                :title=campaign.campaignName
                                                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                                                hashtags="vuejs,vite">
                                                                <i class="fab fah fa-lg fa-twitter"></i>
                                                                <span style="margin-left: 5px;">Twitter</span>

                                                            </ShareNetwork>
                                                        </v-col>
                                                        <v-col>
                                                            <ShareNetwork network="email"
                                                                url="https://news.vuejs.org/issues/180"
                                                                :title=campaign.campaignName
                                                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                                                hashtags="vuejs,vite">
                                                                <i class="fab fah fa-lg fa-envelope"></i>
                                                                <span style="margin-left: 5px;">Email</span>

                                                            </ShareNetwork>
                                                        </v-col>
                                                    </v-row>

                                                    <v-row>
                                                        <v-col>
                                                            <ShareNetwork network="whatsapp"
                                                                url="https://news.vuejs.org/issues/180"
                                                                :title=campaign.campaignName
                                                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                                                hashtags="vuejs,vite">
                                                                <i class="fab fah fa-lg fa-whatsapp"></i>
                                                                <span style="margin-left: 5px;">Whatsapp</span>

                                                            </ShareNetwork>
                                                        </v-col>
                                                        <v-col>
                                                        </v-col>
                                                        <v-col>
                                                        </v-col>
                                                    </v-row>



                                                </v-card-text>

                                                <v-divider style="margin-left: 20px; margin-right: 20px;"></v-divider>

                                                <v-row>
                                                    <v-col
                                                        style="margin-left: 30px; margin-right: 10px; margin-top: 30px;">
                                                        <v-text-field v-model="currenturl" outlined label="Copy link"
                                                            :value="currenturl"></v-text-field>

                                                    </v-col>
                                                    <v-col cols="2" style="margin-right: 30px; margin-top: 40px;">
                                                        <v-btn color="success" @click="copyText">Copy</v-btn>
                                                    </v-col>
                                                </v-row>

                                                <v-divider style="margin-left: 20px; margin-right: 20px;"></v-divider>

                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="primary" text @click="dialog = false"
                                                        style="margin-top: 10px;">
                                                        Close
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </div>

                                </v-col>
                            </v-row>

                        </v-card>

                    </v-col>
                    <v-col cols="2"></v-col>
                </v-row>


                <v-row>
                    <v-col style="margin-left: 200px;">
                        <v-row>
                            <v-col cols="1">
                                <v-icon>fa-solid fa-user</v-icon>
                            </v-col>
                            <v-col cols="8"> {{ organizerName }} is Organizing the Campaign</v-col>
                        </v-row>
                    </v-col>
                    <v-col></v-col>
                    <v-col cols="2"></v-col>
                </v-row>

                <v-row>
                    <v-col style="margin-left: 200px;">
                        <v-row>
                            <v-divider></v-divider>
                        </v-row>
                    </v-col>
                    <v-col></v-col>
                    <v-col cols="1"></v-col>
                </v-row>

                <v-row>
                    <v-col style="margin-left: 200px; padding: 5px;">
                        <v-row>
                            <v-col>
                                Created {{ campaignDate }}
                            </v-col>
                            <v-col>
                                <v-icon>fa-solid fa-tag</v-icon>
                                {{ tags }}

                            </v-col>
                        </v-row>
                        <v-row>
                            <v-divider></v-divider>
                        </v-row>
                    </v-col>
                    <v-col>

                    </v-col>
                    <v-col cols="1"></v-col>
                </v-row>

                <v-row>
                    <v-col style="margin-left: 200px;">




                        <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                            <v-tab href="#Story">
                                Story
                            </v-tab>
                            <v-tab href="#FAQ">
                                FAQ
                            </v-tab>
                            <v-tab href="#Updates">
                                Updates
                            </v-tab>
                            <v-tab href="#Comments">
                                Comments
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item :key="1" value="Story">
                                <v-card flat>
                                    <v-card-text></v-card-text>

                                    <div v-html="campaign.campaignDescription"></div>
                                    <!--  {{massage.campaignDescription}}-->

                                </v-card>
                            </v-tab-item>
                            <v-tab-item :key="2" value="FAQ">
                                <v-card flat>

                                    <v-expansion-panels multiple style="margin-top: 20px;">
                                        <v-expansion-panel v-for="faqitem in FAQ" :key="faqitem.id">
                                            <v-expansion-panel-header>{{ faqitem.quesqtion }}</v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                {{ faqitem.answer }}
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>

                                    </v-expansion-panels>

                                </v-card>
                            </v-tab-item>
                            <v-tab-item :key="3" value="Updates">
                                <v-card flat>
                                    <v-card-text>Updates</v-card-text>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item :key="4" value="Comments">
                                <v-card flat style="margin-top: 20px;">
                                    <div v-for="comment in comments" :key="comment.id">
                                        <v-row>
                                            <v-col cols="2">
                                                <div>
                                                    <v-img :src=comment.profileImg width="50" height="50">
                                                    </v-img>
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <strong> {{ comment.name }}</strong>
                                                <br />
                                                {{ comment.comment }}
                                            </v-col>
                                        </v-row>
                                    </div>
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>

                    </v-col>
                    <v-col>
                    </v-col>
                    <v-col cols="1">
                    </v-col>
                </v-row>






            </v-container>

        </v-container>

    </div>


</template>

<script>

//import CampaignTemp from '@/components/CampaignTemp.vue'


export default {
    name: 'Campaign',
    components: {
        //  CampaignTemp
    },
    props: ['id'],
    data() {
        return {
            currenturl: "test",
            dialog: false,
            campaign: null,
            noOfDonations: 1095,
            prgoessVal: 0,
            organizerName: "Pavithra Jayasundara",
            campaignDate: "2022-07-22",
            tags: ['Medical'],
            tab: null,
            comments: [],
            FAQ: [],
            updates: [],
            mainImg: ""
        }
    },
    mounted() {
        this.currenturl = window.location.origin + this.$router.currentRoute.fullPath;
        fetch('http://localhost:3000/api/campaign/getCampaign?id=' + this.id)
            .then(async (response) => {
                const resdata = await response.json()

                this.campaign = resdata.data

                this.massage = resdata.data

            })
            .catch(err => console.log(err.message));

        fetch('http://localhost:3000/api/campaign/getCampaignDetails?id=' + this.id)
            .then(async (response) => {
                const resdata = await response.json()

                //  console.log(resdata.data);

                if (resdata.data[0] != null) {
                    this.comments = resdata.data[0];
                    //     console.log(this.comments);
                }
                if (resdata.data[1] != null) {
                    this.FAQ = resdata.data[1];
                    //    console.log(this.FAQ);
                }
                if (resdata.data[2] != null) {
                    this.updates = resdata.data[2];
                    //    console.log(this.updates);
                }
            })
            .catch(err => console.log(err.message));
    },
    methods: {
        makeDonation() {
            this.$router.push({
                name: 'Donate',
                params: { id: this.id }
            });
        },
        copyText() {
            navigator.clipboard.writeText(this.currenturl);
        }
    },
    computed: {
        calccampaignProgress() {
            return this.prgoessVal = (this.campaign.raiedAmount / this.campaign.goalAmount) * 100;
        }

    }
}
</script>


<style scoped>
.main-title {
    padding-top: 100px;
    padding-bottom: 60px;
    font-size: 40px;
    font-weight: bold;
    margin-left: 28%;
}

.Title {
    color: #4caf50;
    font-size: xx-large;

}

.noOfDonations {
    color: #656969;
    font-size: xx-large;
    margin-left: 30px;
}

.noOfDonationstxt {
    color: #656969;
    font-size: medium;
    margin-left: 30px;
}
</style>