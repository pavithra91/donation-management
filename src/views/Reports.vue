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
                            <i class="fa fa-list fa-2x"></i>
                        </v-list-item-icon>
                        <v-list-item-title class="title">Transaction List</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>


            <v-container style="margin-left: 0px;">
                <CampaignOrganizerRequestComp v-if="showCampaignOrganizerRequestComp" />
                <CampaignRequesrComp v-if="showCampaignRequesrComp" />
            </v-container>

        </v-container>

    </v-container>

</template>


<script>
import CampaignOrganizerRequestComp from '@/components/CampaignOrganizerRequestComp.vue'
import CampaignRequesrComp from '@/components/CampaignRequesrComp.vue'
export default {
    name: 'Settings',
    components: {
        CampaignOrganizerRequestComp,
        CampaignRequesrComp
    },

    data() {
        return {
            showCampaignOrganizerRequestComp: false,
            showCampaignRequesrComp: false
        };
    },
    methods: {
    toggleComponentOne () {
      this.showCampaignOrganizerRequestComp = !this.showCampaignOrganizerRequestComp;
      this.showCampaignRequesrComp = false;
    },
    toggleComponentTwo () {
      this.showCampaignRequesrComp = !this.showCampaignRequesrComp;
      this.showCampaignOrganizerRequestComp = false;
    },

  }
}
</script>