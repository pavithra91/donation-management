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
                    <v-card-title class="Title">5000 Rs</v-card-title>
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
                
                


<v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
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
                </v-card>
            </v-tab-item>
            <v-tab-item :key="2" value="FAQ">
                <v-card flat>
                    <v-card-text>FAQ</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="3" value="Updates">
                <v-card flat>
                    <v-card-text>Updates</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item :key="4" value="Comments">
                <v-card flat>
                    <v-card-text>Comments</v-card-text>
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
    data() {
        return {
            noOfDonations: 1095,
            organizerName: "Pavithra Jayasundara",
            campaignDate: "2022-07-22",
            tags: ['Medical'],
            tab: null,
      }
    },
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