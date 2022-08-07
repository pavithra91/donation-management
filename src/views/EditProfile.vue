<template>
  <div class="main-container">
    <div class="sub-container">
      <div class="main-title">User Profile</div>

      <CampaignManagerProfileComp v-if="isCampaignManager" />
      <DonorProfileComp v-if="isDonor" />

    </div>
  </div>
</template>


<script>
import CampaignManagerProfileComp from '@/components/CampaignManagerProfileComp.vue'
import DonorProfileComp from '@/components/DonorProfileComp.vue'

export default {
  name: 'EditProfile',
  components: {
    CampaignManagerProfileComp,
    DonorProfileComp,
  },
  data() {
    return {
      role: "",
      accStatus: "",
      isCampaignManager: false,
      isDonor: false,
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
          this.role = resdata.data.role;
          this.accStatus = resdata.data.accStatus;

          if (this.role == "Campaign Manager") {
            this.isCampaignManager = true;
            this.isDonor = false;
          }
          else if (this.role == "Donor") {
            this.isCampaignManager = false;
            this.isDonor = true;
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    } else {
      this.$router.push("/Home");
    }
  },
}
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