<template>
    <v-card flat>
        <v-layout row wrap class="pa-3" style="margin-top: 40px;">
            <v-flex xs12 md8>

                <template>
                    <v-data-table :headers="headers" :items="campaignRequestList" sort-by="calories"
                        class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Campaign Requests</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" campaignEndDate-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                            Add Rule
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="text-h5">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.campaignName"
                                                            label="Campaign Name">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.campaignStartDate"
                                                            label="Campaign Start Date">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.campaignEndDate"
                                                            label="Campaign End Date">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.City" label="City">
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="close">
                                                Cancel
                                            </v-btn>
                                            <v-btn color="blue darken-1" text @click="save">
                                                Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogApprove" campaignEndDate-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to Approve this item?
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeApprove">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="approveItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-eye
                            </v-icon>
                            <v-icon small @click="approveItem(item)">
                                mdi-check-bold
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn color="primary" @click="initialize">
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </template>


            </v-flex>
            <v-flex xs12 md6>
                <div style="width: 400px;">

                </div>
            </v-flex>
        </v-layout>

    </v-card>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogApprove: false,
        headers: [
            {
                text: 'Campaign Name',
                align: 'start',
                sortable: false,
                value: 'campaignName',
            },
            { text: 'Campaign Start Date', value: 'campaignStartDate', },
            { text: 'Campaign End Date', value: 'campaignEndDate' },
            { text: 'City', value: 'City' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        campaignRequestList: [],
        editedIndex: -1,
        editedItem: {
            campaignName: '',
            campaignStartDate: 0,
            campaignEndDate: 0,
            City: 0,
        },
        defaultItem: {
            campaignName: '',
            campaignStartDate: 0,
            campaignEndDate: 0,
            City: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogApprove(val) {
            val || this.closeApprove()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {

            fetch('http://localhost:3000/api/campaign/getCampaignRequests')
                .then(async (response) => {
                    const resdata = await response.json()

                    this.campaignRequestList = resdata.data

                })
                .catch(err => console.log(err.message));


        },

        editItem(item) {
            this.$router.push("/Campaign/" + item.id);
            // this.editedIndex = this.campaignRequestList.indexOf(item)
            //  this.editedItem = Object.assign({}, item)
            //  console.log(item);
            //  this.dialog = true
        },

        approveItem(item) {
            this.editedIndex = this.campaignRequestList.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogApprove = true
        },

        approveItemConfirm() {
            this.campaignRequestList.splice(this.editedIndex, 1)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                campaignName: this.editedItem.campaignName,
                campaignStartDate: this.editedItem.campaignStartDate,
                campaignEndDate: this.editedItem.campaignEndDate,
                City: this.editedItem.City,
            });

            var requestOptions = {
                method: "POST",
                mode: "cors",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3000/api/misc/deleteRule", requestOptions)
                .then(async (response) => {
                    const resdata = await response.json();

                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        console.log("Error")
                    }
                    else {
                        console.log("No Error")
                    }
                });

            this.closeApprove()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeApprove() {
            this.dialogApprove = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            debugger;
            if (this.editedIndex > -1) {
                Object.assign(this.campaignRequestList[this.editedIndex], this.editedItem)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    campaignName: this.editedItem.campaignName,
                    campaignStartDate: this.editedItem.campaignStartDate,
                    campaignEndDate: this.editedItem.campaignEndDate,
                    City: this.editedItem.City,
                });

                var requestOptions = {
                    method: "POST",
                    mode: "cors",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch("http://localhost:3000/api/misc/updateRule", requestOptions)
                    .then(async (response) => {
                        const resdata = await response.json();

                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            console.log("Error")
                        }
                        else {
                            console.log("No Error")
                        }
                    });
            } else {
                this.campaignRequestList.push(this.editedItem)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    campaignName: this.editedItem.campaignName,
                    campaignStartDate: this.editedItem.campaignStartDate,
                    campaignEndDate: this.editedItem.campaignEndDate,
                    City: this.editedItem.City,
                });

                var requestOptions = {
                    method: "POST",
                    mode: "cors",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                };

                fetch("http://localhost:3000/api/misc/addRule", requestOptions)
                    .then(async (response) => {
                        const resdata = await response.json();

                        if (!response.ok) {
                            // get error message from body or default to response statusText
                            console.log("Error")
                        }
                        else {
                            console.log("No Error")
                        }
                    });
            }
            this.close()
        },
    },
}
</script>