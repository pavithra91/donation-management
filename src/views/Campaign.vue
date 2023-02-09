<template>
  <v-container>
    <v-row>
      <v-col md="10" lg="8" offset-md="1" offset-lg="2">
        <v-alert prominent type="success"
          v-if="(role == 'Administrator' || role == 'Staff') && campaign.campaignStatus == 'Request'">
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

                  <v-btn color="error" v-bind="attrs" v-on="on"> Reject</v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Comment
                  </v-card-title>

                  <v-card-text>
                    <v-row class="my-5">
                      <v-col>
                        <v-textarea counter outlined v-model="comment" :rules="commentRules" name="input-7-1"
                          label="Comment" value="" hint="Approve or Reject Comment">
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

        <v-row>
          <v-col>
            <label v-if="campaign" class="text-h3 font-weight-bold">{{
                campaign.campaignName
            }}</label>
            <label v-else class="text-h3">Campaign Title</label>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6">
            <v-img :src="campaign.mainImg" width="100%" height="30rem" contain v-if="campaign">
            </v-img>
          </v-col>

          <v-col md="6">
            <v-card class="pa-3">
              <v-card-text>
                <v-row>
                  <v-col md="8">
                    <label class="Title" v-if="campaign">{{
                        campaign.raiedAmount
                    }}</label>
                    <label class="ml-2 font-weight-bold text-h6">(LKR) RAISED
                    </label>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="8">
                    <label v-if="campaign" class="font-weight-bold text-h3 d-block">{{ campaign.noOfDonations }}</label>
                    <label class="font-weight-bold text-h6 d-block">DONORS</label>
                    <v-chip class="ma-2" color="teal" text-color="white">
                      <v-avatar left>
                        <v-icon> mdi-shield-check</v-icon>
                      </v-avatar>
                      Verified Campaign
                    </v-chip>
                    <v-chip v-if="displayBadge" class="ma-2" color="red" text-color="white" >
                      <v-avatar left>
                        <v-icon> mdi-shield-check</v-icon>
                      </v-avatar>
                      {{goalRechedText}}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="8" class="mx-2">
                    <v-dialog v-model="reportDialog" width="500">
                  <template v-slot:activator="{ on, attr }">

                    <v-chip color="red" text-color="white" v-bind="attr" v-on="on">
                      <v-avatar left>
                        <v-icon> mdi-alert-octagon</v-icon>
                      </v-avatar>
                      Report Campaign
                    </v-chip>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Report Campaign
                    </v-card-title>
                    <v-card-text class="my-5">
                      <v-select :items="reportReasons" v-model="reportingReason" outlined dense label="Reporting Reason" :rules="reportingRules">
              </v-select>
                      <v-textarea v-model="reportingComment" outlined label="Comment">
                      </v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="reportDialog = false">
                        Back
                      </v-btn>
                      <v-btn color="primary" text @click="reportCampaign">
                        Report
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>


                  </v-col>
                </v-row>
                <v-row>
                  <v-col md="9" class="pa-3">
                    <v-progress-linear :value="calccampaignProgress" height="8" color="#09cc7f">
                    </v-progress-linear>
                    <label class="font-weight-bold text-h6">Goal: </label>
                    <label class="text-h6" v-if="campaign">LKR {{ campaign.goalAmount.toLocaleString() }}</label>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="6" lg="6">
                    <v-btn v-if="goalReched" x-large color="grey"  disabled width="410px">Donate
                    </v-btn>
                    <v-btn v-else x-large color="success" dark width="410px" @click="makeDonation">Donate
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col md="6" lg="6">
                    <v-btn outlined x-large @click="addToWatchlist(!alreadyInWatchlist)">
                      <v-icon v-if="alreadyInWatchlist" style="margin-right: 10px" color="red">mdi-heart</v-icon>
                      <v-icon v-else style="margin-right: 10px" color="grey">mdi-heart</v-icon>
                      Watchlist
                    </v-btn>
                  </v-col>

                  <v-col md="6" lg="6">
                    <v-dialog v-model="dialog" width="550">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-bind="attrs" v-on="on" x-large>
                          <v-icon style="margin-right: 10px">mdi-share</v-icon>
                          Share
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5">
                          <div style="margin: 10px">Help by sharing</div>
                        </v-card-title>

                        <v-card-text style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
                          Fundraisers shared on social networks raise up to 5x
                          more.
                        </v-card-text>

                        <v-divider style="margin-left: 20px; margin-right: 20px"></v-divider>

                        <v-card-text style="margin: 10px">
                          <v-row>
                            <v-col>
                              <ShareNetwork network="facebook" url="http://localhost:8080/Campaign/xtM2nVtWxsE1Zj6mx0uC"
                                :title="campaign.campaignName" description="" quote="" hashtags="Donaate,Charity">
                                <i class="fab fah fa-lg fa-facebook-f"></i>
                                <span style="margin-left: 5px">Facebook</span>
                              </ShareNetwork>
                            </v-col>
                            <v-col>
                              <ShareNetwork network="twitter" url="http://localhost:8080/Campaign/xtM2nVtWxsE1Zj6mx0uC"
                                :title="campaign.campaignName"
                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                hashtags="Donaate,Charity">
                                <i class="fab fah fa-lg fa-twitter"></i>
                                <span style="margin-left: 5px">Twitter</span>
                              </ShareNetwork>
                            </v-col>
                            <v-col>
                              <ShareNetwork network="email" url="http://localhost:8080/Campaign/xtM2nVtWxsE1Zj6mx0uC"
                                :title="campaign.campaignName"
                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                hashtags="Donaate,Charity">
                                <i class="fab fah fa-lg fa-envelope"></i>
                                <span style="margin-left: 5px">Email</span>
                              </ShareNetwork>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col>
                              <ShareNetwork network="whatsapp" url="http://localhost:8080/Campaign/xtM2nVtWxsE1Zj6mx0uC"
                                :title="campaign.campaignName"
                                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                                quote="The hot reload is so fast it\'s near instant. - Evan You"
                                hashtags="Donaate,Charity">
                                <i class="fab fah fa-lg fa-whatsapp"></i>
                                <span style="margin-left: 5px">Whatsapp</span>
                              </ShareNetwork>
                            </v-col>
                            <v-col> </v-col>
                            <v-col> </v-col>
                          </v-row>
                        </v-card-text>

                        <v-divider style="margin-left: 20px; margin-right: 20px"></v-divider>

                        <v-row>
                          <v-col style="margin-left: 30px; margin-right: 10px; margin-top: 30px;">
                            <v-text-field v-model="currenturl" outlined label="Copy link" :value="currenturl">
                            </v-text-field>
                          </v-col>
                          <v-col cols="2" style="margin-right: 30px; margin-top: 40px">
                            <v-btn color="success" @click="copyText">Copy</v-btn>
                          </v-col>
                        </v-row>

                        <v-divider style="margin-left: 20px; margin-right: 20px"></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog = false" style="margin-top: 10px">
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
              <v-tab href="#Story"> Story </v-tab>
              <v-tab href="#FAQ"> FAQ </v-tab>
              <v-tab href="#Updates"> Updates </v-tab>
              <v-tab href="#Comments"> Comments </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item :key="1" value="Story">
                <v-card flat>
                  <v-card-text></v-card-text>

                  <v-row v-if="createdby == campaign.createdBy">
                    <v-col md="8"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-dialog v-model="editCampaignStoryDialog" width="850">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" class="float-right" x-small fab outlined color="teal">
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5">
                            <div style="margin: 10px">Edit Campaign Story</div>
                          </v-card-title>

                          <v-divider style="margin-left: 20px; margin-right: 20px">
                          </v-divider>

                          <v-card-text style="margin: 10px">
                            <v-row>
                              <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded"
                                v-model="campaign.campaignDescription">
                              </vue-editor>
                            </v-row>
                          </v-card-text>

                          <v-divider style="margin-left: 20px; margin-right: 20px">
                          </v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="updateStory" style="margin-top: 10px">
                              Save
                            </v-btn>
                            <v-btn color="primary" text @click="editCampaignStoryDialog = false"
                              style="margin-top: 10px">
                              Close
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>

                  <div class="pa-1" v-html="campaign.campaignDescription"></div>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="2" value="FAQ">
                <v-card flat>
                  <v-expansion-panels multiple style="margin-top: 20px">
                    <v-expansion-panel v-for="faqitem in FAQ" :key="faqitem.id">
                      <v-expansion-panel-header>{{
                          faqitem.quesqtion
                      }}</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        {{ faqitem.answer }}
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-divider class="my-5"></v-divider>
                  <v-row v-if="createdby == campaign.createdBy">
                    <v-col>
                      <v-card-text>
                        <v-row>
                          <v-row>
                            <v-col cols="12" style="margin: 0; padding: 10px">
                              <v-text-field v-model="question" :rules="questionRules" label="Question" required dense
                                outlined></v-text-field>
                            </v-col>
                            <v-col cols="12" style="margin: 0; padding: 10px">
                              <v-textarea dense outlined name="input-7-4" label="Answer" value=""></v-textarea>
                            </v-col>
                          </v-row>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="8"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-btn text class="success" @click="postUpdate">
                        Post Update
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="3" value="Updates">
                <v-card flat>
                  <v-card-text>
                    <v-card flat style="margin-top: 20px" v-if="comments">
                      <div v-for="item in updates" :key="item.id">
                        <v-row>
                          <v-col cols="2">
                            <div v-if="updates">
                              <v-img :src="item.profileImg" width="50" height="50">
                              </v-img>
                            </div>
                          </v-col>
                          <v-col>
                            <div class="pa-1" v-html="item.update"></div>
                          </v-col>
                        </v-row>

                        <v-divider class="my-5"></v-divider>
                      </div>
                    </v-card>
                  </v-card-text>

                  <v-row v-if="createdby == campaign.createdBy">
                    <v-col>
                      <v-card-text style="margin: 5px">
                        <v-row>
                          <v-col>
                            <vue-editor id="UpdateEditor" useCustomImageHandler @image-added="handleImageAdded"
                              v-model="NewUpdate">
                            </vue-editor>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="8"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col>
                      <v-btn text class="success" @click="postUpdate">
                        Post Update
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item :key="4" value="Comments">
                <v-card flat style="margin-top: 20px" v-if="comments">
                  <div v-for="comment in comments" :key="comment.id">
                    <v-row>
                      <v-col cols="2">
                        <div v-if="comments">
                          <v-img :src="comment.profileImg" width="50" height="50">
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

                <div class="my-5">
                  <v-row>
                    <v-col md="10">
                      <emoji-picker @emoji:picked="handleEmojiPicked" :data="data"
                        class="textarea-emoji-picker mx-0 my-13" />

                      <v-textarea v-model="commentbox" outlined name="input-7-4" label="Comment">
                      </v-textarea>
                    </v-col>
                    <v-col md="2">
                      <v-btn text class="success" @click="postComment">
                        Post
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>

          <v-col md="5" lg="4" class="my-4">
            <v-card>
              <v-row>
                <v-col offset-xl="1" md="5" lg="3" v-if="organizer">
                  <v-img :src="organizer.profileImg" width="100" height="100"></v-img>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col md="10">
                      <label v-if="organizer">
                        <router-link :to="{ path: '/Profile/' + organizerId }">
                          {{ organizer.firstName }}
                          {{ organizer.lastName }}</router-link>
                      </label>
                    </v-col>
                    <v-col>
                      <v-dialog v-model="dialogs" width="500">
                        <template v-slot:activator="{ on, attr }">
                          <v-icon>fa-solid fa-envelope</v-icon>
                          <v-btn text v-bind="attr" v-on="on"> Contact </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5 grey lighten-2" v-if="organizer">
                            Contact {{ organizer.firstName }}
                            {{ organizer.lastName }}
                          </v-card-title>

                          <v-card-text>
                            <v-textarea class="pa-3 my-5" outlined label="Message">
                            </v-textarea>
                          </v-card-text>

                          <v-divider></v-divider>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="sendEmail">
                              Send
                            </v-btn>
                            <v-btn color="primary" text @click="dialogs = false">
                              Cancel
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>

            <v-card style="margin-top: 8%;">
              <v-card-title>
                Supporting Documents
              </v-card-title>
              <LightGallery :images="images" :index="index" :disable-scroll="true" @close="index = null" />

              <v-row>
                <v-col cols="4" v-for="(thumb, thumbIndex) in images" :key="thumbIndex" @click="index = thumbIndex">
                  <v-list-item>
                    <v-list-item-content>
                      <img :src="thumb" width="100" height="100">
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import data from "@zaichaopan/emoji-picker/data/emojis.json";
import { LightGallery } from 'vue-light-gallery';
import { VueEditor } from "vue2-editor";
export default {
  name: "About",
  components: {
    VueEditor,
    LightGallery,
  },
  props: ["id"],
  data() {
    return {
      goalReched: false,
      goalRechedText: "",
      displayBadge: false,
      userId: "",
      commentbox: "",
      data: data,
      organizer: null,
      currenturl: "test",
      dialog: false,
      editCampaignStoryDialog: false,
      dialogs: false,
      rejectDialog: false,
      reportDialog: false,
      campaign: null,
      prgoessVal: 0,
      organizerId: "",
      campaignDate: "2022-07-22",
      reportingComment: '',
      reportingReason: "",
      reportReasons: ['Scam', 'Provide False Information'],
      reportingRules: [(v) => !!v || "Please select Reporting Reason"],
      tags: ["Medical"],
      tab: null,
      comments: [],
      FAQ: [],
      updates: [],
      mainImg: "../assets/img/main/noImg.jpg",
      role: "",
      comment: "",
      commentRules: [(v) => !!v || "Comment Required"],
      raiedAmount: 0,
      profileImg: "",
      longDescription: "",
      createdby: "",
      NewUpdate: "",
      question: "",
      questionRules: [(v) => !!v || "Question is required"],
      alreadyInWatchlist: false,
      images: [],
      index: null,
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {

      this.role = this.$session.get("role");
      this.createdby = this.$session.get("user_token");
      this.currenturl =
        window.location.origin + this.$router.currentRoute.fullPath;
      fetch(process.env.VUE_APP_API_URL + "/campaign/getCampaign?id=" + this.id)
        .then(async (response) => {
          const resdata = await response.json();
          debugger;
          this.campaign = resdata.data;
          this.longDescription = resdata.data.campaignDescription;
          this.images = resdata.data.documentList;

          debugger;
          if (this.campaign.raiedAmount >= this.campaign.goalAmount) {
            this.goalReched = true;
            if(this.campaign.goalType == "Fixed Goal"){
              this.goalRechedText = "Goal Reched";
              this.displayBadge = true;
            }
            else
            {
              this.displayBadge = true;
              this.goalRechedText = "Goal Reach but Keep Donating";
              this.goalReched = false;
            }
          }
          else {
            this.displayBadge = false;
            this.goalReched = false;
          }

          this.organizerId = resdata.data.createdBy;
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

          fetch(process.env.VUE_APP_API_URL + "/user/getUser", requestOptions)
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
        .catch((err) => console.log(err.message));

      fetch(
        process.env.VUE_APP_API_URL + "/campaign/getCampaignDetails?id=" + this.id
      )
        .then(async (response) => {
          const resdata = await response.json();

          //  console.log(resdata.data);

          if (resdata.data[0] != null) {
            this.comments = resdata.data[0];
            //console.log(this.comments);
          }
          if (resdata.data[1] != null) {
            this.FAQ = resdata.data[1];
            //    console.log(this.FAQ);
          }
          if (resdata.data[2] != null) {
            this.updates = resdata.data[2];
            //console.log(this.updates);
          }
        })
        .catch((err) => console.log(err.message));

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: this.id,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/campaign/getWatchlist", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          resdata.data.forEach((element) => {
            if (this.campaign.id == element.id) {
              this.alreadyInWatchlist = true;
            }
          });
        })
        .catch((err) => console.log(err.message));
    },
    makeDonation() {
      this.$router.push({
        name: "Donate",
        params: { id: this.id, campaign: this.campaign },
      });
    },
    addToWatchlist(alreadyInWatchlist) {
      debugger;
      let metohd = "";
      if (alreadyInWatchlist) {
        metohd = "addToWatchlist";
      } else {
        metohd = "removeFromWatchlist";
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: this.campaign.id,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/campaign/" + metohd, requestOptions)
        .then(async (response) => {
          const resdata = await response.json();
          this.campaign = resdata.data;

          window.location.reload();
        })
        .catch((err) => console.log(err.message));
    },
    copyText() {
      navigator.clipboard.writeText(this.currenturl);
    },
    approveCampaign(e) {
      this.userId = "";

      if (!this.$session.exists()) {
        this.$router.push("/SignIn");
      } else {
        this.userId = this.$session.get("user_token");
      }
      var status = "";
      if (e == 1) {
        status = "Approved";
      } else {
        status = "Rejected";
      }

      // console.log(this.userId);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        userId: this.userId,
        id: this.id,
        reqStatus: status,
        reqComment: this.comment,
        creator: this.campaign.createdBy,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/campaign/UpdateCampaignStatus",
        requestOptions
      )
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            console.log("Error");
          }

          this.rejectDialog = false;
          window.location.reload();
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    handleEmojiPicked(emoji) {
      // alert("test");
      this.commentbox += emoji;
    },
    postComment() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let profileImg = this.$session.get("profileImg");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: this.id,
        comment: this.commentbox,
        profileImg: profileImg,
        name: this.$session.get("fullname"),
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/misc/postComment", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            console.log("Error");
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });

      window.location.reload();
    },

    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
    },
    updateStory() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        campaignId: this.id,
        update: this.campaign.campaignDescription,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/misc/updateCampaignStory", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            console.log("Error");
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });

      window.location.reload();
    },
    postUpdate() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let profileImg = this.$session.get("profileImg");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: this.id,
        update: this.NewUpdate,
        profileImg: profileImg,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/misc/postCampaignUpdate", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            console.log("Error");
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });

      window.location.reload();
    },
    sendEmail() {

    },
    reportCampaign(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.$session.get("user_token"),
        campaignId: this.id,
        reportingReason: this.reportingReason,
        reportingComment: this.reportingComment,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/campaign/reportCampaign", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            console.log("Error");
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    }
  },
  computed: {
    calccampaignProgress() {
      return (this.prgoessVal =
        (this.campaign.raiedAmount / this.campaign.goalAmount) * 100);
    },
    calculateGoalReached() {
      if (this.campaign.raiedAmount >= this.campaign.goalAmount) {
        return true;
      }
      else {
        return false;
      }
    }
  },
};
</script>

<style scoped>
.test {
  padding: 50px;
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 5%;
}

.main-title {
  font-size: 50px;
  font-weight: bold;
}

.Title {
  color: #4caf50;
  font-size: 50px;
}

.textarea-emoji-picker {
  position: absolute;
  inset-inline-end: 20%;
  inset-block-end: 0;
  z-index: 1;
}

[contenteditable="true"]:empty:before {
  content: attr(placeholder);
  color: grey;
}
</style>