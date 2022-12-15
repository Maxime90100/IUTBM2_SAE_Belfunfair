<template>
  <div>
    <div style="margin: 10%; padding: 3%; background-color: #3f4545">
      <h1 style="color: white">{{$t('artiste.add')}}</h1>
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

        <h4>{{ $t('attribute.groupMember') }} ({{this.groupe.length}})</h4>
        <input id="groupe" type="text" required />
        <v-btn x-small @click="addMember()">{{ $t('artiste.addMember') }}</v-btn>
        <div v-for="(member,index) in groupe" :key="'prestataire-add-member-'+member">
          {{member}} <v-btn color="red" dark x-small @click="deleteMember(index)">{{ $t('button.delete') }}</v-btn>
        </div>


        <div style="margin-top: 10px">
          <v-btn dark type="button" v-on:click="add()">{{ $t('button.add') }}</v-btn>
          <v-btn type="button" v-on:click="goTo('/prestataire/artistes')">{{ $t('button.back') }}</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireAddArtiste",
  data:()=>{
    return{
      name:null,
      description:null,
      types:null,
      type:null,
      groupe:[],
      id_user:null
    }
  },
  methods:{
    goTo(path){this.$router.replace(path)},
    getData(){
      this.id_user = this.$store.state.user.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/typesArtiste'
      }).then(result=>{
        this.types = result.data.data
      }).catch(error=>{
        console.log(error)
      })
    },
    addMember(){this.groupe.push(document.querySelector('#groupe').value)},
    deleteMember(index){this.groupe.splice(index,1)},
    add(){
      let error = false

      if(!this.name){document.querySelector('#name').style.borderColor = 'red'; error = true}
      else{document.querySelector('#name').style.borderColor = 'green'}

      if(!this.description){document.querySelector('#description').style.borderColor = 'red'; error = true}
      else{document.querySelector('#description').style.borderColor = 'green'}

      if(!this.type){document.querySelector('#type').style.borderColor = 'red'; error = true}
      else{document.querySelector('#type').style.borderColor = 'green'}

      if(this.groupe.length === 0){document.querySelector('#groupe').style.borderColor = 'red'; error = true}
      else{document.querySelector('#groupe').style.borderColor = 'green'}

      if(!error){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/addArtiste',
          data: {
            name: this.name,
            description: this.description,
            type: this.type,
            groupe:this.groupe
          }
        }).then(result=>{
          this.goTo('/prestataire/artistes')
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