<template>
  <v-card flat>
    <v-select
      :items="campaignStatusList"
      v-model="campaignStatusValue"
      label="Campaign Status"
    ></v-select>

    <v-btn class="success" @click="filter">Filter</v-btn>
    <br />
    <br />
    <download-excel
      class="btn btn-default"
      :data="json_data"
      :fields="json_fields"
      worksheet="My Worksheet"
      name="Campaign Requests.xls"
    >
    <i class="fa-solid fa-file-csv fa-3x"></i>
    </download-excel>

    <v-layout row wrap class="pa-3" style="margin-top: 40px">
      <v-flex xs12 md8>
        <v-card>
          <v-card-title>
            Campaign Requests
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="campaignRequestList"
            :search="search"
          >
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
export default {
  data() {
    return {
      campaignStatusValue: "Request",
      campaignStatusList: [
        { text: "All", value: "All" },
        { text: "Request", value: "Request" },
        { text: "Under Review", value: "Under Review" },
        { text: "Approved", value: "Approved" },
        { text: "Rejected", value: "Rejected" },
      ],
      search: "",
      headers: [
        {
          text: "Campaign Name",
          align: "start",
          sortable: false,
          value: "campaignName",
        },
        { text: "Campaign Start Date", value: "campaignStartDate" },
        { text: "Campaign End Date", value: "campaignEndDate" },
        { text: "City", value: "City" },
        { text: "Campaign Status", value: "campaignStatus" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      campaignRequestList: [],

      json_fields: {
        "Campaign Name": "Campaign_Name",
        "Start Date": "Start_Date",
        "End Date": "End_Date",
        "Campaign Status": "Campaign_Status",
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
    //console.log(this.campaignRequestList);
  },
  methods: {
    initialize() {
      fetch(
        "http://localhost:3000/api/campaign/getCampaignRequests?status=" +
          this.campaignStatusValue
      )
        .then(async (response) => {
          const resdata = await response.json();

          this.campaignRequestList = resdata.data;

          resdata.data.forEach((element) => {
            let arr = Object.assign(
              { Campaign_Name: element.campaignName },
              { Start_Date: element.campaignStartDate },
              { End_Date: element.campaignEndDate },
              { Campaign_Status: element.campaignStatus }
            );
            this.json_data.push(arr);
            console.log(arr);
          });
        })
        .catch((err) => console.log(err.message));
    },
    filter() {
      fetch(
        "http://localhost:3000/api/campaign/getCampaignRequests?status=" +
          this.campaignStatusValue
      )
        .then(async (response) => {
          const resdata = await response.json();

          this.campaignRequestList = resdata.data;

          resdata.data.forEach((element) => {
            let arr = Object.assign(
              { Campaign_Name: element.campaignName },
              { Start_Date: element.campaignStartDate },
              { End_Date: element.campaignEndDate },
              { Campaign_Status: element.campaignStatus }
            );
            this.json_data.push(arr);
            console.log(arr);
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