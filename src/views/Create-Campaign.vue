<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title">Create Campaign</div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="6" md="4"> </v-col>
            <v-col cols="6" md="4">
              <v-text-field
                v-model="campaignName"
                :rules="campaignNameRules"
                label="Campaign Name"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="4"> </v-col>
            <v-col cols="6" md="4">
              <v-row>
                <v-col cols="6" md="6">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Campaign Period"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" range>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" md="5">
                  <v-text-field
                    v-model="goal"
                    :rules="goalRules"
                    label="Goal"
                    value=""
                    suffix="LKR"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-row>
              <v-col cols="6" md="4"> </v-col>
              <v-col cols="6" md="4">
                <v-textarea
                  v-model="longDescription"
                  :rules="longDescriptionRules"
                  name="input-7-1"
                  label="Description"
                  value=""
                  hint="Description of the Campaign"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-row>

          <v-row>
            <v-col cols="6" md="4"> </v-col>
            <v-col cols="6" md="4">
              <v-row>
                <v-col cols="6" md="5">
                  <v-file-input
                    v-model="headerImage"
                    :rules="headerImageRules"
                    accept="image/*"
                    label="Header Image"
                  ></v-file-input>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" md="5">
                  <v-file-input
                    multiple
                    accept="image/*"
                    label="Other Images (5 max)"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" md="4"> </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" md="4"> </v-col>
            <v-col cols="6" md="4">
              <v-row>
                <v-col cols="6" md="5">
                  <v-text-field
                    v-model="city"
                    :rules="cityRules"
                    label="City"
                    required
                  ></v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" md="5">
                  <v-select
                    :items="[
                      'Western Province',
                      'Southern Province',
                      'Central Province',
                      'Eastern Province',
                      'Northern Province',
                      'North Western Province',
                      'North Central Province',
                      'Sabaragamuwa Province',
                      'Uva Province',
                    ]"
                    v-model="province"
                    label="Province"
                    dense
                    :rules="provinceRules"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="6" md="4"> </v-col>
          </v-row>

          <v-row>
            <v-row>
              <v-col cols="6" md="4"> </v-col>
              <v-col cols="6" md="4">
                <v-row>
                  <v-autocomplete
                    v-model="selected"
                    :rules="tagRules"
                    :items="['Community & Neighbors', 'Education & Learning']"
                    chips
                    label="Tags"
                    full-width
                    hide-details
                    hide-no-data
                    hide-selected
                    multiple
                    single-line
                  ></v-autocomplete>
                </v-row>
              </v-col>
              <v-col cols="6" md="4"> </v-col>
            </v-row>
          </v-row>
          <br /><br />
          <v-row>
            <v-col cols="6" md="4"> </v-col>
            <v-checkbox
              v-model="chkTerms"
              :label="`Agree to all Terms and Conditions`"
              :rules="termsRules"
            ></v-checkbox>
            <v-col cols="6" md="4"> </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6" md="3"> </v-col>
            <v-col cols="6" md="4">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="createCampaign"
              >
                Create Campaign
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    campaignName: "",
    campaignNameRules: [(v) => !!v || "Campaign Name required"],
    goal: "",
    goalRules: [
      (v) => !!v || "Goal Amount required",
      (v) => v >= 500 || "Amount should be above 500 LKR",
    ],
    longDescription: "",
    longDescriptionRules: [(v) => !!v || "Goal Amount required"],
    headerImage: "",
    headerImageRules: [(v) => !!v || "File is required"],
    selected: "",
    tagRules: [(v) => !!v || "Select minimum 1 Tag"],
    date: [new Date().toISOString().substr(0, 10)],
    province: "",
    provinceRules: [(v) => !!v || "Please select Province"],
    city: "",
    cityRules: [(v) => !!v || "City Name Name required"],
    chkTerms: false,
    termsRules: [(v) => !!v || "Please Agree to Terms and Conditions"],
  }),

  methods: {
    createCampaign() {
      if (this.$refs.form.validate()) {
        console.log("Validated Input");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          campaignName: this.campaignName,
          campaignStartDate: this.date[0],
          campaignEndDate: this.date[1],
          campaignDescription: this.longDescription,
          city: this.city,
          province: this.province,
          goal: this.goal,
          createdBy: localStorage.getItem("user_token"),
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/api/campaign/create", requestOptions)
          .then(async (response) => {
            const resdata = await response.json();

            // check for error response
            if (!response.ok) {
              console.log("response Failed");
              // get error message from body or default to response statusText
            }

            // Redirect to page
            localStorage.setItem("user_token", resdata.data.token);
            localStorage.setItem("user_name", resdata.data.userName);
            this.$router.push("/Campaign-Dashboard");
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.date.join(" ~ ");
    },
  },
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
  margin-left: 41%;
  margin-top: 20px;
  color: #072366;
  font-size: 40px;
  font-weight: bold;
}
</style>