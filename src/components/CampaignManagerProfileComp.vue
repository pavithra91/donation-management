<template>
    <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>

            <v-container class="lighten-5 mb-6">
                <v-row>
                    <v-col></v-col>
                    <v-col>
                        <div class="profileImage: text-center">
                            <v-img class="pa-7 secondary rounded-circle d-inline-block" height="200" width="200"
                                src="https://flyclipart.com/thumb2/person-icon-165630.png" @click="handleFileImport()">
                            </v-img>
                            <input ref="uploader" class="d-none" type="file" @change="onFileChanged()">
                        </div>
                    </v-col>
                    <v-col> </v-col>
                </v-row>













                <v-row>
                    <v-col> </v-col>
                    <v-col>
                        <div class="text-center">
                            <v-chip class="ma-2" color="red" text-color="white" v-if="role == 'Administrator'">
                                {{ role }}
                            </v-chip>
                            <v-chip class="ma-2" color="primary" text-color="white" v-if="role == 'Campaign Manager'">
                                {{ role }}
                            </v-chip>

                            <v-chip class="ma-2" color="green" text-color="white" v-if="accStatus == 'Verified'">
                                Account Status {{ accStatus }}
                            </v-chip>

                            <v-chip class="ma-2" color="red" text-color="white" v-if="accStatus == 'Pending'">
                                Account Status {{ accStatus }}
                            </v-chip>

                            <v-chip class="ma-2" color="green" text-color="white" v-if="role == 'Donor'">
                                {{ role }}
                            </v-chip>

                            <v-chip class="ma-2" color="primary" outlined pill @click="backToProfile()">
                                <v-icon left>
                                    mdi-arrow-left
                                </v-icon>
                                Back

                            </v-chip>

                        </div>
                    </v-col>
                    <v-col> </v-col>
                </v-row>
            </v-container>


            <v-container>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="3">
                        <div class="text-center">
                            <v-text-field v-model="firstName" :rules="firstNameRules" label="First Name" required>
                            </v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="lastName" :rules="lastNameRules" label="Last Name" required>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-container>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center">
                            <v-text-field v-model="email" label="Email" filled readonly></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                </v-row>
            </v-container>



            <v-container>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="3">
                        <div class="text-center" v-if="accStatus == 'Pending'">
                            <v-text-field v-model="nic" label="NIC/Drivers License/Passport No"></v-text-field>
                        </div>
                        <div class="text-center" v-else>
                            <v-text-field v-model="nic" label="NIC / Drivers License / Passport No" filled readonly>
                            </v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field v-model="phone" :rules="phoneNameRules" label="phone" required></v-text-field>
                    </v-col>
                </v-row>
            </v-container>



            <v-container>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center" v-if="accStatus == 'Pending'">
                            <div class="text-center">
                                <v-file-input v-model="DocVerification" :rules="DocVerificationRules"
                                    label="Upload NIC (Both sides) / Drivers License / Passport Image"></v-file-input>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                </v-row>
            </v-container>



            <v-container>
                <v-row>
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center">
                            <v-text-field v-model="address" label="Address"></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                </v-row>

                <v-row v-if="accStatus == 'Pending'">
                    <v-col cols="3">
                    </v-col>
                    <v-col cols="6">
                        <div class="text-center">
                            <v-file-input v-model="addressVerification" :rules="addressVerificationRules"
                                label="Upload Address Verification Document"></v-file-input>
                        </div>
                    </v-col>
                    <v-col cols="3">
                    </v-col>
                </v-row>


            </v-container>

            <v-container>
                <v-row>
                    <v-col> </v-col>
                    <v-col>
                        <div class="text-center">
                            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate()">
                                Update Profile
                            </v-btn>
                        </div>
                    </v-col>
                    <v-col> </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-container>


</template>

<script>

export default {
    data() {
        return {
            valid: true,
            firstName: "",
            firstNameRules: [v => !!v || 'First Name required'],
            lastName: "",
            lastNameRules: [v => !!v || 'Last Name required'],
            email: "",
            address: "",
            nic: "",
            phone: "",
            phoneNameRules: [v => !!v || 'First Name required'],
            role: "",
            accStatus: "",
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
                    console.log(resdata.data.accStatus);
                    //this.userData = resdata.data;
                    this.firstName = resdata.data.firstName;
                    this.lastName = resdata.data.lastName;
                    this.email = resdata.data.email;
                    this.nic = resdata.data.nic;
                    this.address = resdata.data.address;
                    this.phone = resdata.data.phone;
                    this.role = resdata.data.role;
                    this.accStatus = resdata.data.accStatus;
                })
                .catch((error) => {
                    this.errorMessage = error;
                    console.error("There was an error!", error);
                });
        } else {
            this.$router.push("/Home");
        }
    },
    methods: {

        backToProfile() {
            this.$router.push("/Profile");
        },

        handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });

            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0];

            // Do whatever you need with the file, liek reading it with FileReader
        },
    }
};
</script>