<template>
    <v-container>
        <v-row class="my-5">
            <v-col offset-lg="1">
                <label class="text-h3">Browse </label> <label class="text-h3"> {{ categoryName }} fundraisers</label>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <CampaignComp :campaign="campaign" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CampaignComp from "@/components/layouts/CampaignComp.vue";
export default {
    props: ['category'],
    components: {
        CampaignComp
    },
    data() {
        return {
            categoryName: "Medical & Health",
            campaign: null
        }
    },
    mounted() {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            category: this.category,
        });

        var requestOptions = {
            method: "POST",
            mode: "cors",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:3000/api/campaign/getCampaignByCategory", requestOptions)
            .then(async (response) => {
                const resdata = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                }

                this.campaign = resdata.data;
            })
    }
}
</script>