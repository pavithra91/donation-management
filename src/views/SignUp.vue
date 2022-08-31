<template>
  <v-container>
    <v-row class="my-10">
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
              <label class="main-title">Sign Up</label>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>

          <v-divider> </v-divider>
          <v-row class="my-5"> </v-row>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="4">
                <v-text-field
                  v-model="firstName"
                  :rules="firstNameRules"
                  outlined
                  dense
                  label="First Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="lastName"
                  :rules="lastNameRules"
                  outlined
                  dense
                  label="Last Name"
                  required
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="8">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  outlined
                  dense
                  label="Email Address"
                  required
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-row>
              <v-spacer></v-spacer>
              <v-col cols="8">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  outlined
                  dense
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-row>
              <v-spacer></v-spacer>
              <v-col md="2" lg="2" sm="4" class="my-2">
                <label>Sign up as? </label>
              </v-col>
              <v-col md="4" lg="4" sm="4" class="pa-0">
                <v-radio-group v-model="radioGroup" mandatory>
                  <v-radio label="Donor" value="Donor"></v-radio>
                  <v-radio
                    label="Campaign Organizor"
                    value="Campaign Manager"
                  ></v-radio>
                </v-radio-group>
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
                  Resgiter
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>

            <v-divider class="my-10"></v-divider>

            <v-row>
              <v-col
                cols="12"
                class="shrink d-flex justify-center align-center"
              >
                <label
                  >By continuing, you agree to the Charity terms and acknowledge
                  receipt of our privacy notice.</label
                >
              </v-col>
            </v-row>
          </v-form>
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
      show1: false,
      valid: true,
      radioGroup: null,
      firstName: "",
      firstNameRules: [(v) => !!v || "Please Enter First Name"],
      lastName: "",
      lastNameRules: [(v) => !!v || "Please Enter Last Name"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: "",
      passwordRules: [(v) => !!v || "Please Enter Password", v => v.length >= 8 || 'Min 8 characters'],
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          role: this.radioGroup,
        });

        var requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://localhost:3000/api/user/addUser", requestOptions).then(
          async (response) => {
            const resdata = await response.json();

            console.log(resdata);
            debugger;
            // check for error response
            if (!response.ok) {
              console.log("response Failed");
            }
            this.$router.push("/SignIn");
          }
        );
        this.$router.push("/SignIn");
      }
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