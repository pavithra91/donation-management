<template>
    <v-form ref="form" v-model="valid" lazy-validation>
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
                <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password"
                    @click:append="show1 = !show1"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>

        <v-row>
            <v-spacer></v-spacer>
            <v-col class="shrink d-flex justify-center align-center">
                <v-btn type="submit" color="success" :disabled="!valid" @click="validate">
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

    </v-form>
</template>

<script>
import ForgetPassword from "@/components/layouts/ForgetPassword.vue";
export default {
    name: "SignInComp",
    components: {
        ForgetPassword
    },
    data() {
        return {
            dialog: false,
            email: "",
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
            password: "",
            passwordRules: (v) => !!v || "Password is required",
        }
    },
    methods: {
        validate() {

        },
        closeDialog: function(){
            this.dialog = false;
          }  
    }
}
</script>
