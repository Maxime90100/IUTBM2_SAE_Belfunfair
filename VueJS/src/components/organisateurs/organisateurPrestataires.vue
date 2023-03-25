<template>
  <div style="margin-top: 10px">
    <v-simple-table dark style="width: 80%; margin-left: 10%">
      <thead>
        <tr>
          <th>Id</th>
          <th>{{ $t('attribute.firstname') }}</th>
          <th>{{ $t('attribute.surname') }}</th>
          <th>Email</th>
          <th>Attractions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in prestataires" :key="'prestataire-'+p.id">
          <td>{{p.id}}</td>
          <td>{{p.firstname}}</td>
          <td>{{p.surname}}</td>
          <td>
            <a :href="'mailto:'+p.email+'?subject=[SERVICE] Belfunfair&body=[info] Ce mail s\'adresse à '+p.firstname+' '+p.surname+', en qualité de prestataire de l\'évènement Belfunfair :\n'">
              {{p.email}}
            </a>
          </td>
          <td>
            <v-btn v-on:click="showId(p.id)" small>{{$t('attribute.show')}}</v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <div style="width: 80%; margin-left: 10%; margin-bottom: 10px">
      <div v-if="presta" style="margin: 10px 0; text-align: center">
        <h1>{{presta.firstname}} {{presta.surname}}</h1>
      </div>

      <div v-if="attraction" style="text-align: center;">
        <v-btn small dark v-on:click="back">retour</v-btn>
        <h1>{{attraction.name}}</h1>
        <div v-if="this.type !== 'artiste'">
          <h2>Du {{attraction.datedebut}} au {{attraction.datefin}}</h2>
          <h2>Emplacement n°{{attraction.id_emplacement}}</h2>
        </div>
        <div v-else>
          <h2>Le {{attraction.date}} de {{attraction.starthour}} à {{attraction.endhour}}</h2>
        </div>
        <v-btn v-if="!attraction.cancel" v-on:click="confirmAttribution(true)" dark color="green" class="ma-2">confirm</v-btn>
        <v-btn v-on:click="confirmAttribution(false)" dark color="red" class="ma-2">cancel</v-btn>
      </div>

      <div v-else>
        <div v-if="maneges.length > 0">
          <h4>Maneges</h4>
          <v-simple-table>
            <thead>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>description</th>
              <th>type</th>
              <th>taille_min</th>
              <th>Dates</th>
              <th>status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="m in maneges" :key="'maneges-'+m.id">
              <td>{{m.id}}</td>
              <td>{{m.name}}</td>
              <td>{{m.description}}</td>
              <td>{{m.type}}</td>
              <td>{{m.taille_min}}</td>
              <td>{{m.datedebut}} - {{m.datefin}}</td>
              <td :class="m.status">
                {{m.status}}
                <v-btn x-small v-on:click="manageAttribution(m,'manege')" v-if="isCanceled('manege',m.id)">cancel</v-btn>
                <v-btn x-small v-on:click="manageAttribution(m,'manege')" v-if="m.status === 'wait_attribution'">manage</v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </div>

        <div v-if="stands.length > 0">
          <h4>Stands</h4>
          <v-simple-table>
            <thead>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>description</th>
              <th>type</th>
              <th>Dates</th>
              <th>status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="s in stands" :key="'stands-'+s.id">
              <td>{{s.id}}</td>
              <td>{{s.name}}</td>
              <td>{{s.description}}</td>
              <td>{{s.type}}</td>
              <td>{{s.datedebut}} - {{s.datefin}}</td>
              <td :class="s.status">
                {{s.status}}
                <v-btn small v-on:click="manageAttribution(s,'stand')" v-if="isCanceled('stand',s.id)">cancel</v-btn>
                <v-btn x-small v-on:click="manageAttribution(s,'stand')" v-if="s.status === 'wait_attribution'">manage</v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </div>

        <div v-if="artistes.length > 0">
          <h4>Artistes</h4>
          <v-simple-table>
            <thead>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>groupe</th>
              <th>description</th>
              <th>type</th>
              <th>Dates</th>
              <th>status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="a in artistes" :key="'artistes-'+a.id">
              <td>{{a.id}}</td>
              <td>{{a.groupe}}</td>
              <td>{{a.name}}</td>
              <td>{{a.description}}</td>
              <td>{{a.type}}</td>
              <td>{{a.date}} ({{a.starthour}} - {{a.endhour}})</td>
              <td :class="a.status">
                {{a.status}}
                <v-btn small v-on:click="manageAttribution(a,'artiste')" v-if="isCanceled('artiste',a.id)">cancel</v-btn>
                <v-btn x-small v-on:click="manageAttribution(a,'artiste')" v-if="a.status === 'wait_attribution'">manage</v-btn>
              </td>
            </tr>
            </tbody>
          </v-simple-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "organisateurPrestataires",
  data(){
    return{
      prestataires:[],
      artistes:[],
      maneges:[],
      stands:[],
      canceled:[],
      presta:null,
      attraction:null,
      type:null
    }
  },
  methods:{
    async fetchAttractions(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/organisateurs/prestataires',
      }).then(res=>{
        this.prestataires = res.data.data.prestataires
      })
    },
    showId(id){
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/attractions/'+id,
      }).then(res=>{
        let data = res.data.data
        this.canceled = data.cancelSignup
        this.maneges = data.maneges
        this.stands = data.stands
        this.artistes = data.artistes
        this.presta = this.prestataires.filter(p=>p.id===id)[0]
        this.back()
      })
    },
    isCanceled(type,id){
      let cancel
      let response = false
      if(type === "manege"){
        cancel = this.canceled.maneges
        cancel.forEach(c=>{if(c.id_manege===id) response = true})
      }
      if(type === "stand"){
        cancel = this.canceled.stands
        cancel.forEach(c=>{if(c.id_stand===id) response = true})
      }
      if(type === "artiste"){
        cancel = this.canceled.artistes
        cancel.forEach(c=>{if(c.id_artiste===id) response = true})
      }
      return response
    },
    manageAttribution(object,type){
      this.attraction = object
      this.type = type
    },
    back(){
      this.attraction = null
      this.type = null
    },
    confirmAttribution(confirm){
      let action = confirm ? "register" : "cancel"
      let url = this.type === 'artiste' ? `http://localhost:3000/organisateurs/${this.type}/${this.attraction.id}/${this.attraction.id_manifestation}/${action}` : `http://localhost:3000/organisateurs/${this.type}/${this.attraction.id}/${this.attraction.id_manifestation}/${action}/${this.attraction.id_emplacement}`
      axios({
        method: 'post',
        url: url,
      }).then(res => {
        this.$store.commit('setMessage', res.data)
        this.back()
      })
    }
  },
  mounted() {
    this.fetchAttractions()
  }
}
</script>

<style scoped>
.attributed{
  background-color: green;
  color: white;
}
.not_attributed{
  background-color: red;
  color: white;
}
.wait_attribution{
  background-color: orange;
  color: white;
}

</style>