<template>
  <v-card flat>
    <v-row>
      <v-col md="2">
        <v-select
          :items="userRoleList"
          v-model="userRoleValue"
          label="User Role"
        ></v-select>
      </v-col>

      <v-col md="2" class="mx-15">
        <v-select
          :items="accountStatusList"
          v-model="accountStatusValue"
          label="Account Status"
        ></v-select>
      </v-col>

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
          name="UserList.xls"
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
            User Report
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
          <v-data-table :headers="headers" :items="userList" :search="search">
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
      userRoleValue: "All",
      accountStatusValue: "All",
      userRoleList: [
        { text: "All", value: "All" },
        { text: "Donor", value: "Donor" },
        { text: "Campaign Manager", value: "Campaign Manager" },
        { text: "Administrator", value: "Administrator" },
      ],
      accountStatusList: [
        { text: "All", value: "All" },
        { text: "Active", value: "Active" },
        { text: "Pending", value: "Pending" },
      ],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "firstName",
        },
        { text: "Email", value: "email" },
        { text: "Address", value: "address" },
        { text: "City", value: "city" },
        { text: "Phone No", value: "phone" },
        { text: "User Role", value: "role" },
        { text: "User Status", value: "userStatus" },
        { text: "Account Status", value: "accStatus" },
        { text: "Created Date", value: "dateCreated" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      userList: [],

      json_fields: {
        Name: "Name",
        Email: "Email",
        Address: "Address",
        City: "City",
        "Phone No": "Phone",
        "User Role": "Role",
        "User Status": "User_Status",
        "Account Status": "Account_Status",
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
    //console.log(this.userList);
  },
  methods: {
    initialize() {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "All", status: "All" }),
      };
      fetch("http://localhost:3000/api/user/getAllUsers", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          this.userList = resdata.data;

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
    filter() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: this.userRoleValue,
          status: this.accountStatusValue,
        }),
      };
      fetch("http://localhost:3000/api/user/getAllUsers", requestOptions)
        .then(async (response) => {
          const resdata = await response.json();

          this.userList = resdata.data;

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
      this.$router.push("/Campaign/" + item.id);
    },
  },
};
</script>