<template>
  <div>
    <h1>{{ $t('button.login') }}</h1>
    <h3>{{ $t('login.description') }}</h3>

    <form>
      <h4>{{ $t('attribute.firstname') }}</h4>
      <input id="firstname" v-model="firstname" type="text" required />

      <h4>{{ $t('attribute.surname') }}</h4>
      <input id="surname" v-model="surname" type="text" required />

      <h4>{{ $t('attribute.password') }}</h4>
      <input id="password" v-model="password" type="password" required />

      <v-btn class="btn btn-dark" type="button" v-on:click="login">{{ $t('button.login') }}</v-btn>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userLogin",
  data:()=>({
    firstname:null,
    surname:null,
    password:null
  }),
  methods:{
    login(){
      let error = false
      if(!this.firstname) {document.querySelector('#firstname').style.borderColor = 'red';error=true}
      else document.querySelector('#firstname').style.borderColor = 'black'
      if(!this.surname) {document.querySelector('#surname').style.borderColor = 'red';error=true}
      else document.querySelector('#surname').style.borderColor = 'black'
      if(!this.password) {document.querySelector('#password').style.borderColor = 'red';error=true}
      else document.querySelector('#password').style.borderColor = 'black'
      if(!error){
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
          this.$store.commit('setMessage', {success:data.success,data:data.message})
          if(data.data.length !== 0){
            this.$store.commit('setUser',data.data)
            this.$router.replace('/'+data.data.role)
          }
        }).catch(error=>{
          console.log(error)
        })
      }
    }
  },
  mounted(){
    let user = this.$store.state.user
    if(user) this.$router.replace('/'+user.role)
  }
}
</script>