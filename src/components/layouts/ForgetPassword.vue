<template>
    <v-container>
        <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-col cols="6" class="shrink d-flex justify-center align-center">
                <label class="text-h5 font-weight-medium">Forgot your password?</label>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-divider class="my-10 mx-5"></v-divider>

        <v-row class="my-5">
            <v-spacer></v-spacer>
            <v-col cols="5" v-if="eMailSend">
                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
                </v-text-field>


            </v-col>
            <v-col cols="8" class="shrink d-flex justify-center align-center" v-if="resetInstructions">
                <i class="mx-3 my-0 fa-solid fa-check fa-1x" style="color:#4caf50"></i><label>Reset instructions sent to
                    {{ email }}</label>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5" class="shrink d-flex justify-center align-center">
                <v-btn type="submit" color="success" :disabled="btnStatus" @click="resetPassword">
                    Request New Password
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-divider class="my-15 mx-5"></v-divider>

        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5" class="shrink d-flex justify-center align-center">
                <v-btn text color="primary" v-on:click="closeDialog">
                    <v-icon class="mx-3 my-0">fa-solid fa-arrow-left</v-icon> Go Back
                </v-btn>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ForgetPassword",
    data() {
        return {
            eMailSend: true,
            resetInstructions: false,
            btnStatus: false,
            email: "",
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
        }
    },
    methods: {
        resetPassword() {
            if (this.email != "") {
                this.eMailSend = false;
                this.resetInstructions = true;
                this.btnStatus = true;

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    id: this.id,
                    email: this.email,
                });

                var requestOptions = {
                    method: "POST",
                    mode: "cors",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch("http://localhost:3000/api/user/resetPasswordSendLink", requestOptions)
                    .then(async (response) => {
                        const resdata = await response.json();

                        // check for error response
                        if (!response.ok) {
                            // get error message from body or default to response statusText
                        }
                    })
                    .catch((error) => {
                        this.errorMessage = error;
                        console.error("There was an error!", error);
                    });
            }

        },
        closeDialog: function () {
            this.$emit('close-dialog');
        }
    }
}
</script>
