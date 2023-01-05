<template>
  <div style="width: 80vw; margin: 10vh 10vw">
    <div v-if="artist.status === 'not_attributed'" style="background-color: #3f4545; color: white; padding: 10px">
      <h1>{{$t('artiste.signup')}} "{{this.artist.name}}"</h1>
      <div>
        <h4>{{$t('attribute.date')}}</h4>
        <input style="background-color: white; width: 100%" v-on:change="changeSelectedDate" v-model="selectedDate" type="date" :min="dateDebut" :max="dateFin" required>
      </div>
      <div v-if="selectedDate != null">
        <h4>{{$t('attribute.startHour')}}</h4>
        <input id="artistStartHour" style="background-color: white; width: 100%" v-model="startHour" type="time" required>
        <h4>{{$t('attribute.endHour')}}</h4>
        <input id="artistEndHour" style="background-color: white; width: 100%" v-model="endHour" type="time" required>
      </div>
      <div style="color: red; text-align: center" v-if="reserved.length > 0">
        <h2>{{$t('map.slots')}}</h2>
        <p style="margin: 0" v-for="(r,i) in reserved" :key="'signup-artist-r-'+i">{{ r.starthour }} - {{ r.endhour }}</p>
      </div>
      <div style="display: flex">
        <v-btn class="ma-2" @click="goTo('/prestataire/artistes')">{{ $t('button.back') }}</v-btn>
        <div v-if="startHour != null && endHour != null">
          <v-btn v-on:click="signup" class="ma-2" dark>{{$t('button.signup')}}</v-btn>
        </div>
      </div>
    </div>
    <div v-else>
      <div style="background-color: #3f4545;margin: 10%;padding: 3%; text-align: center">
        <h1 style="color: white">{{this.artist.name}}</h1>
        <h2 v-if="this.artist.status === 'wait_attribution'" style="color: orange">{{$t('status.wait_attribution')}}</h2>
        <h2 v-if="this.artist.status === 'attributed'" style="color: green">{{$t('status.attributed')}}</h2>
        <h2 style="color: white">{{this.artist.date}}</h2>
        <h3 style="color: white">{{$t('attribute.fromHour')}} {{this.artist.starthour}} {{$t('attribute.toHour')}} {{this.artist.endhour}}</h3>

        <v-btn v-if="this.artist.cancel" outlined disabled dark small @click="cancel">{{ $t('button.cancelSignupInProgress') }}</v-btn>
        <v-btn v-else color="red" dark @click="cancel">{{ $t('button.cancelSignup') }}</v-btn>
        <v-btn class="ma-2" @click="goTo('/prestataire/artistes')">{{ $t('button.back') }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "prestataireSignupArtiste",
  data:()=>{
    return{
      id_user:null,
      id:null,
      dateDebut:null,
      dateFin:null,
      selectedDate:null,
      startHour:null,
      endHour:null,
      artists:null,
      artist:null,
      reserved:[]
    }
  },
  methods: {
    goTo(path){this.$router.replace(path)},
    getData(){
      this.id_user = this.$store.state.user.id
      this.id = this.$route.params.id
      let dateDebut = this.$store.state.manifestation.datedebut
      this.dateDebut = dateDebut.split('/')[2]+'-'+dateDebut.split('/')[1]+'-'+dateDebut.split('/')[0]
      let dateFin = this.$store.state.manifestation.datefin
      this.dateFin = dateFin.split('/')[2]+'-'+dateFin.split('/')[1]+'-'+dateFin.split('/')[0]
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste/'+this.id+'/signup'
      }).then(result=>{
        this.artists = result.data.data.artists
      }).catch(error=>{
        console.log(error)
      })
      axios({
        method: 'get',
        url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste/'+this.id
      }).then(result=>{
        this.artist = result.data.data.artist
      }).catch(error=>{
        console.log(error)
      })
    },
    changeSelectedDate(){
      this.reserved = []
      let date = this.selectedDate.split('-')[2]+'/'+this.selectedDate.split('-')[1]+'/'+this.selectedDate.split('-')[0]
      this.artists.forEach(a=>{
        if(a.date === date) this.reserved.push(a)
      })
    },
    check(){
      if(!this.startHour || !this.endHour) return false
      document.getElementById('artistStartHour').style.borderColor = 'black'
      document.getElementById('artistEndHour').style.borderColor = 'black'
      const [sH,sM] = this.startHour.split(':')
      const [eH,eM] = this.endHour.split(':')
      const START = new Date(2000, 0, 1, +sH, +sM, 0).getTime();
      const END = new Date(2000, 0, 1, +eH, +eM, 0).getTime();
      let check = true
      this.reserved.forEach(r=>{
        let [sH,sM] = r.starthour.split(':')
        let [eH,eM] = r.endhour.split(':')
        let startDate = new Date(2000, 0, 1, +sH, +sM, 0).getTime();
        let endDate = new Date(2000, 0, 1, +eH, +eM, 0).getTime();
        if(START > startDate && START < endDate) {
          document.getElementById('artistStartHour').style.borderColor = 'red'
          check = false
        }
        if(START < startDate && END > startDate) {
          document.getElementById('artistEndHour').style.borderColor = 'red'
          check = false
        }
      })
      return check
    },
    signup(){
      if(this.check()){
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/'+this.id_user+'/artiste/'+this.id+'/signupPost',
          data: {
            id_manifestation: this.$store.state.manifestation.id,
            date: this.selectedDate,
            startHour: this.startHour,
            endHour: this.endHour
          }
        }).then(result=>{
          this.$store.commit('setMessage',result.data)
          this.getData()
        }).catch(error=>{
          console.log(error)
        })
      }else this.$store.commit('setMessage',{success:0,data:'Votre groupe ne peux pas être inscrit sur des créneaux indisponibles'})
    },
    cancel(){
      if(confirm(this.$t('confirm.cancel'))) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/prestataires/' + this.id_user + '/artiste/' + this.id + '/cancelSignup',
          data: {
            id_manifestation: this.$store.state.manifestation.id
          }
        }).then(result => {
          this.$store.commit('setMessage', result.data)
          this.getData()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  },
  mounted(){this.getData()}
}
</script>