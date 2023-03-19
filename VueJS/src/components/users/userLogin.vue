<template>
  <div>
    <div id="login">
      <h1>{{ $t('button.login') }}</h1>

      <h4>{{ $t('attribute.firstname') }}</h4>
      <input id="firstname" v-model="firstname" type="text" required />

      <h4>{{ $t('attribute.surname') }}</h4>
      <input id="surname" v-model="surname" type="text" required />

      <h4>{{ $t('attribute.password') }}</h4>
      <input id="password" v-model="password" type="password" required />

      <v-btn class="btn btn-dark ma-1" type="button" v-on:click="login">{{ $t('button.login') }}</v-btn>
      <v-btn class="btn btn-dark ma-1" type="button" v-on:click="signup">{{ $t('button.signup') }}</v-btn>
    </div>

    <div id="signup">
      <h1>{{$t('attribute.signup')}}</h1>

      <h4>{{ $t('attribute.password') }} (confirm)</h4>
      <input id="password2" v-model="password2" type="password" required />

      <h4>{{ $t('attribute.email') }}</h4>
      <input id="email" v-model="email" type="email" required />

      <v-btn class="btn btn-dark ma-1" small type="button" v-on:click="signupPost">{{ $t('button.signup') }}</v-btn>
    </div>

    <div id="social">
      <h1>{{$t('button.socialLogin')}}</h1>
      <v-btn v-on:click="google">
        <img src="@/assets/img/google_icon.png" width="20px" height="20px">
        Google
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {getGoogleUrl} from "@/utils/getGoogleUrl";

export default {
  name: "userLogin",
  data:()=>({
    firstname:null,
    surname:null,
    password:null,
    password2:null,
    email:null
  }),
  methods:{
    getGoogleUrl,
    signup(){
      document.querySelector('#signup').style.display = 'block'
    },
    signupPost(){
      if(this.validateLogin() && this.validateSignup()){
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/signup',
          data: {
            firstname: this.firstname,
            surname: this.surname,
            password: this.password,
            email: this.email
          }
        }).then(result=>{
          location.reload()
          this.$store.commit('setMessage', {success:1,data:result.data.data.data})
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    login(){
      if(this.validateLogin()){
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            firstname: this.firstname,
            surname: this.surname,
            password: this.password
          }
        }).then(result=>{
          let data = result.data.data
          let token = result.data.data.token
          axios.defaults.headers.common['Authorization'] = token
          this.$store.commit('setMessage', {success:data.success,data:data.message})
          if(data.data.length !== 0){
            this.$store.commit('setUser',data.data)
            let role = data.data.role
            if(role === 'user') this.$router.replace('/')
            else this.$router.replace('/'+data.data.role)
          }
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    validateLogin(){
      let valid = true
      if(!this.firstname) {document.querySelector('#firstname').style.borderColor = 'red';valid=false}
      else document.querySelector('#firstname').style.borderColor = 'black'
      if(!this.surname) {document.querySelector('#surname').style.borderColor = 'red';valid=false}
      else document.querySelector('#surname').style.borderColor = 'black'
      if(!this.password) {document.querySelector('#password').style.borderColor = 'red';valid=false}
      else document.querySelector('#password').style.borderColor = 'black'
      return valid
    },
    validateSignup(){
      let valid = true
      if(!this.password2 || this.password !== this.password2) {document.querySelector('#password2').style.borderColor = 'red'; valid=false}
      else document.querySelector('#password2').style.borderColor = 'black'
      if(!this.email || !this.email.includes("@")) {document.querySelector('#email').style.borderColor = 'red'; valid=false}
      else document.querySelector('#email').style.borderColor = 'black'
      return valid
    },
    google(){
      document.location.href = getGoogleUrl('http://localhost:8080/login')
    }
  },
  mounted(){
    let user = this.$store.state.user
    if(user && user.role !== 'user') this.$router.replace('/'+user.role)
  }
}
</script>
<style scoped>
#signup, #login, #social{
  width: 80vw;
  margin: 10px 10vw;
  padding: 10px;
  border-radius: 20px;
}
#login{
  background-image: linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%);
  color: #3B3B3BFF;
}
#signup{
  display: none;
  background-image: linear-gradient(to top, #1f1f1f 0%, #3b3b3b 52%, #494949 100%);
  color: white;
}
#social{
  border: 10px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  text-align: center;
}
#social > h1{
  background-image: linear-gradient(60deg, #E21143, #FFB03A);
  background-clip: text;
  color: transparent;
}
input{
  border-radius: 10px;
  border-color: white;
  margin-bottom: 10px;
}
</style>