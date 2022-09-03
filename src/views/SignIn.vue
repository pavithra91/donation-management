<template>
  <v-container>
    <v-alert outlined type="error" text :value="alert">
      {{ alertMessage }}
    </v-alert>

    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-card class="mx-auto">
          <v-img
            src="../assets/img/banner/signup-banner.jpg"
            height="200px"
          ></v-img>

          <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-col cols="4" class="shrink d-flex justify-center align-center">
              <label class="main-title">Sign in</label>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-divider class="mx-10"> </v-divider>

          <v-row class="my-5"> </v-row>

          <SignInComp @message="getResponse" />
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import SignInComp from "@/components/layouts/SignInComp.vue";

export default {
  components: {
    SignInComp,
  },
  data() {
    return {
      alert: false,
      alertMessage: "",
      currentTab: "SignInComp",
      tabs: ["SignInComp", "PosForgetPasswordts"],
    };
  },
  methods: {
    getResponse(value) {
      this.alert = true;
      this.alertMessage = value;
      setTimeout(() => {
        this.alert = false;
      }, 4000);
    },
  },
};
</script>


<style scoped>
.main-title {
  color: #072366;
  font-size: 40px;
  font-weight: bold;
}
</style>