<template>
    <v-footer light padless class="mt-15">
        <v-row>
            <v-col>
                <v-card flat tile class="lighten-1 white--text text-center">
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row class="mt-5">
                            <v-col cols="3"></v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="1">
                                <v-img :src="require('../../assets/img/logo/logo.png')" class="my-3" contain
                                    height="50" />
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="8">
                                <v-row>
                                    <v-col cols="3">
                                        <span class="font-weight-bold">Fundraise for</span>
                                        <v-row class="mt-1">
                                            <v-col>
                                                <router-link
                                                    :to="{ name: 'Search', params: { category: 1, categoryName: 'Medical & Health' }}">
                                                    <span class="font-weight-bold">Medical</span></router-link>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col style="margin: 0; padding: 0;">
                                                <router-link
                                                    :to="{ name: 'Search', params: { category: 4, categoryName: 'Schools & Education' }}">
                                                    <span class="font-weight-bold">Education</span></router-link>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <router-link
                                                    :to="{ name: 'Search', params: { category: 2, categoryName: 'Memorials & Funerals' }}">
                                                    <span class="font-weight-bold">Memorial</span></router-link>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col style="margin: 0; padding: 0;">
                                                <router-link
                                                    :to="{ name: 'Search', params: { category: 3, categoryName: 'NonProfit/Charity' }}">
                                                    <span class="font-weight-bold">Non Profit</span></router-link>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <v-col cols="3">
                                        <span class="font-weight-bold">Learn more</span>
                                        <v-row class="mt-1">
                                            <v-col>
                                                <span class="font-weight-bold">How It Works</span>
                                            </v-col>
                                        </v-row>
                                    </v-col>

                                    <v-col cols="3" class="font-weight-bold">
                                        <span>Resources</span>
                                        <v-row class="mt-1">
                                            <v-col>
                                                <span class="font-weight-bold">Abouts Us</span>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col style="margin: 0; padding: 0;">
                                                <span class="">Contact Us</span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="4"></v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-divider class="mt-5"></v-divider>

                    </v-card-text>

                    <v-card-text class="white--text-center">
                        {{ new Date().getFullYear() }} — <strong>Charity</strong>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-footer>
</template>