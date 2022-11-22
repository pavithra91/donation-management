<template>
     <v-card flat>
                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md6>
                            <div class="caption grey--text" style="margin-bottom: 0px; padding-bottom: 0px;">Contribution Name
                            </div>
                            <div style="width: 400px;">
                                <v-text-field style="margin-top: 0; padding-top: 0;"></v-text-field>
                            </div>
                        </v-flex>
                        <v-flex xs12 md6>
                            <div class="caption grey--text" style="margin-bottom: 0px; padding-bottom: 0px;">Points
                            </div>
                            <div style="width: 400px;">
                                <v-text-field style="margin-top: 0; padding-top: 0;"></v-text-field>
                            </div>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md6>
                            <div class="caption grey--text" style="margin-bottom: 0px; padding-bottom: 0px;">Min Points
                            </div>
                            <div style="width: 400px;">
                                <v-text-field style="margin-top: 0; padding-top: 0;"></v-text-field>
                            </div>
                        </v-flex>
                        <v-flex xs12 md6>
                            <div class="caption grey--text" style="margin-bottom: 0px; padding-bottom: 0px;">Max Points
                            </div>
                            <div style="width: 400px;">
                                <v-text-field style="margin-top: 0; padding-top: 0;"></v-text-field>
                            </div>
                        </v-flex>
                    </v-layout>

                    <v-layout row wrap class="pa-3">
                        <v-flex xs12 md6>
                        </v-flex>
                        <v-flex xs12 md6>
                            <div class="caption grey--text" style="margin-bottom: 0px; padding-bottom: 0px;">
                                <v-btn>Add Rule</v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-card>
</template>