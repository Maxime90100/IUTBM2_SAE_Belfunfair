<template>
  <div style="display: flex; padding: 10px">
    {{this.rateAVG}} <v-icon small>mdi-star</v-icon>
    <input v-model="note" type="range">
    <v-btn x-small class="ma-1" v-on:click="evaluate">{{$t('button.rate')}}</v-btn>
    {{this.rangeNote}}/5
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "notesStar",
  props:{
    type:null,
    id:null,
    rate:null
  },
  data:()=>{
    return{
      note:null,
      notesManege:[],
      notesStand:[],
      notesArtiste:[]
    }
  },
  computed:{
    rangeNote(){return (this.note * 0.05).toFixed(1)},
    rateAVG(){
      if(!this.rate) return 0
      return this.rate.toFixed(1)},
    userNote(){
      let notes
      let note = null
      if(this.type === 'manege') notes = this.notesManege
      if(this.type === 'stand') notes = this.notesStand
      if(this.type === 'artiste') notes = this.notesArtiste
      notes.forEach(n=>{
        if(n.id_manege === this.id) note = n.note
      })
      return note
    }
  },
  methods:{
    evaluate(){
      let id_user = this.$store.state.user.id
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/note/'+id_user+'/'+this.type+'/'+this.id+'/'+this.rangeNote,
      }).then(result=>{
        console.log(result)
      }).catch(error=>{
        console.log(error)
      })
    }
  },
  mounted() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/users/notes/'+this.$store.state.user.id,
    }).then(result=>{
      let data = result.data.data
      this.notesManege = data.notesManege
      this.notesStand = data.notesStand
      this.notesArtiste = data.notesArtiste
      this.note = this.userNote / 0.05
    }).catch(error=>{
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>