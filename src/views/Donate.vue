<template>
 <div class="main-container">
    <div class="sub-container">
      <div class="main-title"></div>

<v-row>
    <v-col>

    </v-col>
    <v-col>
 <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step
        :complete="e1 > 1"
        step="1"
      >
        Donation Amount
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="e1 > 2"
        step="2"
      >
        Name of step 2
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">
        Name of step 3
      </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color="#FAF9F6"
          height="200px"
        >
        
        <v-row align-content="center"
        justify="center">
        <v-col cols="2"></v-col>
            <v-col style="margin-top: 20px;">
                <v-btn-toggle
          v-model="toggle_exclusive"
          mandatory
        >
          <v-btn>
            100 LKR
          </v-btn>
          <v-btn>
            500 LKR
          </v-btn>
          <v-btn>
            1000 LKR
          </v-btn>
          <v-btn>
            5000 LKR
          </v-btn>
        </v-btn-toggle>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="2"></v-col>
            <v-col>
                <v-text-field prefix="LKR" value="100" class="text-h4"></v-text-field>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>

        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text >
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color="#FAF9F6"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text @click="e1 = 1">
          Back
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="#FAF9F6"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text @click="e1 = 2">
          Back
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
    </v-col>
    <v-col></v-col>
</v-row>
      

      </div>
 </div>
</template>


<script>
  export default {
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>

<style scoped>
.topfund {
  background: #ffffff;
}

.topfund-container {
  padding-top: 10px;
}
.main-title {
  padding-top: 100px;
  padding-bottom: 60px;
  font-size: 40px;
  font-weight: bold;
  margin-left: 41%;
}
</style>