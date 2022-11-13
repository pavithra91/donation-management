<template>
  <v-app class="grey lighten-4">
    <NavBar />
    <v-main style="padding: 0;">
      <v-main>
        <router-view/>
      </v-main>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/layouts/Footer'
export default {
  name: 'App',
  components: {NavBar, Footer},
  data: () => ({
    //
  }),
};
</script>
