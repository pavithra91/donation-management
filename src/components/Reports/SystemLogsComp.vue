<template>
<v-container>
  <v-row>
            <v-col>
                <h2>System Log Report</h2>
            </v-col>
        </v-row>
        <v-card flat>
    <v-row>
      <v-col md="2">
        <v-select
          :items="logLevelList"
          v-model="logLevelValue"
          label="Log type"
        ></v-select>
      </v-col>

      <v-col md="3">
        <v-menu ref="FromMenu" v-model="FromMenu" :close-on-content-click="false" :return-value.sync="pikerFromDate"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="pikerFromDate" label="Campaign Start Date" prepend-icon="mdi-calendar" readonly
              v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="pikerFromDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="FromMenu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.FromMenu.save(pikerFromDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-spacer></v-spacer>

      <v-col md="3">
        <v-menu ref="ToMenu" v-model="ToMenu" :close-on-content-click="false" :return-value.sync="pikerToDate"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="pikerToDate" label="Campaign End Date" prepend-icon="mdi-calendar" readonly
              v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="pikerToDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="ToMenu = false">
              Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.ToMenu.save(pikerToDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-btn class="success" @click="filter">Filter</v-btn>
      </v-col>

      <v-col md="1">
      </v-col>
    </v-row>

    <v-row>
      <v-col md="1">
        <download-excel class="btn btn-default" :data="json_data" :fields="json_fields" worksheet="My Worksheet"
          name="CampaignsList.xls">
          <i class="fa-solid fa-file-csv fa-3x"></i>
        </download-excel>
      </v-col>

      <v-col md="1">
        <i class="fa-solid fa-file-pdf fa-3x"></i>
      </v-col>
    </v-row>

    <v-layout class="my-3">
      <v-flex xs12 md10>
        <v-card>
          <v-card-title>
            System Logs
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="campaignList" :search="search">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="viewItem(item)">
                mdi-eye
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</v-container>
</template>


<script>
import moment from "moment";

export default {
  data() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return {
      pikerFromDate: new Date(firstDay - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      FromMenu: false,
      pikerToDate: new Date(lastDay - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      ToMenu: false,
      search: "",
      logLevelValue: "All",
      logLevelList: [
        { text: "All", value: "All" },
        { text: "Info", value: "info" },
        { text: "Error", value: "error" },
        { text: "Warning", value: "warn" },
      ],
      headers: [
        {
          text: "Level",
          align: "start",
          sortable: false,
          value: "level",
        },
        { text: "Message", value: "message" },
        { text: "Method", value: "request" },
        { text: "Time Stamp", value: "timestamp" },
      ],
      campaignList: [],

      json_fields: {
        "Level": "level",
        "Message": "message",
        "Method": "request",
        "Time Stamp": "timestamp",
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  created() {
    this.initialize();
    //console.log(this.campaignList);
  },
  methods: {
    initialize() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: "All",
          fromDate: (new Date(firstDay - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          toDate: (new Date(lastDay - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }),
      };
      fetch(process.env.VUE_APP_API_URL + "/misc/getUserLog", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();


          resdata.data.file.forEach((element) => {

            let arr = Object.assign(
              { level: element.level },
              { message: element.message },
              { request: element.request },
              { timestamp: element.timestamp }
            );
            this.json_data.push(arr);

            this.campaignList.push(element);
          });
        })
        .catch((err) => console.log(err.message));
    },

    filter() {
      this.campaignList = [];
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: this.logLevelValue,
          fromDate: this.pikerFromDate,
          toDate: this.pikerToDate
        }),
      };
      fetch(process.env.VUE_APP_API_URL + "/misc/getUserLog", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          resdata.data.file.forEach((element) => {

            let arr = Object.assign(
              { level: element.level },
              { message: element.message },
              { request: element.request },
              { timestamp: element.timestamp }
            );
            this.json_data.push(arr);

            this.campaignList.push(element);
          });
        })
        .catch((err) => console.log(err.message));
    },
    viewItem(item) {
      this.$router.push("/Campaign/" + item.id);
    },
  },
};
</script>