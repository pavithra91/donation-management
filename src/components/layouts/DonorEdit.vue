<template>
    <v-container>
        <v-row>
            <v-col md="2">
                <label class="text-h6 font-weight-bold">Name : </label>
            </v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.firstName }} {{ profile.lastName }}
                </label>
            </v-col>
            <v-col>

                <v-dialog v-model="dialogbox" width="800">
                    <template v-slot:activator="{ on, attrs }">

                        <v-btn v-bind="attrs" v-on="on" class="float-right" x-small fab outlined color="teal">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5">
                            <label>Edit Profile Information</label>
                        </v-card-title>

                        <v-card-text>

                            <v-form ref="form" v-model="valid" lazy-validation>

                                <v-divider></v-divider>
                                <v-row class="my-2">
                                    <v-col>
                                        <div class="text-center">
                                            <v-text-field v-model="profile.firstName" :rules="firstNameRules" outlined
                                                label="First Name" required>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="text-center">
                                            <v-text-field v-model="profile.lastName" :rules="lastNameRules" outlined
                                                label="Last Name" required>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <div class="text-center">
                                            <v-text-field v-model="profile.email" label="Email" filled readonly
                                                outlined>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col>
                                        <div class="text-center">
                                            <v-text-field v-model="profile.phone" :rules="phoneNameRules" label="phone"
                                                outlined required></v-text-field>
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col>
                                        <div class="text-center">
                                            <v-text-field v-model="profile.address" label="Address" outlined>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-col>

                                    </v-col>

                                </v-row>

                                <v-divider></v-divider>
                            </v-form>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="primary" text @click="dialogbox = false">
                                Close
                            </v-btn>
                            <v-btn color="primary" :disabled="!valid" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


            </v-col>
        </v-row>

        <v-row>
            <v-col md="2"><label class="text-h6 font-weight-bold">Email : </label></v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.email }}
                </label>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2">
                <label class="text-h6 font-weight-bold">Phone : </label>
            </v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.phone }}
                </label>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2">
                <label class="text-h6 font-weight-bold">Address : </label>
            </v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.address }}
                </label>
            </v-col>
        </v-row>

        <v-divider class="my-5"></v-divider>
        <v-row>
            <v-col md="2">
                <label class="text-h6 font-weight-bold">Birth Day : </label>
            </v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.dob }}
                </label>
            </v-col>
        </v-row>

        <v-row>
            <v-col md="2">
                <label class="text-h6 font-weight-bold">Gender : </label>
            </v-col>
            <v-col>
                <label class="text-h6">
                    {{ profile.gender }}
                </label>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import { METHODS } from 'http';

export default {
    name: "DonorEdit",
    props: ["profile", "accessLevel"],
    data() {
        return {
            valid: true,
            dialogbox: false,
            firstNameRules: [v => !!v || 'First Name required'],
            lastNameRules: [v => !!v || 'Last Name required'],
            phoneNameRules: [v => !!v || 'First Name required'],
        }
    },
    mounted() {

    },
    methods: {
        save() {

            let id = localStorage.getItem("user_token");

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                id: id,
                firstName: this.profile.firstName,
                lastName: this.profile.lastName,
                phone: this.profile.phone,
                address: this.profile.address,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3000/api/user/updateUserDetails", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                    }
                    this.$emit('message', "Profile Update Successfully");

                    this.dialogbox = false
                })
                .catch((error) => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
        }
    }
}
</script>
