<template>
    <v-container>
        <v-row>
            <v-col style="margin-left: 200px;">
                <v-img
                    src="https://images.gofundme.com/w6N_kKBEEcPGC9bK384LWJ1mYQ8=/720x405/https://d2g8igdw686xgo.cloudfront.net/66573895_165758986972661_r.jpeg">
                </v-img>
            </v-col>
            <v-col>
                <v-card style="margin-left: 10px">
                <v-row>
                    <v-col cols="md-3" class="d-flex justify-center" style="padding-right: 0px;">
<div class="Title">{{raiedAmount}} </div>
                    </v-col>
                    <v-col>
<div style="margin-top: 12px; margin-left:0px"> RS raised of {{goalAmount}} Rs Goal</div>
                    </v-col>
                </v-row>
                     
                    <br />

                    <div class="noOfDonations">{{ noOfDonations }}</div> 
                    <div class="noOfDonationstxt">donations</div>

                    <v-row>
                        <v-col>
                            <v-btn style="margin-left: 30px; margin-top: 30px" x-large color="success" dark
                                width="400px">Donate</v-btn>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col>
                            <v-btn outlined style="margin-left: 30px; margin-top: 10px" x-large>
                                <v-icon style="margin-right: 10px;">mdi-heart</v-icon> Watchlist
                            </v-btn>
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
                            <v-card-text>Story</v-card-text>

                            <div v-html="longDesc"></div>
                            <!--  {{massage.campaignDescription}}-->

                        </v-card>
                    </v-tab-item>
                    <v-tab-item :key="2" value="FAQ">
                        <v-card flat>

<v-expansion-panels
      multiple style="margin-top: 20px;"
    >
      <v-expansion-panel v-for="faqitem in FAQ" :key="faqitem.id">
        <v-expansion-panel-header>{{faqitem.quesqtion}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          {{faqitem.answer}}
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
            <v-col cols="1"></v-col>
        </v-row>






    </v-container>


</template>

<script>
export default {
    props: ['massage'],
    data() {
        return {
            noOfDonations: 1095,
            raiedAmount: 0,
            goalAmount: 0,
            organizerName: "Pavithra Jayasundara",
            campaignDate: "2022-07-22",
            tags: ['Medical'],
            tab: null,
            longDesc: "",
            comments: [],
            FAQ: [],
            updates: [],
        }
    },
    mounted() {
        this.longDesc = this.massage.campaignDescription;
        this.goalAmount = this.massage.goalAmount;
        this.raiedAmount = this.massage.raiedAmount;
        console.log(this.massage);

        fetch('http://localhost:3000/api/campaign/getCampaignDetails?id=3UZrpPnS9yWETw2eUmzz')
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
    }
}
</script>

<style scoped>
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