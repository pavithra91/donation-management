<template>
    <nav>
        <v-toolbar>
            <v-toolbar-title>
                <router-link to="/Home">
                    <v-img :src="require('../assets/img/logo/logo.png')" class="my-3" contain height="50" />
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>
                    <router-link to="/Home">Home</router-link>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn text>About</v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn text>Latest Causes</v-btn>
            </v-toolbar-items>
            <v-toolbar-items v-if="userName">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" text>
                            {{ userName }}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index" link>
                            <v-list-item-title @click="logout(item.title)">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
            <v-toolbar-items v-else>
                <v-btn text>
                    <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items>
                <v-btn x-large color="success" dark>Donate</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </nav>
</template>

<script>
export default {
    data() {
        if (!this.$session.exists()) {
            this.$router.push('/SignIn');
            return{
                userName: null,
                items: [
                    { title: 'Profile' },
                    { title: 'Watchlist' },
                    { title: 'Log Out' }
                ]
            }
        }
        else {
            return {
                userName: this.$session.get('user_name'),
                items: [
                    { title: 'Profile' },
                    { title: 'Watchlist' },
                    { title: 'Log Out' }
                ]
            }
        }
    },
    methods: {
        logout(name) {
            if (name == "Profile") {
                let id = this.$session.get('user_token');
                this.$router.push('/Profile/' + id);
            }
            else if(name=="Watchlist")
             {
                 this.$router.push('/Watchlist');
             }
            else {
                this.$session.destroy();
                this.$router.go('/SignIn');
            }

        }
    }
}
</script>