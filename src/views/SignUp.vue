<template>
<div class="main-container">
<div class="sub-container">
    <v-card class="mx-auto" max-width="600" >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

<div class="main-title">
      Sign Up
</div>

<hr class="line-break" />




<v-form ref="form" v-model="valid" lazy-validation @submit.prevent="formSubmit">
  <v-container>
      <v-row class="name">
          <v-col cols="12" md="5" >
          <v-text-field v-model="firstname" :rules="firstNameRules" label="First name" required></v-text-field>
          </v-col>
          <v-col cols="12" md="5" >
          <v-text-field v-model="lastname" :rules="lastNameRules" label="Last name" required></v-text-field>
          </v-col>
      </v-row>
      <v-row class="email">
        <v-col cols="12" sm="2" >
        </v-col>
        <v-col cols="12" md="8" >
        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
    
        </v-col>
      </v-row>
      <v-row class="password">
        <v-col cols="12" md="2" >
        </v-col>
        <v-col cols="12" md="8" >
    <v-text-field v-model="password" :rules="passwordRules" label="Password" required ></v-text-field>
        </v-col>
</v-row>
<v-row class="usertype">
    <v-col cols="12" md="3" >
        Sign Up as?
    </v-col>
    <v-col cols="12" md="5" class="usertype-radio" >
    <v-radio-group v-model="row" row class="usertype-radio">
      <v-radio label="Donor" value="donor"></v-radio>
      <v-radio label="Event Organizor" value="organizor" class="radio-item"></v-radio>
    </v-radio-group>
    </v-col>
</v-row>

<v-row>
  <v-col cols="12" md="4">
        </v-col>
          <v-col cols="1" md="1" >
        </v-col>
        <v-col cols="12" md="4" >
    <v-btn class="mr-3" type="submit" color="success">
        Resgiter
      </v-btn>
    </v-col>
</v-row>
      
  </v-container>
  </v-form>

  <hr class="line-break"/>
  <br />

  </v-card>
</div>
</div>
</template>

<style scoped>
.main-container{
    background: #fbf8f6;
}
.main-container{
    margin-top: 80px;
    background: #ffffff;
}
.main-title{
  margin-left: 41%;
  margin-top: 20px;
  color: #072366;
    font-size: 40px;
    font-weight: bold;
}
.line-break{
  margin: 20px;
}
.main-footer{
  margin-left: 41%;
  margin-top: px;
}
.name{
    margin-left: 16%;
}
.email{
    margin-left: 0px;
}
.password{
    margin-left: 0px;
}
.usertype{
    margin-left: 18%;
}
.usertype-radio{
    margin: 10px;
    padding: 0px;
}
.radio-item
{
    margin-top: 10px;
}
</style>

<script>
  export default {
    data: () => ({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      usertype: '',

      valid: true,
      firstname: '',
      firstNameRules: [
        v => !!v || 'First Name required',
      ],
      lastname: '',
      lastNameRules: [
        v => !!v || 'Last Name required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      formSubmit(){
          console.log('Firstname', this.firstname)
          console.log('Last name', this.lastname)
          console.log('email', this.email)
          console.log('password', this.password)
          console.log('firstname', this.usertype)
          console.log('form submit')
      }
    },
  }
</script>