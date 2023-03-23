<template>
  <div>
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
              <td :class="m.status">{{m.status}}</td>
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
            <th>status</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="s in stands" :key="'stands-'+s.id">
              <td>{{s.id}}</td>
              <td>{{s.name}}</td>
              <td>{{s.description}}</td>
              <td>{{s.type}}</td>
              <td :class="s.status">{{s.status}}</td>
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
              <td :class="a.status">{{a.status}}</td>
            </tr>
          </tbody>
        </v-simple-table>
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
      presta:null
    }
  },
  methods:{
    showId(id){
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/attractions/'+id,
      }).then(res=>{
        let data = res.data.data
        this.maneges = data.maneges
        this.stands = data.stands
        this.artistes = data.artistes
        this.presta = this.prestataires.filter(p=>p.id===id)[0]
      })
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/organisateurs/prestataires',
    }).then(res=>{
      this.prestataires = res.data.data.prestataires
    })
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