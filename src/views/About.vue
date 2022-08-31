<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="6">
                <v-card class="mx-auto">
                    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

                    <v-row class="my-5">
                        <v-spacer></v-spacer>
                        <v-col cols="4" class="shrink d-flex justify-center align-center">
                            <label class="main-title">Sign in</label>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>

                    <v-divider class="mx-10"> </v-divider>

                    <v-row class="my-5"> </v-row>
                    
                    <SignInComp />

                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import SignInComp from "@/components/layouts/SignInComp.vue";

export default {
    components: {
        SignInComp
    },
    data() {
        return {
            currentTab: 'SignInComp',
            tabs: ['SignInComp', 'PosForgetPasswordts']
        }
    }
}
</script>


<style scoped>
.main-title {
    color: #072366;
    font-size: 40px;
    font-weight: bold;
}
</style>