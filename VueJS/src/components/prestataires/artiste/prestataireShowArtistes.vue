<template>
  <div style="margin: 5%">
    <v-btn dark @click="add()">{{$t('button.add')}}</v-btn>
    <div v-for="(artiste,index) in artistes" :key="'prestataire-artiste-'+index">
      <div style="background-color: #3f4545; color: white; margin: 2%; padding: 2%">
        <h1>{{artiste.name}}</h1>

        <div style="text-align: center">
          <v-menu dark>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" color="white"><v-icon>mdi-account</v-icon></v-btn>
            </template>
            <v-list>
              <v-list-item v-for="name in artiste.groupe.split(',')" :key="'prestataire-artiste-'+name">{{ name }}</v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div style="text-align: center">
          <h4 v-if="artiste.status === 'attributed'" style="color: green">{{$t('status.attributed')}} <br> {{artiste.date}} [{{artiste.starthour}} - {{artiste.endhour}}]</h4>
          <h4 v-if="artiste.status === 'wait_attribution'" style="color: orange">{{$t('status.wait_attribution')}} <br> {{artiste.date}} [{{artiste.starthour}} - {{artiste.endhour}}]</h4>
          <h4 v-if="artiste.status === 'not_attributed'" style="color: red">{{$t('status.not_attributed')}}</h4>
          <h5 v-if="artiste.cancel" style="color: skyblue">{{$t('button.cancelSignupInProgress')}}</h5>
        </div>

        <h2>- {{artiste.type}} -</h2>

        <p style="text-align: justify; padding: 2%">{{artiste.description}}</p>

        <div style="text-align: center">
          <v-btn fab small dark v-if="artiste.status === 'not_attributed'" @click="update(artiste.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn class="ma-3" fab small outlined color="red" @click="_delete(artiste.id)"><v-icon>mdi-delete</v-icon></v-btn>
          <v-btn rounded @click="signup(artiste.id)">{{$t('button.signup')}}</v-btn>
        </div>

        <!--
        <div v-for="(image,index) in artiste.images" :key="'prestataire-artiste-image-'+index">
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
  name: "prestataireShowArtistes",
  data:()=>{
    return{
      id_user:null,
      artistes:[]
    }
  },
  methods:{
    getData(){
      this.id_user = this.$store.state.user.id
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste'
      }).then(result=>{
        this.artistes = result.data
      }).catch(error=>{
        console.log(error)
      })
    },
    add(){this.$router.replace('/prestataire/artistes/add')},
    update(id){this.$router.replace('/prestataire/artistes/'+id)},
    _delete(id){
      if(confirm(this.$t('confirm.delete'))){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste/'+id+'/delete'
        }).then(result=>{
          this.$store.commit('setMessage',result.data)
        }).catch(error=>{
          console.log(error)
        })
      }
    },
    signup(id){this.$router.replace('/prestataire/artistes/'+id+'/signup')}
  },
  updated(){this.getData()},
  mounted(){this.getData()}
}
</script>