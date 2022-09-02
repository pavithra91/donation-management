<template>
    <v-container>
        <v-row>
            <v-col md="10" lg="8" offset-md="1" offset-lg="2">
                <v-alert prominent type="success"
                    v-if="(role == 'Admin' || role == 'Staff') && (campaign.campaignStatus == 'Request')">
                    <v-row>
                        <v-col class="grow my-4">
                            Approve campaign for {{ campaign.campaignName }}
                        </v-col>
                        <v-col class="shrink d-flex justify-center align-center">
                            <v-dialog v-model="rejectDialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-col>
                                        <v-btn color="teal" v-bind="attrs" v-on="on">Approve</v-btn>
                                    </v-col>

                                    <v-btn color="error" v-bind="attrs" v-on="on">
                                        Reject</v-btn>
                                </template>

                                <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                        Comment
                                    </v-card-title>

                                    <v-card-text>
                                        <v-row class="my-5">
                                            <v-col>
                                                <v-textarea counter outlined v-model="comment" :rules="commentRules"
                                                    name="input-7-1" label="Comment" value=""
                                                    hint="Approve or Reject Comment">
                                                </v-textarea>
                                            </v-col>
                                        </v-row>

                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>

                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="approveCampaign(1)">
                                            Approve
                                        </v-btn>
                                        <v-btn color="primary" text @click="approveCampaign(2)">
                                            Reject
                                        </v-btn>
                                        <v-btn color="primary" text @click="rejectDialog = false">
                                            Cancel
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </v-col>
                    </v-row>
                </v-alert>

                <v-row v-else>
                    <v-col></v-col>
                </v-row>

                <v-alert prominent type="success" v-if="role == 'Campaign Manager'">
                    <v-row>
                        <v-col class="grow my-4">
                            Edit campaign for {{ campaign.campaignName }}.
                        </v-col>
                        <v-col class="shrink d-flex justify-center align-center">
                            <v-col>
                                <v-btn color="teal">Edit</v-btn>
                            </v-col>
                            <v-col>
                                <v-btn color="error">Cancel</v-btn>
                            </v-col>
                        </v-col>
                    </v-row>
                </v-alert>

                <v-row v-else>
                    <v-col></v-col>
                </v-row>

                <v-row>
                    <v-col>
                        <label v-if="campaign" class="text-h3 font-weight-bold">{{ campaign.campaignName }}</label>
                        <label v-else class="text-h3">Campaign Title</label>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col md="6">
                        <v-img :src=campaign.mainImg width="100%" height="30rem" contain>
                        </v-img>
                    </v-col>

                    <v-col md="6">
                        <v-card class="pa-3">
                            <v-card-text>
                                <v-row>
                                    <v-col md="8">
                                        <label class="Title">{{ campaign.raiedAmount }}</label>
                                        <label class="ml-2 font-weight-bold text-h6">(LKR) RAISED </label>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col md="8">
                                        <label class="font-weight-bold text-h3 d-block">{{ noOfDonations }}</label>
                                        <label class="font-weight-bold text-h6 d-block">DONORS</label>
                                        <v-chip class="ma-2" color="teal" text-color="white">
                                            <v-avatar left>
                                                <v-icon> mdi-shield-check</v-icon>
                                            </v-avatar>
                                            Verified Campaign
                                        </v-chip>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="9" class="pa-3">
                                        <v-progress-linear :value="calccampaignProgress" height="8" color="#09cc7f">
                                        </v-progress-linear>
                                        <label class="font-weight-bold text-h6">Goal: </label>
                                        <label class="text-h6">LKR {{ campaign.goalAmount.toLocaleString() }}</label>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col md="6" lg="6">
                                        <v-btn x-large color="success" dark width="410px" @click="makeDonation">Donate
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col md="6" lg="6">
                                        <v-btn outlined x-large>
                                            <v-icon style="margin-right: 10px;">mdi-heart</v-icon> Watchlist
                                        </v-btn>
                                    </v-col>

                                    <v-col md="6" lg="6">
                                        <v-dialog v-model="dialog" width="550">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn outlined v-bind="attrs" v-on="on" x-large>
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
                                                            :value="currenturl">
                                                        </v-text-field>

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
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col md="7" lg="8">
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

                                    <div class="pa-1" v-html="campaign.campaignDescription"></div>

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

                    <v-col md="5" lg="4" class="my-4">
                        <v-card>
                            <v-row>
                                <v-col offset-xl="1" md="5" lg="3">
                                    <v-img :src=organizer.profileImg width="100" height="100"></v-img>
                                </v-col>
                                <v-col>
                                    <v-row>
                                        <v-col md="10">
                                            <label>
                                                <router-link :to="{ path: '/Search?category=' + '2' }"> {{
                                                        organizer.firstName
                                                }} {{
        organizer.lastName
}}</router-link>
                                            </label>
                                        </v-col>
                                        <v-col>
                                            <v-dialog v-model="dialogs" width="500">
                                                <template v-slot:activator="{ on, attr }">

                                                    <v-icon>fa-solid fa-envelope</v-icon>
                                                    <v-btn text v-bind="attr" v-on="on">
                                                        Contact
                                                    </v-btn>
                                                </template>

                                                <v-card>
                                                    <v-card-title class="text-h5 grey lighten-2">
                                                        Contact {{ organizer.firstName }} {{ organizer.lastName }}
                                                    </v-card-title>

                                                    <v-card-text>
                                                        <v-textarea class="pa-3 my-5" outlined label="Message">
                                                        </v-textarea>
                                                    </v-card-text>

                                                    <v-divider></v-divider>

                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="primary" text @click="dialogs = false">
                                                            Send
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'About',
    components: {
        //  CampaignTemp
    },
    props: ['id'],
    data() {
        return {
            organizer: null,
            currenturl: "test",
            dialog: false,
            dialogs: false,
            rejectDialog: false,
            campaign: null,
            noOfDonations: 1095,
            prgoessVal: 0,
            organizerId: "",
            campaignDate: "2022-07-22",
            tags: ['Medical'],
            tab: null,
            comments: [],
            FAQ: [],
            updates: [],
            mainImg: "../assets/img/main/noImg.jpg",
            role: "",
            comment: "",
            commentRules: [(v) => !!v || "Comment Required"],
        }
    },
    mounted() {
        this.role = localStorage.getItem("role");
        this.currenturl = window.location.origin + this.$router.currentRoute.fullPath;
        fetch('http://localhost:3000/api/campaign/getCampaign?id=' + this.id)
            .then(async (response) => {
                const resdata = await response.json()

                this.campaign = resdata.data

                this.organizerId = resdata.data.createdBy
                //console.log("Organizer Name " + this.organizerName)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    id: this.organizerId,
                });

                var requestOptions = {
                    method: "POST",
                    mode: "cors",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch("http://localhost:3000/api/user/getUser", requestOptions)
                    .then(async (response) => {
                        const resdata = await response.json();

                        // check for error response
                        if (!response.ok) {
                            console.log("Error");
                        }

                        //this.userData = resdata.data;
                        this.organizer = resdata.data;
                    })
                    .catch((error) => {
                        this.errorMessage = error;
                        console.error("There was an error!", error);
                    });

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
        },
        approveCampaign(e) {
            var userId = "";
            if (localStorage.getItem("user_name") == "undefined") {
                this.$router.push("/SignIn");
            } else if (localStorage.getItem("user_name") != "") {
                userId = localStorage.getItem("user_token");
            }
            var status = "";
            if (e == 1) {
                status = "Approved";
            }
            else {
                status = "Rejected";
            }

            console.log(userId);

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                userId: userId,
                id: this.id,
                reqStatus: status,
                reqComment: this.comment,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3000/api/campaign/UpdateCampaignStatus", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    // check for error response
                    if (!response.ok) {
                        console.log("Error");
                    }

                    this.rejectDialog = false;

                })
                .catch((error) => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
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
    font-size: 50px;
    font-weight: bold;
}

.Title {
    color: #4caf50;
    font-size: 50px;

}
</style>