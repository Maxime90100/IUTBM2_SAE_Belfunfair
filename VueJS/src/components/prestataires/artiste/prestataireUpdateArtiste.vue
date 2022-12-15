<template>
  <div>
    <div style="background-color: #3f4545; margin: 10%; padding: 3%">
      <h1 style="color: white;">{{this.artiste.name}}</h1>
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

        <h4>{{ $t('attribute.groupMember') }} ({{this.groupe.length}})</h4>
        <input id="groupe" type="text" required />
        <v-btn x-small @click="addMember()">{{ $t('artiste.addMember') }}</v-btn>
        <div v-for="(member,index) in groupe" :key="'prestataire-add-member-'+member">
          {{member}} <v-btn color="red" dark x-small @click="deleteMember(index)">{{ $t('button.delete') }}</v-btn>
        </div>

        <div style="margin-top: 10px">
          <v-btn dark @click="update()">{{ $t('button.change') }}</v-btn>
          <v-btn @click="goTo('/prestataire/artistes')">{{ $t('button.back') }}</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireUpdateArtiste",
  data:()=>{
    return{
      id_user:null,
      id:null,
      artiste: {},
      name:null,
      description:null,
      types:null,
      type:null,
      groupe:[]
    }
  },
  methods:{
    goTo(path){this.$router.replace(path)},
    getData(){
      this.id_user = this.$store.state.user.id
      this.id = this.$route.params.id
      this.groupe = []
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste/'+this.id
      }).then(result=>{
        this.artiste = result.data.data.artist
        this.types = result.data.data.types
        this.name = this.artiste.name
        this.description = this.artiste.description
        this.type = this.artiste.type
        let members = this.artiste.groupe.split(',')
        members.forEach(m=>{this.groupe.push(m)})
      }).catch(error=>{
        console.log(error)
      })
    },
    addMember(){this.groupe.push(document.querySelector('#groupe').value)},
    deleteMember(index){this.groupe.splice(index,1)},
    update(){
      let error = false
      if(!this.name) {document.querySelector('#name').style.borderColor = 'red'; error=true}
      else document.querySelector('#name').style.borderColor = 'black'
      if (this.groupe.length === 0 || this.taille<0) {document.querySelector('#groupe').style.borderColor = 'red'; error=true}
      else document.querySelector('#groupe').style.borderColor = 'black'
      if(!error){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/' + this.id_user + '/artiste/' + this.id + '/update',
          data: {
            name: this.name,
            description: this.description,
            type: this.type,
            groupe: this.groupe.toString()
          }
        }).then(result => {
          this.$store.commit('setMessage', result.data)
          this.getData()
        }).catch(error => {
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