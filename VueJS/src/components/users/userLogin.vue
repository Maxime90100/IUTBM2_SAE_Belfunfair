<template>
  <div>
    <div style="background-color: red; text-align: center">
      {{this.message}}
    </div>
    <h1>{{ $t('button.login') }}</h1>
    <h3>{{ $t('login.description') }}</h3>

    <form>
      <h4>{{ $t('attribute.firstname') }}</h4>
      <input v-model="firstname" type="text" required />

      <h4>{{ $t('attribute.surname') }}</h4>
      <input v-model="surname" type="text" required />

      <h4>{{ $t('attribute.password') }}</h4>
      <input v-model="password" type="password" required />

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
    password:null,
    message:null
  }),
  methods:{
    login(){
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
        this.message = data.message
        if(data.data.length !== 0){
          this.$store.commit('setUser',data.data)
          this.$router.replace('/'+data.data.role)
        }
      }).catch(error=>{
        this.message = error
      })
    }
  },
  mounted(){
    let user = this.$store.state.user
    if(user) this.$router.replace('/'+user.role)
  }
}
</script>