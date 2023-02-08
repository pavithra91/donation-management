<template>
  <v-card flat>
    <v-row>
      <v-col md="2">
        <v-select
          :items="incidentStatusList"
          v-model="incidentStatusValue"
          label="Incident Status"
        ></v-select>
      </v-col>

      <v-col md="1"></v-col>

      <v-col md="2">
        <v-menu
          ref="FromMenu"
          v-model="FromMenu"
          :close-on-content-click="false"
          :return-value.sync="pikerFromDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="pikerFromDate"
              label="Created From Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="pikerFromDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="FromMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.FromMenu.save(pikerFromDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
      <v-col md="2">
        <v-menu
          ref="ToMenu"
          v-model="ToMenu"
          :close-on-content-click="false"
          :return-value.sync="pikerToDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="pikerToDate"
              label="Created To Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="pikerToDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="ToMenu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.ToMenu.save(pikerToDate)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-btn class="success" @click="filter">Filter</v-btn>
      </v-col>

      <v-col md="2"> </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col md="1">
        <download-excel
          class="btn btn-default"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          name="ReportedCampaignList.xls"
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
            Reported Campaigns
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
          <v-data-table :headers="headers" :items="reportedCampaignList" :search="search">
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
      incidentStatusValue: "Active",
      incidentStatusList: [
        { text: "Active", value: "Active" },
        { text: "Resolved", value: "Resolved" },
      ],
      search: "",
      headers: [
        {
          text: "Campaign Id",
          align: "start",
          sortable: false,
          value: "campaignId",
        },
        { text: "Reason", value: "reason" },
        { text: "Comment", value: "comment" },
        { text: "Reported By", value: "reportedBy" },
        { text: "Created Date", value: "reportedDate" },
        { text: "Status", value: "status" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      reportedCampaignList: [],

      json_fields: {
        "Campaign Id": "Campaign_Id",
        Reason: "Reason",
        Comment: "Comment",
        "Reported By": "Reported_By",
        "Created Date": "Created_Date",
        "Status": "Status",
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
    //console.log(this.reportedCampaignList);
  },
  methods: {
    initialize() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Active" }),
      };
      fetch(process.env.VUE_APP_API_URL + "/misc/getAllReportedCampaigns", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          this.reportedCampaignList = resdata.data;

          resdata.data.forEach((element) => {
            let arr = Object.assign(
              { Campaign_Id: element.campaignId },
              { Reason: element.reason },
              { Comment: element.comment },
              { Reported_By: element.reportedBy },
              { Created_Date: element.reportedDate },
              { Status: element.status }
            );
            this.json_data.push(arr);
            //  console.log(arr);
          });
        })
        .catch((err) => console.log(err.message));
    },
    filter() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: this.userRoleValue,
          status: this.accountStatusValue,
        }),
      };
      fetch(process.env.VUE_APP_API_URL + "/user/getAllUsers", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          this.reportedCampaignList = resdata.data;

          resdata.data.forEach((element) => {
            let arr = Object.assign(
              { Name: element.firstName },
              { Email: element.email },
              { Address: element.address },
              { City: element.city },
              { Phone: element.phone },
              { Role: element.role },
              { User_Status: element.userStatus },
              { Account_Status: element.accStatus },
              { Created_Date: element.dateCreated }
            );
            this.json_data.push(arr);
            //  console.log(arr);
          });
        })
        .catch((err) => console.log(err.message));
    },
    viewItem(item) {
      this.$router.push("/Campaign/" + item.campaignId);
    },
  },
};
</script>