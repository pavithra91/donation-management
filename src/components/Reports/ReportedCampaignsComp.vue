<template>
  <v-card flat>
    <v-row>
      <v-col md="2">
        <v-select :items="incidentStatusList" v-model="incidentStatusValue" label="Incident Status"></v-select>
      </v-col>

      <v-col md="1"></v-col>

      <v-col md="2">
        <v-menu ref="FromMenu" v-model="FromMenu" :close-on-content-click="false" :return-value.sync="pikerFromDate"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="pikerFromDate" label="Created From Date" prepend-icon="mdi-calendar" readonly
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
      <v-col md="2">
        <v-menu ref="ToMenu" v-model="ToMenu" :close-on-content-click="false" :return-value.sync="pikerToDate"
          transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="pikerToDate" label="Created To Date" prepend-icon="mdi-calendar" readonly
              v-bind="attrs" v-on="on"></v-text-field>
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
        <download-excel class="btn btn-default" :data="json_data" :fields="json_fields" worksheet="My Worksheet"
          name="ReportedCampaignList.xls">
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
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>

          <v-dialog v-model="reportDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to hold this Campaign?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDialog"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="holdCampaign"
                        >Hold Campaign</v-btn>
                        <v-btn
                        color="blue darken-1"
                        text
                        @click="releaseCampaign"
                        >Release Campaign</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

          <v-data-table :headers="headers" :items="reportedCampaignList" :search="search">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="viewItem(item)">
                mdi-eye
              </v-icon>
              <v-icon v-if="item.status != 'Resolved'" small class="mr-2" @click="editItem(item)">
                mdi-check
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
      reportDialog: false,
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
        { text: "Hold", value: "Hold" },
        { text: "Resolved", value: "Resolved" },
      ],
      search: "",
      headers: [
        {
          text: "Incident Id",
          align: "start",
          sortable: false,
          value: "incidentId",
        },
        { text: "Campaign Id", value: "campaignId" },
        { text: "Reason", value: "reason" },
        { text: "Comment", value: "comment" },
        { text: "Reported By", value: "reportedBy" },
        { text: "Created Date", value: "reportedDate" },
        { text: "Status", value: "status" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      reportedCampaignList: [],

      json_fields: {
        "Incident Id": "incidentId",
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
              { Incident_Id: element.incidentId },
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
          status: this.incidentStatusValue
        }),
      };
      fetch(process.env.VUE_APP_API_URL + "/misc/getAllReportedCampaigns", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          this.reportedCampaignList = resdata.data;

          resdata.data.forEach((element) => {
            let arr = Object.assign(
              { Incident_Id: element.incidentId },
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
    viewItem(item) {
      this.$router.push("/Campaign/" + item.campaignId);
    },
    editItem(item) {
      this.editedIndex = this.reportedCampaignList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.reportDialog = true;
    },
    closeDialog() {
      this.reportDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    holdCampaign() {
      this.reportedCampaignList.splice(this.editedIndex, 1);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        incidentId: this.editedItem.incidentId,
        campaignId: this.editedItem.campaignId,
        incidentStatus: "Hold",
        CampaignStatus: 'Hold',
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/misc/hold_releaseCampaign", requestOptions).then(
        async (response) => {
          const resdata = await response.json();

          if (!response.ok) {
            // get error message from body or default to response statusText
            console.log("Error");
          } else {
            console.log("No Error");
          }
        }
      );

      this.closeDialog();
    },
    releaseCampaign() {
      this.reportedCampaignList.splice(this.editedIndex, 1);

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        incidentId: this.editedItem.incidentId,
        campaignId: this.editedItem.campaignId,
        incidentStatus: "Resolved",
        CampaignStatus: 'Active',
      });

      var requestOptions = {
        method: "POST",
        mode: "cors",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3000/api/misc/hold_releaseCampaign", requestOptions).then(
        async (response) => {
          const resdata = await response.json();

          if (!response.ok) {
            // get error message from body or default to response statusText
            console.log("Error");
          } else {
            console.log("No Error");
          }
        }
      );

      this.closeDialog();
    },
  },
};
</script>