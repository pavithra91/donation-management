<template>
  <v-container>
    <v-row class="my-15"></v-row>
    <v-row class="my-15">
      <v-col cols="5">
      </v-col>
      <v-col align-self="center">
        <h1 class="mx-2"><label>Thanks for the Donation</label></h1> <br />
        <label>World will be much better place with people like you</label>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
export default {
  props: ["id", "campaign", "name", "amount", "message", "trxref", "donationMode"],
  data() {
    return {
        userId: "",
    };
  },
  created() {
     debugger;
      if (this.id.message == "Approved" && this.id.status == "success") {
        if (!this.$session.exists()) {
          this.$router.push("/SignIn");
        } else {
          this.userId = this.$session.get("user_token");
        }
        debugger;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          campaignId: this.campaign.id,
          amount: this.amount,
          name: this.name,
          message: this.message,
          trxref: this.trxref,
          userId: this.userId,
          donationMode: this.donationMode,
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        debugger;
        fetch(process.env.VUE_APP_API_URL + "/payment/donate", requestOptions)
          .then(async (response) => {
            const resdata = await response.json();

            // check for error response
            if (!response.ok) {
              // get error message from body or default to response statusText
            }
                this.$router.push('/Campaign/' + this.campaign.id);
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error("There was an error!", error);
          });
      }
  },
  methods: {
    initialize() {
       
    },
  },
};
</script>
