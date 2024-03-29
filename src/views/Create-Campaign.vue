<template>
  <v-container>
    <v-row>
      <v-col md="10" lg="8" offset-md="1" offset-lg="2">
        <v-row>
          <v-col>
            <label class="text-h3 font-weight-bold">Create Campaign</label>
          </v-col>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col md="7" sm="12">
              <v-text-field v-model="campaignName" outlined dense :rules="campaignNameRules" label="Campaign Name"
                required>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="6" sm="12">
              <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateRangeText" outlined dense label="Campaign Period"
                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" range>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="5" sm="12">
              <v-text-field v-model="goal" :rules="goalRules" outlined dense label="Goal" suffix="LKR"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="3" sm="12">
              <v-text-field v-model="city" :rules="cityRules" outlined dense label="City" required></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="3" sm="12">
              <v-select :items="proviceList" v-model="province" outlined dense label="Province" :rules="provinceRules">
              </v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col md="3" sm="12">
              <v-select :items="categoryItems" label="Category" outlined dense :rules="categoryRules" v-model="categoryItem"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-file-input v-model="files" required :rules="mainImageRules" ref="fileInput" label="Campaign Image" accept="image/*" outlined dense
                @change="onFileSelected"></v-file-input>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-radio-group v-model="radioGroup" mandatory>
                  <v-radio label="Fixed Goal" value="Fixed Goal"></v-radio>
                  <v-radio label="Dynamic Goal" value="Dynamic Goal"
                  ></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea counter outlined v-model="shortDescription" :rules="shortDescriptionRules" name="input-7-1"
                label="Short Description" value="" hint="Short Description about the Campaign"></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="longDescription">
              </vue-editor>
            </v-col>
          </v-row>

          <v-divider class="my-5"></v-divider>

          <v-row>
            <v-col>
              <label>Support Documents</label>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-file-input v-model="supportFiles" ref="supportFileInput" outlined dense multiple
                accept="image/png, image/jpeg, image/bmp" @change="onSuppportFilesSelected"
                placeholder="Upload Your Support Documents Here" prepend-icon="mdi-camera" label="Support Documents">
              </v-file-input>
            </v-col>
            <v-col cols="6">
              <label>Please Upload all your support documents here</label>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-checkbox v-model="chkTerms" :label="`Agree to all Terms and Conditions`" required :rules="termsRules">
              </v-checkbox>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="createCampaign">
                Create Campaign
              </v-btn>
              <v-btn color="error">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { getStorage, ref, uploadBytes, uploadBytesResumable , getDownloadURL } from "firebase/storage";
import storage from '@/firebase';
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      radioGroup: null,
      valid: true,
      modal: false,
      files: [],
      supportFiles: [],
      categoryItems: ['Medical & Health', 'Memorials & Funerals', 'NonProfit/Charity', 'Schools & Education', 'Pets & Animals', 'Disaster Relief', 'Clubs & Community', 'Sports & Teams', 'Creative Projects', 'Events', 'Kids & Family', 'LGBT'],
      categoryRules: [(v) => !!v || "Please select Category"],
      categoryItem: "",
      campaignName: "",
      campaignNameRules: [(v) => !!v || "Campaign Name required"],
      date: [new Date().toISOString().substr(0, 10)],
      goal: "",
      goalRules: [
        (v) => !!v || "Goal Amount required",
        (v) => v >= 500 || "Amount should be above 500 LKR",
      ],
      city: "",
      cityRules: [(v) => !!v || "City Name Name required"],
      province: "",
      proviceList: ['Western Province', 'Southern Province', 'Central Province', 'Eastern Province', 'Northern Province', 'North Western Province', 'North Central Province', 'Sabaragamuwa Province', 'Uva Province',],
      provinceRules: [(v) => !!v || "Please select Province"],
      shortDescription: "",
      shortDescriptionRules: [v => v.length <= 250 || 'Max 250 characters'],
      longDescription: "",
      mainImageRules: [(v) => !!v || "File is required"],
      supportDocrules: [
        value => !value || value.size < 2000000 || 'Document size should be less than 2 MB!', (v) => !!v || "File is required"
      ],
      chkTerms: false,
      termsRules: [(v) => !!v || "Please Agree to Terms and Conditions"],
    }
  },
  methods: {
    createCampaign() {
      if (this.$refs.form.validate()) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          campaignName: this.campaignName,
          campaignStartDate: this.date[0],
          campaignEndDate: this.date[1],
          campaignDescription: this.longDescription,
          shortDescription: this.shortDescription,
          city: this.city,
          province: this.province,
          goal: this.goal,
          createdBy: this.$session.get("user_token"),
          goalType: this.radioGroup,
          category: this.categoryItems.indexOf(this.categoryItem) + 1
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.VUE_APP_API_URL + "/campaign/create", requestOptions)
          .then(async (response) => {

            const resdata = await response.json();


            console.log(resdata);
            // check for error response
            if (!response.ok) {
              console.log("response Failed");
            }

            var campaignid = resdata.data;

            const storage = getStorage();

            const storageRef = ref(storage, 'CampaignImages/' + campaignid + '/main.jpg');
            const metadata = {
              contentType: 'image/jpeg'
            };
            uploadBytes(storageRef, this.selectedFile, metadata).then((snapshot) => {
              getDownloadURL(storageRef).then((url) => {

                this.mainImgSrc = url;

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                  id: campaignid,
                  mainImgSrc: this.mainImgSrc
                });

                var requestOptions = {
                  method: "POST",
                  mode: "cors",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };
                fetch(process.env.VUE_APP_API_URL + "/campaign/updateCampaignImage", requestOptions)
                  .then(async (response) => {
                    const resdata = await response.json();
                    console.log(resdata)
                    // check for error response

                    this.selectedSupportFiles.forEach(element => {
                      var url = this.uploadImageAsPromise(element, campaignid);
                    });

                    // Redirect to page
                    this.$router.push("/Campaign-Dashboard");
                  });
              });
            });



          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
      }
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)


    },
    onFileSelected(event) {
      this.selectedFile = event;
    },
    onSuppportFilesSelected(event) {
      this.selectedSupportFiles = event;
    },
    uploadImageAsPromise(imageFile, campaignid) {
      const storage = getStorage();
      const storageRef = ref(storage, 'SupportDocuments/' + campaignid + '/' + imageFile.name);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              id: campaignid,
              docUrl: downloadURL
            });

            var requestOptions = {
              method: "POST",
              mode: "cors",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };
            fetch(process.env.VUE_APP_API_URL + "/campaign/updateDocumentList", requestOptions)
              .then(async (response) => {
                const resdata = await response.json();
                console.log(resdata)
                // check for error response
                if (!response.ok) {
                  console.log("Document Update Successfully")
                }
                else {
                  console.log("Document Update Failed")
                }
              });
          });
        }
      );

    }
  },
  computed: {
    dateRangeText() {
      return this.date.join(" ~ ");
    },
  }
}
</script>
