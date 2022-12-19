<template>
  <div style="margin: 5%">
    <v-btn dark @click="add()">{{$t('button.add')}}</v-btn>
    <div v-for="(manege,index) in maneges" :key="'prestataire-manege-'+index">
      <div style="background-color: #3f4545; color: white; margin: 2%; padding: 2%">
        <h1>{{manege.name}}</h1>

        <div style="text-align: center">
          <h4 v-if="manege.status === 'attributed'" style="color: green">{{$t('status.attributed')}} ({{manege.datedebut}} - {{manege.datefin}})</h4>
          <h4 v-if="manege.status === 'wait_attribution'" style="color: orange">{{$t('status.wait_attribution')}} ({{manege.datedebut}} - {{manege.datefin}})</h4>
          <h4 v-if="manege.status === 'not_attributed'" style="color: red">{{$t('status.not_attributed')}}</h4>
          <h5 v-if="manege.cancel" style="color: skyblue">{{$t('button.cancelSignupInProgress')}}</h5>
        </div>

        <h2>- {{manege.type}} -</h2>

        <h3 v-if="manege.taille_min">{{$t('attribute.taille')}}: {{manege.taille_min}}</h3>

        <p style="text-align: justify; padding: 2%">{{manege.description}}</p>

        <div style="text-align: center">
          <v-btn fab small dark v-if="manege.status === 'not_attributed'" @click="update(manege.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn class="ma-3" fab small outlined color="red" @click="_delete(manege.id)"><v-icon>mdi-delete</v-icon></v-btn>
          <v-btn rounded @click="signup(manege.id)">{{$t('button.signup')}}</v-btn>
        </div>

        <!--
        <div v-for="(image,index) in manege.images" :key="'prestataire-manege-image-'+index">
          <img :src="image">
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "prestataireShowManeges",
  data:()=>{
    return{
      id_user:null,
      maneges:[]
    }
  },
  methods:{
    getData(){
      this.id_user = this.$store.state.user.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/manege'
      }).then(result=>{
        this.maneges = result.data
      }).catch(error=>{
        console.log(error)
      })
    },
    add(){
      this.$router.replace('/prestataire/maneges/add')
    },
    update(id){
      this.$router.replace('/prestataire/maneges/'+id)
    },
    _delete(id){
      if(confirm(this.$t('confirm.delete'))){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/manege/'+id+'/delete'
        }).then(result=>{
          this.$store.commit('setMessage',result.data)
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    signup(id){this.$router.replace('/prestataire/maneges/'+id+'/signup')}
  },
  updated(){this.getData()},
  mounted(){this.getData()}
}
</script>