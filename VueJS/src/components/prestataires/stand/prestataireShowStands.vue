<template>
  <div style="margin: 5%">
    <v-btn dark @click="add()">{{$t('button.add')}}</v-btn>
    <div v-for="(stand,index) in stands" :key="'prestataire-stand-'+index">
      <div style="background-color: #3f4545; color: white; margin: 2%; padding: 2%">
        <h1>{{stand.name}}</h1>

        <div style="text-align: center">
          <h4 v-if="stand.status === 'attributed'" style="color: green">{{$t('status.attributed')}} ({{stand.datedebut}} - {{stand.datefin}})</h4>
          <h4 v-if="stand.status === 'wait_attribution'" style="color: orange">{{$t('status.wait_attribution')}} ({{stand.datedebut}} - {{stand.datefin}})</h4>
          <h4 v-if="stand.status === 'not_attributed'" style="color: red">{{$t('status.not_attributed')}}</h4>
          <h5 v-if="stand.cancel" style="color: skyblue">{{$t('button.cancelSignupInProgress')}}</h5>
        </div>

        <h2>- {{stand.type}} -</h2>

        <p style="text-align: justify; padding: 2%">{{stand.description}}</p>

        <div style="text-align: center">
          <v-btn fab small dark v-if="stand.status === 'not_attributed'" @click="update(stand.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn class="ma-3" fab small outlined color="red" @click="_delete(stand.id)"><v-icon>mdi-delete</v-icon></v-btn>
          <v-btn rounded @click="signup(stand.id)">{{$t('button.signup')}}</v-btn>
        </div>

        <!--
        <div v-for="(image,index) in stand.images" :key="'prestataire-manege-image-'+index">
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
  name: "prestataireShowStands",
  data:()=>{
    return{
      id_user:null,
      stands:[]
    }
  },
  methods:{
    getData(){
      this.id_user = this.$store.state.user.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/stand'
      }).then(result=>{
        this.stands = result.data
      }).catch(error=>{
        console.log(error)
      })
    },
    add(){this.$router.replace('/prestataire/stands/add')},
    update(id){this.$router.replace('/prestataire/stands/'+id)},
    _delete(id){
      if(confirm(this.$t('confirm.delete'))){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/stand/'+id+'/delete'
        }).then(result=>{
          this.$store.commit('setMessage',result.data)
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    signup(id){this.$router.replace('/prestataire/stands/'+id+'/signup')}
  },
  updated(){this.getData()},
  mounted(){this.getData()}
}
</script>