<template>
  <v-container>
    <v-container>
      <v-navigation-drawer
        width="300px"
        style="margin-top: 65px"
        color="#f4f5fa"
        permanent
        expand
        app
      >
        <v-divider></v-divider>
        <v-list>
          <v-list-item style="margin: 20px">
            <v-list-item-title style="font-size: xx-large; font-weight: bold"
              >Settings</v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="toggleComponentOne">
            <v-list-item-icon>
              <v-icon color="white" small>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title">Donation Rules</v-list-item-title>
          </v-list-item>
          <v-list-item @click="toggleComponentTwo">
            <v-list-item-icon>
              <v-icon color="white" small>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title"
              >Contribution Levels</v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="toggleComponentThree">
            <v-list-item-icon>
              <v-icon color="white" small>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title">Donation Badges</v-list-item-title>
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-list-item style="margin: 20px">
            <v-list-item-title style="font-size: xx-large; font-weight: bold"
              >Logs</v-list-item-title
            >
          </v-list-item>

          <v-list-item @click="toggleComponentOne">
            <v-list-item-icon>
              <v-icon color="white" small>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title">System Logs</v-list-item-title>
          </v-list-item>

          <v-list-item @click="toggleComponentFive">
            <v-list-item-icon>
              <v-icon color="white" small>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="title"
              >User Logs</v-list-item-title
            >
          </v-list-item>

          <v-divider class="my-5"></v-divider>

          <v-list-item style="margin: 20px">
            <router-link :to="{ name: 'Reports' }"
              ><label>
                <v-list-item-title
                  style="font-size: xx-large; font-weight: bold"
                  >Reports
                </v-list-item-title></label
              ></router-link
            >
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-container style="margin-left: 0px">
        <DonationRulesComp v-if="showDonationRulesComp" />
        <ContributionLevelsComp v-if="showContributionLevelsComp" />
        <DonationBadgesComp v-if="showDonationBadgesComp" />
      </v-container>
    </v-container>
  </v-container>
</template>


<script>
import DonationRulesComp from "@/components/DonationRulesComp.vue";
import ContributionLevelsComp from "@/components/ContributionLevelsComp.vue";
import DonationBadgesComp from "@/components/DonationBadgesComp.vue";

import UserLogsComp from "@/components/Reports/UserLogsComp.vue";
export default {
  name: "Settings",
  components: {
    DonationRulesComp,
    ContributionLevelsComp,
    DonationBadgesComp,
    UserLogsComp,
  },

  data() {
    return {
      showDonationRulesComp: false,
      showContributionLevelsComp: false,
      showDonationBadgesComp: false,
      showUserLogsComp: false,
    };
  },
  methods: {
    toggleComponentOne() {
      this.showDonationRulesComp = !this.showDonationRulesComp;
      this.showContributionLevelsComp = false;
      this.showDonationBadgesComp = false;
      this.showUserLogsComp = false;
    },
    toggleComponentTwo() {
      this.showContributionLevelsComp = !this.showContributionLevelsComp;
      this.showDonationRulesComp = false;
      this.showDonationBadgesComp = false;
      this.showUserLogsComp = false;
    },
    toggleComponentThree() {
      this.showDonationBadgesComp = !this.showDonationBadgesComp;
      this.showContributionLevelsComp = false;
      this.showDonationRulesComp = false;
      this.showUserLogsComp = false;
    },
    toggleComponentFive() {
      this.showUserLogsComp = !this.showUserLogsComp;
      this.showContributionLevelsComp = false;
      this.showDonationRulesComp = false;
      this.showDonationBadgesComp = false;
    },
  },
};
</script>