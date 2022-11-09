<template>
    <v-container>
        <v-container>
            <v-navigation-drawer width="370px" style="margin-top: 65px;" color="#F9F6EE" permanent expand app>
                <v-divider></v-divider>
                <v-list>
                    <v-list-item style="margin: 20px;">
                        <v-list-item-title style="font-size: xx-large; font-weight: bold;">Reports</v-list-item-title>
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
                    <v-list-item @click="toggleComponentThree">
                        <v-list-item-icon>
                            <i class="fa fa-money-bill-1-wave fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Transaction List</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>


            <v-container style="margin-left: 0px;">
                <CampaignOrganizerRequestComp v-if="showCampaignOrganizerRequestComp" />
                <CampaignRequestComp v-if="showCampaignRequestComp" />
                <DonationTransactionComp v-if="showDonationTransactionComp" />
            </v-container>

        </v-container>

    </v-container>

</template>


<script>
import CampaignOrganizerRequestComp from '@/components/CampaignOrganizerRequestComp.vue'
import CampaignRequestComp from '@/components/Reports/CampaignRequestComp.vue'
import DonationTransactionComp from '@/components/Reports/DonationTransactionComp.vue'
export default {
    name: 'Settings',
    components: {
        CampaignOrganizerRequestComp,
        CampaignRequestComp,
        DonationTransactionComp
    },

    data() {
        return {
            showCampaignOrganizerRequestComp: false,
            showCampaignRequestComp: false,
            showDonationTransactionComp: false
        };
    },
    methods: {
    toggleComponentOne () {
      this.showCampaignOrganizerRequestComp = !this.showCampaignOrganizerRequestComp;
      this.showCampaignRequestComp = false;
      this.showDonationTransactionComp = false;
    },
    toggleComponentTwo () {
      this.showCampaignRequestComp = !this.showCampaignRequestComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showDonationTransactionComp = false;
    },
    toggleComponentThree () {
      this.showDonationTransactionComp = !this.showDonationTransactionComp;
      this.showCampaignOrganizerRequestComp = false;
      this.showCampaignRequestComp = false;
    },
  }
}
</script>