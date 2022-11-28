<template>
  <v-container>
    <v-row class="my-2" v-if="showMsg">
      <v-col>
        <v-alert outlined type="success" text>
          Password Reset Successfully
        </v-alert>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-card class="mx-auto">
          <v-img
            src="../assets/img/banner/signup-banner.jpg"
            height="200px"
          ></v-img>

          <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-col cols="6" class="shrink d-flex justify-center align-center">
              <label class="main-title">Reset Password</label>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Type your new password here"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5">
              <v-text-field
                v-model="confirmPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Confirm password"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>
            <v-col class="shrink d-flex justify-center align-center">
              <v-btn
                type="submit"
                color="success"
                :disabled="!valid"
                @click="validate"
              >
                Reset Password
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      showMsg: false,
      valid: true,
      show1: false,
      password: "",
      passwordRules: [
        (v) => !!v || "Please Enter Password",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      confirmPassword: "",
      confirmPasswordRules: [(v) => !!v || "Password is required"],
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
  },
  methods: {
    validate() {
      debugger;
      console.log(this.$route.params.id);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: this.id,
        password: this.password,
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(process.env.VUE_APP_API_URL + "/user/resetPassword", requestOptions).then(
        async (response) => {
          const resdata = await response.json();
          this.showMsg = true;
          setTimeout(() => this.$router.push({ path: "/SignIn" }), 3000);
        }
      );
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmPassword || "Password must match";
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
