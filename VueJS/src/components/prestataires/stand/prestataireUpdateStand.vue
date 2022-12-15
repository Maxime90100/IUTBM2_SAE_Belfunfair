<template>
  <div>
    <div style="background-color: #3f4545; margin: 10%; padding: 3%">
      <h1 style="color: white;">{{this.stand.name}}</h1>
      <form>
        <h4>{{ $t('attribute.name') }}</h4>
        <input id="name" style="background-color: white" v-model="name" type="text" required />

        <h4>{{ $t('attribute.description') }}</h4>
        <textarea v-model="description" type="text" required></textarea>

        <h4>{{ $t('attribute.type') }}</h4>
        <select v-model="type" style="background-color: white; width: 100%">
          <option v-for="(type,index) in types" :key="'prestataire-update-type-'+index" :value="type.id">
            {{type.libelle}}
          </option>
        </select>

        <div style="margin-top: 10px">
          <v-btn dark @click="update()">{{ $t('button.change') }}</v-btn>
          <v-btn @click="goTo('/prestataire/stands')">{{ $t('button.back') }}</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireUpdateStand",
  data:()=>{
    return{
      id_user:null,
      id:null,
      stand: {},
      name:null,
      description:null,
      types:null,
      type:null
    }
  },
  methods:{
    goTo(path){this.$router.replace(path)},
    getData(){
      this.id_user = this.$store.state.user.id
      this.id = this.$route.params.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/stand/'+this.id
      }).then(result=>{
        this.stand = result.data.data.stand
        this.types = result.data.data.types
        this.name = this.stand.name
        this.description = this.stand.description
        this.type = this.stand.type
      }).catch(error=>{
        console.log(error)
      })
    },
    update(){
      let error = false
      if(!this.name) {document.querySelector('#name').style.borderColor = 'red'; error=true}
      else document.querySelector('#name').style.borderColor = 'black'
      if(!error){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/stand/'+this.id+'/update',
          data: {
            name: this.name,
            description: this.description,
            type: this.type
          }
        }).then(result=>{
          this.$store.commit('setMessage',result.data)
          this.getData()
        }).catch(error=>{
          this.message = error
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