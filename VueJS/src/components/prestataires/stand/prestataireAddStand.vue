<template>
  <div>
    <div style="margin: 10%; padding: 3%; background-color: #3f4545">
      <h1 style="color: white">{{$t('stand.add')}}</h1>
      <form>
        <h4>{{ $t('attribute.name') }}</h4>
        <input id="name" v-model="name" type="text" required />

        <h4>{{ $t('attribute.description') }}</h4>
        <textarea id="description" v-model="description" type="text" required />

        <h4>{{ $t('attribute.type') }}</h4>
        <select id="type" v-model="type" style="background-color: white; width: 100%">
          <option v-for="(type,index) in types" :key="'prestataire-add-typeStand-'+index" :value="type.id">
            {{type.libelle}}
          </option>
        </select>

        <div style="margin-top: 10px">
          <v-btn dark type="button" v-on:click="add()">{{ $t('button.add') }}</v-btn>
          <v-btn type="button" v-on:click="goTo('/prestataire/stands')">{{ $t('button.back') }}</v-btn>
        </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireAddStand",
  data:()=>{
    return{
      name:null,
      description:null,
      types:null,
      type:null,
      id_user:null
    }
  },
  methods:{
    goTo(path){this.$router.replace(path)},
    getData(){
      this.id_user = this.$store.state.user.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/typesStand'
      }).then(result=>{
        this.types = result.data.data
      }).catch(error=>{
        console.log(error)
      })
    },
    add(){
      let error = false

      if(!this.name){document.querySelector('#name').style.borderColor = 'red'; error = true}
      else{document.querySelector('#name').style.borderColor = 'green'}

      if(!this.description){document.querySelector('#description').style.borderColor = 'red'; error = true}
      else{document.querySelector('#description').style.borderColor = 'green'}

      if(this.type === null){document.querySelector('#type').style.borderColor = 'red'; error = true}
      else{document.querySelector('#type').style.borderColor = 'green'}

      if(!error){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/addStand',
          data: {
            name: this.name,
            description: this.description,
            type: this.type
          }
        }).then(result=>{
          this.goTo('/prestataire/stands')
          this.$store.commit('setMessage',result.data)
        }).catch(error=>{
          console.log(error)
        })
      }
    }
  },
  mounted(){this.getData()}
}
</script>
<style>
input,select,textarea{
  border: solid 2px;
  background-color: white;
  width: 100%;
}
</style>