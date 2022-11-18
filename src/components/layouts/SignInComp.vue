<template>
<v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
                </v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5">
                <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'" name="input-10-1" label="Password"
                    @click:append="showPassword = !showPassword"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
            <v-col class="shrink d-flex justify-center align-center">
                <v-btn type="submit" color="success" :disabled="!valid" @click="validateUser">
                    Sign In
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-divider class="mx-10 pa-2 my-5"> </v-divider>

        <v-row>
            <v-spacer></v-spacer>
            <v-col md="4" lg="4" sm="6" class="shrink d-flex justify-center align-center">
                <v-dialog v-model="dialog" class="mx-auto" max-width="800">
                    <template v-slot:activator="{ on, attr }">
                        <v-hover v-slot="{ hover }"><label :style="{ 'color': hover ? '#4caf50' : '#000000' }" text
                                v-bind="attr" v-on="on">
                                Forgot your password?
                            </label></v-hover>
                    </template>

                    <v-card>
                        <ForgetPassword v-on:close-dialog="closeDialog" />
                    </v-card>
                </v-dialog>

            </v-col>
            <v-spacer></v-spacer>
        </v-row>

</v-container>
</template>

<script>
// Import forget password component
import ForgetPassword from "@/components/layouts/ForgetPassword.vue";
export default {
    name: "SignInComp",
    components: {
        ForgetPassword
    },
    data() {
        return {
            showPassword: false,
            valid: true,
            dialog: false,
            email: "",
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "Please enter valid E-mail address",
            ],
            password: "",
            passwordRules: (v) => !!v || "Password is required",
        }
    },
    methods: {
    validateUser() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        email: this.email,
        password: this.password,
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
            // Pass error message to parent component
            this.$emit('message', "Wrong Username or Password");
          }

          // Create session
          this.$session.start();
          this.$session.set("user_token", resdata.data.token);
          this.$session.set("user_name", resdata.data.userName);
          this.$session.set("role", resdata.data.role);
          this.$session.set("fullname", resdata.data.fullname);

          if(resdata.data.profileImg !=null){
            this.$session.set("profileImg", resdata.data.profileImg);
          }


          // Redirect to Home Page
          this.$router.push('/Home');

            debugger;
            if(resdata.data.role=="Donor" || resdata.data.role=="Campaign Manager")
            {
                this.$router.push('/Home');
            }
            else{
                this.$router.push('/Reports');
            }


        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
        },
        closeDialog: function(){
            this.dialog = false;
          }  
    }
}
</script>
