<template>
  <div>
    <div>
      <h4>{{$t('attribute.date')}}</h4>
      <input style="background-color: white; width: 100%" v-model="selectedDate" type="date" :min="dateDebut" :max="dateFin">
    </div>
    {{this.selectedDate}}
  </div>
</template>

<script>

export default {
  name: "prestataireSignupArtiste",
  data:()=>{
    return{
      id_user:null,
      id:null,
      dateDebut:null,
      dateFin:null,
      selectedDate:null
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
    }
  },
  mounted(){this.getData()}
}
</script>