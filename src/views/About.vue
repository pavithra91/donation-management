<template>
  <v-container>
    {{ id.trxref }}
  </v-container>
</template>
 
<script>
export default {
  props: ["id"],
  data() {
    return {};
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
          campaignId: this.id,
          name: this.displayName,
          amount: Number(this.toggle_exclusive),
          message: this.message,
          userId: this.userId,
          trxref: id.trxref,
          donationMode: donationMode,
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        debugger;
        fetch("http://localhost:3000/api/payment/donate", requestOptions)
          .then(async (response) => {
            const resdata = await response.json();
            // check for error response
            if (!response.ok) {
              // get error message from body or default to response statusText
            }
            debugger;

            this.alert = true;
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
