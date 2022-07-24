<template>
  <div id="app">
    <vue-editor
      id="editor"
      useCustomImageHandler
      @image-added="handleImageAdded"
      v-model="htmlForEditor"
    >
    </vue-editor>

      <v-btn @click="handleSavingContent()"> Save </v-btn>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from '@/firebase'
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      //content: "<h3>Initial Content</h3>",
      htmlForEditor: "<h3>Initial Content</h3>"
    };
  },

  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

const storage2 = getStorage();

      console.log(file);

      const storageRef = ref(storage2, 'CampaignImages/o2NbDwMnNhLjBeIYzghi/' + file.name);
      const metadata = {
        contentType: 'image/jpeg'
      };

      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        getDownloadURL(storageRef)
          .then((url) => {
            this.imgSrc = url;
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
          })
      });
    },
    handleSavingContent() {
      console.log(this.htmlForEditor);
    }
  }
};
</script>