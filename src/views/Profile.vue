<template>
  <v-container>
    <v-alert outlined type="success" text :value="alert">
      {{ alertMessage }}
    </v-alert>
    <v-row class="my-5">
      <v-col md="3">
        <v-img height="300" width="300" :src=imgSrc @click="$refs.fileInput.click()"></v-img>
        <input type="file" @change="onFileSelected" ref="fileInput" style="display: none;" />
      </v-col>
      <v-col md="9">
        <v-col><label class="text-h4">Pavithra Bhagya Jayasundara</label>
        </v-col>

        <v-col>
          <v-icon>fa-solid fa-location-dot</v-icon>
          <label class="pa-3">Location</label>
        </v-col>
        <v-col md="10">
          <label class="pa-3">{{ donationLevel }}</label>

          <v-col md="6">
            <v-progress-linear value="20" height="8" color="#09cc7f"></v-progress-linear>
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


          <v-col md="6">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attr }">

                <v-icon>fa-solid fa-envelope</v-icon>
                <v-btn text v-bind="attr" v-on="on">
                  Contact
                </v-btn>
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
            <!-- <v-btn class="float-right">Report User</v-btn>-->
          </v-col>



          <v-col md="12">
            <v-col md="6">
              <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab href="#Badges">
                  Badges
                </v-tab>
                <v-tab href="#Donations">
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
                <v-tab-item :key="1" value="Badges">
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

                <v-tab-item :key="2" value="Donations">
                  <v-row class="pa-8">
                    <v-col>
                      <label>Your Recent Donation Details are displyed here</label>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="d-block">
                      <v-card>
                        <v-card-title>Donation to SOS Village</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="d-block">
                      <v-card>
                        <v-card-title>Donation to SOS Village</v-card-title>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-tab-item>
                <v-tab-item :key="3" value="About">
                  <DonorEdit :profile="profile" :id="id"  @message="getResponse" />
                </v-tab-item>
              </v-tabs-items>
            </v-col>


          </v-col>
        </v-col>
      </v-col>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '@/firebase'
import DonorEdit from "@/components/layouts/DonorEdit.vue";

export default {
  name: "profile",
  components: {
    DonorEdit
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
     // id: id,
      role: "",
      accStatus: "",
      donationLevel: "",

      badges: [],

      minPoints: 1500,
      maxPoints: 2000,
      userPoints: 75,
      imgSrc: "https://flyclipart.com/thumb2/person-icon-165630.png"
    }
  },
  mounted() {
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

      fetch("http://localhost:3000/api/user/getUser", requestOptions)
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



    fetch('http://localhost:3000/api/user/getUserBadgeDetails?id=' + this.id)
      .then(async (response) => {
        const resdata = await response.json()
        this.badges = resdata.data

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
        console.log("Message coming");

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

        fetch("http://localhost:3000/api/misc/sendEmail", requestOptions)
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

            fetch("http://localhost:3000/api/user/updateUserProfileImage", requestOptions)
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
  }
};
</script>
