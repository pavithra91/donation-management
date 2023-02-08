<template>
  <v-container class="mx-0">
    <v-container class="my-10 mx-0">
      <v-navigation-drawer
        width="300"
        class="my-16"
        color="#f4f5fa"
        permanent
        expand
        app
      >
        <v-divider></v-divider>
        <v-list>
          <v-list-item class="my-5">
            <v-list-item-title style="font-size: xx-large; font-weight: bold"
              >Approvals</v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="toggleComponentOne">
            <v-list-item-icon>
              <i class="fa fa-users fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title"
              >Campaign Organizer Request</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="toggleComponentTwo">
            <v-list-item-icon>
              <i class="fa fa-list fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title"
              >Campaign Request</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="toggleComponentSix">
            <v-list-item-icon>
              <i class="fa fa-list fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title"
              >Reported Campaign</v-list-item-title
            >
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item class="my-5">
            <v-list-item-title style="font-size: xx-large; font-weight: bold"
              >Reports</v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="toggleComponentThree">
            <v-list-item-icon>
              <i class="fa fa-chart-simple fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title">Campaign Report</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toggleComponentFour">
            <v-list-item-icon>
              <i class="fa fa-money-bill-1-wave fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title"
              >Transaction Report</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="toggleComponentFive">
            <v-list-item-icon>
              <i class="fa fa-user fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title">User Report</v-list-item-title>
          </v-list-item>

        <!--  <v-list-item @click="toggleComponentFive">
            <v-list-item-icon>
              <i class="fa fa-book fa-2x"></i>
            </v-list-item-icon>
            <v-list-item-title class="sub-title">Systems Logs</v-list-item-title>
          </v-list-item>-->

          <v-divider class="my-5"></v-divider>

          <v-list-item class="my-5">
            <router-link :to="{ name: 'Settings' }"
              ><label>
                <v-list-item-title
                  style="font-size: xx-large; font-weight: bold"
                  >Settings
                </v-list-item-title></label
              ></router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-container>
        <DashboardComp v-if="showDashboardComp" />
        <CampaignOrganizerRequestComp v-if="showCampaignOrganizerRequestComp" />
        <CampaignRequestComp v-if="showCampaignRequestComp" />
        <CampaignComp v-if="showCampaignComp" />
        <DonationTransactionComp v-if="showDonationTransactionComp" />
        <UsersComp v-if="showUsersComp" />
        <ReportedCampaignsComp v-if="showReportedCampaignsComp" />
      </v-container>
    </v-container>
  </v-container>
</template>


<script>
import DashboardComp from "@/components/Reports/DashboardComp.vue";
import CampaignOrganizerRequestComp from "@/components/Reports/CampaignOrganizerRequestComp.vue";
import CampaignRequestComp from "@/components/Reports/CampaignRequestComp.vue";
import CampaignComp from "@/components/Reports/CampaignComp.vue";
import DonationTransactionComp from "@/components/Reports/DonationTransactionComp.vue";
import UsersComp from "@/components/Reports/UsersComp.vue";
import ReportedCampaignsComp from "@/components/Reports/ReportedCampaignsComp.vue";
export default {
  name: "Settings",
  components: {
    DashboardComp,
    CampaignOrganizerRequestComp,
    CampaignRequestComp,
    CampaignComp,
    DonationTransactionComp,
    UsersComp,
    ReportedCampaignsComp,
  },

  data() {
    return {
      showDashboardComp: true,
      showCampaignOrganizerRequestComp: false,
      showCampaignRequestComp: false,
      showCampaignComp: false,
      showDonationTransactionComp: false,
      showUsersComp: false,
      showReportedCampaignsComp: false,
    };
  },
  methods: {
    toggleComponentOne() {
      this.showCampaignOrganizerRequestComp = !this.showCampaignOrganizerRequestComp;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
      this.showDashboardComp = false;
      this.showReportedCampaignsComp = false;
    },
    toggleComponentTwo() {
      this.showCampaignRequestComp = !this.showCampaignRequestComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
      this.showDashboardComp = false;
      this.showReportedCampaignsComp = false;
    },
    toggleComponentThree() {
      this.showCampaignComp = !this.showCampaignComp;
      this.showCampaignRequestComp = false;
      this.showCampaignOrganizerRequestComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
      this.showDashboardComp = false;
      this.showReportedCampaignsComp = false;
    },
    toggleComponentFour() {
      this.showDonationTransactionComp = !this.showDonationTransactionComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showUsersComp = false;

      this.showDashboardComp = false;
      this.showReportedCampaignsComp = false;
    },
    toggleComponentFive() {
      this.showUsersComp = !this.showUsersComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;

      this.showDashboardComp = false;
      this.showReportedCampaignsComp = false;
    },
    toggleComponentSix(){
      this.showReportedCampaignsComp = !this.showReportedCampaignsComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;

      this.showDashboardComp = false;
      this.showUsersComp = false;
    }
  },
};
</script>

<style scoped>
.sub-title{
    font-size: xx-larger;
     font-weight: bold
}
</style>