<template>
    <v-container class="mx-0">
        <v-container class="my-10 mx-0">
            <v-navigation-drawer width="300px" class="my-16" color="#F9F6EE" permanent expand app>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item class="my-5">
                        <v-list-item-title style="font-size: xx-large; font-weight: bold;">Approvals</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="toggleComponentOne">
                        <v-list-item-icon>
                            <i class="fa fa-users fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Campaign Organizer Request</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="toggleComponentTwo">
                        <v-list-item-icon>
                            <i class="fa fa-list fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Campaign Request</v-list-item-title>
                    </v-list-item>
                    <v-divider class="my-2"></v-divider>
                    <v-list-item class="my-5">
                        <v-list-item-title style="font-size: xx-large; font-weight: bold;">Reports</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="toggleComponentThree">
                        <v-list-item-icon>
                            <i class="fa fa-chart-simple fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Campaign Report</v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="toggleComponentFour">
                        <v-list-item-icon>
                            <i class="fa fa-money-bill-1-wave fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Transaction Report</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="toggleComponentFive">
                        <v-list-item-icon>
                            <i class="fa fa-user fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">User Report</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>


            <v-container>
                <CampaignOrganizerRequestComp v-if="showCampaignOrganizerRequestComp" />
                <CampaignRequestComp v-if="showCampaignRequestComp" />
                <CampaignComp v-if="showCampaignComp" />
                <DonationTransactionComp v-if="showDonationTransactionComp" />
                <UsersComp v-if="showUsersComp" />
            </v-container>

        </v-container>

    </v-container>

</template>


<script>
import CampaignOrganizerRequestComp from '@/components/CampaignOrganizerRequestComp.vue'
import CampaignRequestComp from '@/components/Reports/CampaignRequestComp.vue'
import CampaignComp from '@/components/Reports/CampaignComp.vue'
import DonationTransactionComp from '@/components/Reports/DonationTransactionComp.vue'
import UsersComp from '@/components/Reports/UsersComp.vue'
export default {
    name: 'Settings',
    components: {
        CampaignOrganizerRequestComp,
        CampaignRequestComp,
        CampaignComp,
        DonationTransactionComp,
        UsersComp
    },

    data() {
        return {
            showCampaignOrganizerRequestComp: false,
            showCampaignRequestComp: false,
            showCampaignComp: false,
            showDonationTransactionComp: false,
            showUsersComp: false
        };
    },
    methods: {
    toggleComponentOne () {
      this.showCampaignOrganizerRequestComp = !this.showCampaignOrganizerRequestComp;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
    },
    toggleComponentTwo () {
      this.showCampaignRequestComp = !this.showCampaignRequestComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
    },
    toggleComponentThree () {
      this.showCampaignComp = !this.showCampaignComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showDonationTransactionComp = false;
      this.showUsersComp = false;
    },
    toggleComponentFour () {
      this.showDonationTransactionComp = !this.showDonationTransactionComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showUsersComp = false;
    },
    toggleComponentFive () {
      this.showUsersComp = !this.showUsersComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
      this.showCampaignComp = false;
      this.showDonationTransactionComp = false;
    }
  }
}
</script>