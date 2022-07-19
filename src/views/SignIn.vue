<template>
  <div class="main-container">
    <div class="sub-container">
      <v-card class="mx-auto" max-width="600">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <div class="main-title">Sign in</div>

        <hr class="line-break" />

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-container>
            <v-row>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3"> </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4"> </v-col>
              <v-col cols="1" md="1"> </v-col>
              <v-col cols="12" md="4">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Sign In
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <hr class="line-break" />
        <br />

        <div class="main-footer">Forget Password?</div>
        <br />
      </v-card>
    </div>
  </div>
</template>

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
.line-break {
  margin: 20px;
}
.main-footer {
  margin-left: 41%;
  margin-top: px;
}
</style>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    passwordRules: [(v) => !!v || "Password is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  methods: {
    validate() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: "pavidsscst@gmail.com",
        password: "pass#word1",
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/user/authenticate", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
          }

          // Redirect to page
          localStorage.setItem("user_token", resdata.data.token);
          localStorage.setItem("user_name", resdata.data.userName);
          this.$router.push('/Home');
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
};
</script>