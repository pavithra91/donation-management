<template>
    <v-card flat>
      <v-row> 
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
          <download-excel
            class="btn btn-default"
            :data="json_data"
            :fields="json_fields"
            worksheet="My Worksheet"
            name="CampaignsList.xls"
          >
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
              Campaign Report
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              >
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
      CampaignStatusValue: "All",
      campaignStatusList: [
        { text: "All", value: "All" },
        { text: "Approved", value: "Approved" },
        { text: "Request", value: "Request" },
        { text: "Pending", value: "Pending" },
        { text: "Rejected", value: "Rejected" },
      ],
      search: "",
      headers: [
        {
          text: "Campiagn ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Campaign Name", value: "campaignName" },
        { text: "Start Date", value: "campaignStartDate" },
        { text: "End Date", value: "campaignEndDate" },
        { text: "Goal", value: "goalAmount" },
        { text: "Raised Amount", value: "raiedAmount" },
        { text: "No of Donations", value: "noOfDonations" },
        { text: "Campiagn Status", value: "campaignStatus" },
         { text: "Created By", value: "createdBy" },
        { text: "Created Date", value: "dateCreated" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      campaignList: [],

      json_fields: {
        "Campiagn ID": "Campiagn_ID",
        "Campaign Name": "Campaign_Name",
        "Start Date": "Start_Date",
        "End Date": "End_Date",
        "Goal": "Goal",
        "Raised Amount": "Raised_Amount",
        "No of Donations": "No_of_Donations",
        "Campiagn Status": "Campaign_Status",
        "Created By": "Created_By",
        "Created Date": "Created_Date",
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
        body: JSON.stringify({ status: "All", 
        fromDate: (new Date(firstDay - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), 
        toDate: (new Date(lastDay - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) }),
      };
      fetch("http://localhost:3000/api/user/getAllUsers", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          resdata.data.forEach((element) => {
            
            let format_Date = new Date((element.dateCreated._seconds * 1000)).toDateString();
            format_Date = moment(format_Date).format('YYYY-MM-DD');

            let arr = Object.assign(
              { Campiagn_ID: element.id },
              { Campaign_Name: element.campaignName },
              { Start_Date: element.campaignStartDate },
              { End_Date: element.campaignEndDate },        
              { Goal: element.goalAmount },
              { Raised_Amount: element.raiedAmount },
              { No_of_Donations: element.noOfDonations },
              { Campaign_Status: element.campaignStatus },
              { Created_By: element.createdBy },
              { Created_Date: element.dateCreated }
            );
            this.json_data.push(arr);
            
            element.dateCreated = format_Date;
            this.campaignList.push(element);
          });
        })
        .catch((err) => console.log(err.message));
    },
    filter() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         status: "All", 
         fromDate: this.pikerFromDate, 
         toDate: this.pikerToDate }),
      };
      fetch("http://localhost:3000/api/campaign/getAllCampaigns", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          resdata.data.forEach((element) => {
            
            let format_Date = new Date((element.dateCreated._seconds * 1000)).toDateString();
            format_Date = moment(format_Date).format('YYYY-MM-DD');

            let arr = Object.assign(
              { Campiagn_ID: element.id },
              { Campaign_Name: element.campaignName },
              { Start_Date: element.campaignStartDate },
              { End_Date: element.campaignEndDate },        
              { Goal: element.goalAmount },
              { Raised_Amount: element.raiedAmount },
              { No_of_Donations: element.noOfDonations },
              { Campaign_Status: element.campaignStatus },
              { Created_By: element.createdBy },
              { Created_Date: element.dateCreated }
            );
            this.json_data.push(arr);
            
            element.dateCreated = format_Date;
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