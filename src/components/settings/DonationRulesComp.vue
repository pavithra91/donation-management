<template>
    <v-container>
        <v-row>
            <v-col>
                <h2>Donation Rules Management</h2>
            </v-col>
        </v-row>
        <v-card flat>
        <v-layout row wrap class="pa-3" style="margin-top: 40px;">
            <v-flex xs12 md8>

                <template>
                    <v-data-table :headers="headers" :items="donationrules" sort-by="calories" class="elevation-1">
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Modify Donation Rules</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialog" max-width="500px">
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
                                                        <v-text-field v-model="editedItem.ruleName" label="Rule Name">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.min" label="Min Points">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.max" label="Max Points">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.points" label="Points">
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
                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Are you sure you want to delete this item?
                                        </v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                                mdi-delete
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
    </v-container>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Rule Name',
                align: 'start',
                sortable: false,
                value: 'ruleName',
            },
            { text: 'Min Points', value: 'min', },
            { text: 'Max Points', value: 'max' },
            { text: 'Points', value: 'points' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        donationrules: [],
        editedIndex: -1,
        editedItem: {
            ruleName: '',
            min: 0,
            max: 0,
            points: 0,
        },
        defaultItem: {
            ruleName: '',
            min: 0,
            max: 0,
            points: 0,
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
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {

            fetch('http://localhost:3000/api/misc/getDonationRules')
                .then(async (response) => {
                    const resdata = await response.json()

                    this.donationrules = resdata.data

                })
                .catch(err => console.log(err.message));


        },

        editItem(item) {
            this.editedIndex = this.donationrules.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.donationrules.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.donationrules.splice(this.editedIndex, 1)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                ruleName: this.editedItem.ruleName,
                min: this.editedItem.min,
                max: this.editedItem.max,
                points: this.editedItem.points,
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

            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            debugger;
            if (this.editedIndex > -1) {
                Object.assign(this.donationrules[this.editedIndex], this.editedItem)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    ruleName: this.editedItem.ruleName,
                    min: this.editedItem.min,
                    max: this.editedItem.max,
                    points: this.editedItem.points,
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
                this.donationrules.push(this.editedItem)

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    ruleName: this.editedItem.ruleName,
                    min: this.editedItem.min,
                    max: this.editedItem.max,
                    points: this.editedItem.points,
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