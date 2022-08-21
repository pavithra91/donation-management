<template>
  <v-container>
    <v-row>
      <v-col md="10" lg="8" offset-md="1" offset-lg="2">
        <v-row>
          <v-col>
            <label class="text-h3 font-weight-bold">Create Campaign</label>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="7" sm="12">
            <v-text-field v-model="campaignName" :rules="campaignNameRules" label="Campaign Name" required>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" sm="12">
            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateRangeText" label="Campaign Period" prepend-icon="mdi-calendar" readonly
                  v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="date" range>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="5" sm="12">
            <v-text-field v-model="goal" :rules="goalRules" label="Goal" suffix="LKR"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="3" sm="12">
            <v-text-field v-model="city" :rules="cityRules" label="City" required></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="3" sm="12">
            <v-select :items="proviceList" v-model="province" label="Province" :rules="provinceRules"></v-select>
          </v-col>
          <v-spacer></v-spacer>
          <v-col md="3" sm="12">
            <v-select :items="categoryItems" label="Category" :rules="categoryRules"></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-textarea counter outlined v-model="shortDescription" :rules="shortDescriptionRules" name="input-7-1"
              label="Short Description" value="" hint="Short Description about the Campaign"></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <vue-editor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="longDescription">
            </vue-editor>
          </v-col>
        </v-row>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '@/firebase';
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      modal: false,
      categoryItems: ['Medical & Health', 'Memorials & Funerals', 'NonProfit/Charity', 'Schools & Education', 'Pets & Animals', 'Disaster Relief', 'Clubs & Community', 'Sports & Teams', 'Creative Projects', 'Events', 'Kids & Family', 'LGBT'],
      categoryRules: [(v) => !!v || "Please select Category"],
      campaignName: "",
      campaignNameRules: [(v) => !!v || "Campaign Name required"],
      date: [new Date().toISOString().substr(0, 10)],
      goal: "",
      goalRules: [
        (v) => !!v || "Goal Amount required",
        (v) => v >= 500 || "Amount should be above 500 LKR",
      ],
      city: "",
      cityRules: [(v) => !!v || "City Name Name required"],
      province: "",
      proviceList: ['Western Province', 'Southern Province', 'Central Province', 'Eastern Province', 'Northern Province', 'North Western Province', 'North Central Province', 'Sabaragamuwa Province', 'Uva Province',],
      provinceRules: [(v) => !!v || "Please select Province"],
      shortDescription: "",
      shortDescriptionRules: [v => v.length <= 25 || 'Max 250 characters'],
      longDescription: "",
    }
  },
  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)


    },
  },
  computed: {
    dateRangeText() {
      return this.date.join(" ~ ");
    },
  }
}
</script>
