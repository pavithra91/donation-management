<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title"></div>

      <v-row>
        <v-col> </v-col>
        <v-col>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Donation Amount
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                Add a Message
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Your payment method </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" color="#FAF9F6" height="300px">
                  <v-row align-content="center" justify="center">
                    <v-col cols="2"></v-col>
                    <v-col style="margin-top: 20px">
                      <v-btn-toggle v-model="toggle_exclusive" mandatory>
                        <v-btn value="100"> 100 LKR </v-btn>
                        <v-btn value="500"> 500 LKR </v-btn>
                        <v-btn value="1000"> 1000 LKR </v-btn>
                        <v-btn value="5000"> 5000 LKR </v-btn>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="2"></v-col>
                    <v-col>
                      <v-text-field
                        prefix="LKR"
                        :value="toggle_exclusive"
                        class="text-h4"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                  <v-row style="margin-top: 0px; padding-top: 0px">
                    <v-col cols="2"> </v-col>
                    <v-col>
                      <v-checkbox
                        v-model="anonymous"
                        label="Make Donation Anonymous"
                        color="success"
                        value="Make Donation Anonymous"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="2"> </v-col>
                  </v-row>
                </v-card>

                <v-btn
                  color="primary"
                  style="margin-right: 10px"
                  @click="e1 = 2"
                >
                  Continue
                </v-btn>

                <v-btn text outlined> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card class="mb-12" color="#FAF9F6" height="350px">
                  <v-row>
                    <v-col cols="2"></v-col>
                    <v-col style="padding-top: 20px">
                      Name to appear on page (optional)
                      <v-text-field
                        v-model="displayName"
                        placeholder="e.g. Jhon Smith"
                        outlined
                        class="text-h6"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>

                  <v-row style="padding-top: 0">
                    <v-col cols="2"></v-col>
                    <v-col>
                      Add a public message (optional)
                      <v-textarea
                        v-model="message"
                        outlined
                        placeholder="Message"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                </v-card>

                <v-btn
                  color="primary"
                  style="margin-right: 10px"
                  @click="e1 = 3"
                >
                  Continue
                </v-btn>

                <v-btn text outlined @click="e1 = 1"> Back </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" color="#FAF9F6" height="200px">
                  <v-row style="padding-top: 50px">
                    <v-col cols="2"></v-col>
                    <v-col>
                      <v-btn class="ma-2" height="50px" outlined color="indigo">
                        <v-row>
                          <v-col style="padding-right: 5px">
                            <i class="fab fa-cc-visa fa-2x"></i>
                          </v-col>
                          <v-col style="padding-left: 0px">
                            <i class="fab fa-cc-mastercard fa-2x"></i>
                          </v-col>
                          <v-col>
                            <paystack
                              :amount="getamount"
                              :email="email"
                              :paystackkey="paystackkey"
                              :reference="reference"
                              :callback="callback"
                              :close="close"
                              :embed="false"
                            >
                              <div style="margin-top: 6px">
                                Credit or Debit Card
                              </div>
                            </paystack>
                          </v-col>
                        </v-row>
                      </v-btn>
                    </v-col>
                    <v-col cols="2"></v-col>
                  </v-row>
                </v-card>

                <v-btn text outlined @click="e1 = 2"> Back </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
        <v-col></v-col>
      </v-row>
    </div>
  </div>
</template>


<script>
import paystack from "vue-paystack";
import { v1 as uuidv1 } from "uuid";
export default {
  components: {
    paystack,
  },
  props: ["id"],
  data() {
    const amt = (1 / 0.83) * 100 * 100;
    console.log(amt.toFixed(2));

    return {
      userId: null,
      anonymous: false,
      e1: 1,
      toggle_exclusive: 0,
      displayName: "",
      amount: 0,
      message: "",
      paystackkey: "pk_test_57e3d8f5a59bee0cf0481115e30cf89bcbb62183", //paystack public key
      email: "foobar@example.com", // Customer email
      currency: "NGN",
    };
  },
  computed: {
    getamount() {
      return parseInt(parseInt(this.toggle_exclusive) * (1 / 0.83) * 100);
    },
    reference() {
      let text = "2GDNh8rap1s76uHmFbh4-" + uuidv1();
      return text;
    },
  },
  methods: {
    callback: function (response) {
      console.log(response);

      if (response.message == "Approved" && response.status == "success") {
        if (!this.anonymous) {
          if (!this.$session.exists()) {
            this.$router.push("/SignIn");
          } else {
            this.userId = this.$session.get("user_name");
          }
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          campaignId: this.id,
          name: this.displayName,
          amount: Number(this.toggle_exclusive),
          message: this.message,
          userId: this.userId,
          trxref: response.trxref,
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/api/payment/donate", requestOptions)
          .then(async (response) => {
            const resdata = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response statusText
            }
            console.log(resdata.data.status);
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
      }
    },
    close: function () {
      console.log("Payment closed");
    },
    makeDonation() {

    },
  },
};
</script>

<style scoped>
.topfund {
  background: #ffffff;
}

.topfund-container {
  padding-top: 10px;
}

.main-title {
  padding-top: 100px;
  padding-bottom: 60px;
  font-size: 40px;
  font-weight: bold;
  margin-left: 41%;
}
</style>