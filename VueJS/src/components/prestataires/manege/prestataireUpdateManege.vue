<template>
  <div>
    <div style="background-color: #3f4545; margin: 10%; padding: 3%">
      <h1 style="color: white;">{{this.manege.name}}</h1>
      <form>
        <h4>{{ $t('attribute.name') }}</h4>
        <input id="name" style="background-color: white" v-model="name" type="text" required />

        <h4>{{ $t('attribute.description') }}</h4>
        <v-textarea solo v-model="description" type="text" required />

        <h4>{{ $t('attribute.type') }}</h4>
        <select id="type" v-model="type" style="background-color: white; width: 100%">
          <option v-for="(type,index) in types" :key="'prestataire-update-type-'+index" :value="type.id">
            {{type.libelle}}
          </option>
        </select>

        <h4>{{ $t('attribute.taille') }}</h4>
        <input v-model="taille" type="text" required />

        <v-btn dark @click="update()">{{ $t('button.change') }}</v-btn>
        <v-btn @click="goTo('/prestataire/maneges')">{{ $t('button.back') }}</v-btn>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireUpdateManege",
  data:()=>{
    return{
      id_user:null,
      id:null,
      manege: {},
      name:null,
      description:null,
      types:null,
      type:null,
      taille:null
    }
  },
  methods:{
    goTo(path){this.$router.replace(path)},
    update(){
      let error = false
      if(!this.name) {document.querySelector('#name').style.backgroundColor = 'red'; error=true}
      if (!this.type) {document.querySelector('#type').style.backgroundColor = 'red'; error=true}
      if(!error){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/' + this.id_user + '/manege/' + this.id + '/update',
          data: {
            name: this.name,
            description: this.description,
            type: this.type,
            taille_min: this.taille
          }
        }).then(result => {
          this.$store.commit('setMessage', result.data)
        }).catch(error => {
          this.message = error
          console.log(error)
        })
      }
    }
  },
  mounted(){
    this.id_user = this.$store.state.user.id
    this.id = this.$route.params.id
    axios({
      method: 'get',
      url: 'http://localhost:3000/prestataires/'+this.id_user+'/manege/'+this.id
    }).then(result=>{
      this.manege = result.data.data.manege
      this.types = result.data.data.types
      this.name = this.manege.name
      this.description = this.manege.description
      this.type = this.manege.type
      this.taille = this.manege.taille_min
    }).catch(error=>{
      console.log(error)
    })
  }
}
</script>