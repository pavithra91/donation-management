<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title">User Profile</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container class="lighten-5 mb-6">
          <v-row>
            <v-col></v-col>
            <v-col>
              <div class="profileImage: text-center">
                <v-img class="pa-7 secondary rounded-circle d-inline-block" height="200" width="200" :src=imgSrc
                  @click="$refs.fileInput.click()"></v-img>
              </div>

              <input type="file" @change="onFileSelected" ref="fileInput" style="display: none;">
            </v-col>
            <v-col> </v-col>
          </v-row>

          <v-row>
            <v-col> </v-col>
            <v-col>
              <div>
                <v-row>
                  <v-col>{{ minPoints }} </v-col>
                  <v-col></v-col>
                  <v-col>
                    <div class="text-right">{{ maxPoints }}
                    </div>
                  </v-col>
                </v-row>
                <v-progress-linear value="75" height="8" color="#09cc7f"></v-progress-linear>
              </div>
              <br />
              <div class="text-center font-weight-medium">
                {{ donationLevel }}
              </div>
            </v-col>
            <v-col> </v-col>
          </v-row>


          <v-row>
            <v-col> </v-col>
            <v-col>
              <div class="text-center">
                <v-chip class="ma-2" color="red" text-color="white" v-if="role == 'Administrator'">
                  {{ role }}
                </v-chip>
                <v-chip class="ma-2" color="primary" text-color="white" v-if="role == 'Campaign Manager'">
                  {{ role }}
                </v-chip>

                <v-chip class="ma-2" color="green" text-color="white" v-if="accStatus == 'Verified'">
                  Account Status {{ accStatus }}
                </v-chip>

                <v-chip class="ma-2" color="red" text-color="white" v-if="accStatus == 'Pending'">
                  Account Status {{ accStatus }}
                </v-chip>

                <v-chip class="ma-2" color="green" text-color="white" v-if="role == 'Donor'">
                  {{ role }}
                </v-chip>

                <v-chip class="ma-2" color="primary" outlined pill @click="editAccount()">
                  Edit Profile
                  <v-icon right>
                    mdi-account-outline
                  </v-icon>
                </v-chip>
              </div>
            </v-col>
            <v-col> </v-col>
          </v-row>



          <v-row>
            <v-col> </v-col>
            <v-col>
              <div class="text-center">
                <v-card>
                  <v-card-title>Badges</v-card-title>

                  <v-row>
                    <v-col v-for="badge in badges" :key="badge.id" cols="3">
                      <v-img height="80" width="80" :src="require(`../assets/img/badges/${badge.imageUrl}`)"></v-img>
                      <div class="text-left font-weight-medium" style="padding-left: 15px;">
                        {{ badge.badgeName }}
                      </div>
                    </v-col>
                  </v-row>

                </v-card>

              </div>
            </v-col>
            <v-col> </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>


<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '@/firebase'

export default {
  data() {
    let id = localStorage.getItem("user_token")
    return {
      valid: true,
      id:id,
      firstName: "",
      firstNameRules: [v => !!v || 'First Name required'],
      lastName: "",
      lastNameRules: [v => !!v || 'Last Name required'],
      email: "",
      address: "",
      nic: "",
      phone: "",
      phoneNameRules: [v => !!v || 'First Name required'],
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
    if (localStorage.getItem("user_name") == "undefined") {
      this.$router.push("/SignIn");
    } else if (localStorage.getItem("user_name") != "") {
      let id = localStorage.getItem("user_token");

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: id,
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
          //this.userData = resdata.data;
          this.firstName = resdata.data.firstName;
          this.lastName = resdata.data.lastName;
          this.email = resdata.data.email;
          this.nic = resdata.data.nic;
          this.address = resdata.data.address;
          this.phone = resdata.data.phone;
          this.role = resdata.data.role;
          this.accStatus = resdata.data.accStatus;
          this.donationLevel = resdata.data.donationLevel;
          this.imgSrc = resdata.data.profileImg;
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    } else {
      this.$router.push("/EditProfile");
    }


    fetch('http://localhost:3000/api/user/getUserBadgeDetails?id=lqblyRwIeylJjL6V8Chj')
      .then(async (response) => {
        const resdata = await response.json()
        this.badges = resdata.data

      })
      .catch(err => console.log(err.message))

  },

  methods: {

    editAccount() {
      this.$router.push("/EditProfile");
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



<style scoped>
.main-container {
  background: #fbf8f6;
}

.main-container {
  margin-top: 80px;
  background: #ffffff;
}

.main-title {
  margin-left: 44%;
  margin-top: 20px;
  color: #072366;
  font-size: 40px;
  font-weight: bold;
}

.profileImage {
  margin-left: 25%;
}
</style>