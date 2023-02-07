<template>
  <v-container>
    <v-alert outlined type="success" text :value="alert">
      {{ alertMessage }}
    </v-alert>
    <v-row class="my-5">
      <v-col md="3">
        <v-img height="300" width="320" :src=imgSrc @click="$refs.fileInput.click()"></v-img>
        <input type="file" @change="onFileSelected" ref="fileInput" style="display: none;" />

        <v-col md="9" class="pa-0 my-8">
          <v-card>
            <v-row>
              <v-col cols="8">
                <v-card-title>Bio</v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-dialog v-model="dialogbox" width="800">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="my-3 mx-2" x-small fab outlined color="teal" v-if="accessLevel=='Edit'">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5">
                      <label>Edit Bio</label>
                    </v-card-title>

                    <v-card-text>

                      <v-form ref="form" v-model="valid" lazy-validation>

                        <v-divider></v-divider>
                        <v-row class="my-2">

                          <v-col>
                            <div class="text-center">
                              <v-textarea v-model="profile.bio" outlined counter label="Enteri Bio" :rules="bioRules">
                              </v-textarea>
                            </div>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                      </v-form>

                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="primary" text @click="dialogbox = false">
                        Close
                      </v-btn>
                      <v-btn color="primary" :disabled="!valid" text @click="updateBio">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>


                </v-dialog>

              </v-col>
            </v-row>


            <v-divider></v-divider>
            <v-card-subtitle>{{ profile.bio }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-col>

      <v-col md="9">
        <v-col><label class="text-h4">{{ profile.firstName }} {{ profile.lastName }}</label>
        </v-col>

        <v-col>
          <v-icon>fa-solid fa-location-dot</v-icon>
          <label class="pa-3">{{ profile.city }}</label>
        </v-col>
        <v-col md="10">
          <label class="pa-3">{{ donationLevel }}</label>

          <v-col md="6" v-if="role != 'Administrator'">
            <v-progress-linear :value="calccampaignProgress" height="8" color="#09cc7f"></v-progress-linear>
            <label>{{ minPoints }}</label>
            <label class="float-right">{{ maxPoints }} </label>
          </v-col>

          <v-col md="6">
            <v-chip color="red" text-color="white" v-if="role == 'Administrator'">
              {{ role }}
            </v-chip>
            <v-chip class="mx-3" color="primary" text-color="white" v-if="role == 'Campaign Manager'">
              <v-avatar left>
                <v-icon> mdi-shield-crown</v-icon>
              </v-avatar>{{ role }}
            </v-chip>

            <v-chip class="mx-3" color="green" text-color="white" v-if="accStatus == 'Verified'">
              <v-avatar left>
                <v-icon> mdi-shield-check</v-icon>
              </v-avatar> Account Status {{ accStatus }}
            </v-chip>

            <v-chip color="red" text-color="white" v-if="accStatus == 'Pending'">
              <v-avatar left>
                <v-icon> mdi-shield-alert</v-icon>
              </v-avatar> Account Status {{ accStatus }}
            </v-chip>

            <v-chip class="mx-3" color="green" text-color="white" v-if="role == 'Donor'">
              <v-avatar left>
                <v-icon> mdi-shield-account</v-icon>
              </v-avatar> {{ role }}
            </v-chip>
          </v-col>

          <v-col md="6" class="mx-4">
            <v-row>
              <v-col cols="4">
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attr }">

                    <v-chip color="#216dc2" text-color="white" v-bind="attr" v-on="on">
                      <v-avatar left>
                        <v-icon> mdi-email-plus-outline</v-icon>
                      </v-avatar> Contact
                    </v-chip>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Contact
                    </v-card-title>
                    <v-card-text class="my-5">
                      <v-text-field v-model="senderName" outlined label="Name">
                      </v-text-field>
                      <v-text-field v-model="senderEmail" outlined label="Email">
                      </v-text-field>
                      <v-textarea v-model="senderMessage" outlined label="Message">
                      </v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">
                        Back
                      </v-btn>
                      <v-btn color="primary" text @click="sendEmail">
                        Send
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col cols="6" class="mx-3">
                <v-dialog v-model="reportDialog" width="500">
                  <template v-slot:activator="{ on, attr }">

                    <v-chip color="red" text-color="white" v-if="role != 'Administrator'" v-bind="attr" v-on="on">
                      <v-avatar left>
                        <v-icon> mdi-alert</v-icon>
                      </v-avatar> Report Account
                    </v-chip>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Report Account
                    </v-card-title>
                    <v-card-text class="my-5">
                    <v-select :items="reasonItems" label="Reporting Reason" outlined dense :rules="reasonRules" v-model="reasonItem">
                    </v-select>
                      <v-textarea v-model="comment" outlined label="Comment">
                      </v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="reportDialog = false">
                        Close
                      </v-btn>
                      <v-btn color="primary" text @click="reportAccount">
                        Report
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>











              <!--  <v-chip color="red" text-color="white" v-if="role != 'Administrator'" @click="reportAccount">
                  <v-avatar left>
                    <v-icon> mdi-alert</v-icon>
                  </v-avatar> Report Account
                </v-chip>
                -->
              </v-col>
            </v-row>
          </v-col>


          <v-col md="12">
            <v-col md="6">
              <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab href="#Badges" v-if="role != 'Administrator'">
                  Badges
                </v-tab>
                <v-tab href="#Donations" v-if="role != 'Administrator'">
                  Donations
                </v-tab>
                <v-tab href="#About">
                  About
                </v-tab>
                <v-tabs-slider color="success"></v-tabs-slider>
              </v-tabs>
            </v-col>

            <v-col md="12">
              <v-tabs-items v-model="tab">
                <v-tab-item :key="1" value="Badges" v-if="role != 'Administrator'">
                  <v-card>
                    <v-row>
                      <v-col md="2" v-for="badge in badges" :key="badge.id">
                        <v-col>
                          <v-tooltip bottom color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <div class="pa-4">
                                <v-img class="pa-3" v-bind="attrs" v-on="on" height="80" width="80"
                                  :src="require(`../assets/img/badges/${badge.imageUrl}`)"></v-img>
                              </div>
                              <div class=" text-center font-weight-medium">
                                {{ badge.badgeName }}
                              </div>
                            </template>
                            <span>{{ badge.badgeDescription }}</span>
                          </v-tooltip>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-tab-item>

                <v-tab-item :key="2" value="Donations" v-if="role != 'Administrator'">
                  <v-row class="pa-8">
                    <v-col>
                      <label>Your Recent Donation Details are displyed here</label>
                    </v-col>
                  </v-row>

                  <v-row v-for="campaign in campaigns" :key="campaign.id">
                    <v-col class="d-block">
                      <v-card>
                        <v-card-title @click="goToCampaign(campaign.id)">{{ campaign.campaignName }}</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-tab-item>
                <v-tab-item :key="3" value="About">
                  <DonorEdit :profile="profile" :id="id" @message="getResponse" />
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-col>
        </v-col>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
    <v-row>

    </v-row>

    <v-row>
      <Chat iconColorProp="#e6e6e6" messageOutColorProp="#4d9e93" messageInColorProp="#f1f0f0"
        messageBackgroundColorProp="#ffffff" :messageListProp="messageList" :initOpenProp="initOpen"
        @onToggleOpen="handleToggleOpen" @onMessageWasSent="handleMessageReceived" />
    </v-row>
  </v-container>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '@/firebase'
import DonorEdit from "@/components/layouts/DonorEdit.vue";
import { Chat } from 'vue-chat-widget'

export default {
  name: "profile",
  components: {
    DonorEdit,
    Chat,
  },
  props: ['id'],
  data() {
    return {
      profile: null,
      alert: false,
      alertMessage: "",
      tab: null,
      senderName: "",
      senderEmail: "",
      senderMessage: "",
      valid: true,
      dialog: false,
      reportDialog: false,
      dialogbox: false,
      role: "",
      accStatus: "",
      donationLevel: "",
      badges: [],
      campaigns: [],
      minPoints: 0,
      maxPoints: 0,
      userPoints: 75,
      imgSrc: "https://flyclipart.com/thumb2/person-icon-165630.png",
      bioRules: [v => v.length <= 500 || 'Max 500 characters'],
      msg: "",
      messageList: [],
      initOpen: false,
      toggledOpen: false,
      reasonItems: ['Scammer', 'Publish false information', 'Hate Speech'],
      resonRules: [(v) => !!v || "Please select Reporting Reason"],
      reasonItem: ""
    }
  },
  mounted() {
    let loginId = this.$session.get('user_token');

    if (loginId == this.id) {
      this.accessLevel = "Edit"
    }
    else {
      this.accessLevel = "View"
    }

    this.messageList.push({ body: 'Welcome to the chat, I\'m David!', author: 'them' })


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: this.id,
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
          // get error message from body or default to response statusText
        }
        console.log(resdata.data.accStatus);
        this.role = resdata.data.role;
        this.accStatus = resdata.data.accStatus;
        this.donationLevel = resdata.data.donationLevel;
        this.imgSrc = resdata.data.profileImg;

        this.profile = resdata.data;
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });



    fetch(process.env.VUE_APP_API_URL + '/user/getUserBadgeDetails?id=' + this.id)
      .then(async (response) => {
        const resdata = await response.json()
        this.badges = resdata.data[0];
        this.campaigns = resdata.data[1];
        this.minPoints = resdata.data[2][0].minPoints;
        this.maxPoints = resdata.data[2][0].maxPoints;
        console.log(resdata.data[2]);

      })
      .catch(err => console.log(err.message))

  },

  methods: {
    getResponse(value) {
      this.alert = true;
      this.alertMessage = value;
      setTimeout(() => {
        this.alert = false
      }, 4000)
    },
    sendEmail() {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          id: this.id,
          senderSubject: 'You have Email from : ' + this.senderName,
          senderName: this.senderName,
          senderEmail: this.senderEmail,
          senderMessage: this.senderMessage,
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.VUE_APP_API_URL + "/misc/sendEmail", requestOptions)
          .then(async (response) => {
            const resdata = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response statusText
            }
            console.log("Email Send");

            this.dialog = false;

            this.alertMessage = "Email has Send to User";
            setTimeout(() => {
              this.alert = false
            }, 4000)
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
      } catch (error) {
        console.log({ error })
      }
      // Reset form field
      this.senderName = ''
      this.senderEmail = ''
      this.senderMessage = ''

    },

    onFileSelected(event) {

      this.selectedFile = event.target.files[0];
      const storage2 = getStorage();

      console.log(this.selectedFile);

      const storageRef = ref(storage2, 'ProfileImg/' + this.id);
      const metadata = {
        contentType: 'image/jpeg'
      };

      uploadBytes(storageRef, this.selectedFile, metadata).then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            this.imgSrc = url;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              id: this.id,
              imgPath: url
            });

            var requestOptions = {
              method: "POST",
              mode: "cors",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(process.env.VUE_APP_API_URL + "/user/updateUserProfileImage", requestOptions)
              .then(async (response) => {
                const resdata = await response.json();

                // check for error response
                if (!response.ok) {
                  // get error message from body or default to response statusText
                }
              });

          });
      });
    },
    // Send message from you
    handleMessageReceived(message) {
      this.messageList.push(message)

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.id,
        msg: message,
        sender: "you",
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/misc/sendChatMessage", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    // Chat toggled open event emitted
    handleToggleOpen(close) {

      if (this.toggledOpen.name == "open") {
        this.toggledOpen = close;
        this.toggledOpen = false;
        this.messageList = [];
        return;
      }
      else {
        this.toggledOpen = open
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.id,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/misc/getUserChat", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
          }
          console.log(resdata.data);

          resdata.data.forEach(element => {
            if (element.sender == "you") {
              this.messageList.push({ body: element.msg.body, author: 'you' })
            }
            else {
              this.messageList.push({ body: element.msg.body, author: 'them' })
            }
          });

        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    updateBio() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.id,
        bio: this.profile.bio,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/user/updateBio", requestOptions)
        .then(async (response) => {

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
          }

          this.dialogbox = false
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    goToCampaign(id) {
      this.$router.push("/Campaign/" + id);
    },
    reportAccount() {
      console.log("test");
    }
  },
  computed: {
    calccampaignProgress() {
      return this.prgoessVal = (this.profile.donationPoints / this.maxPoints) * 100;
    },
  },
};
</script>
