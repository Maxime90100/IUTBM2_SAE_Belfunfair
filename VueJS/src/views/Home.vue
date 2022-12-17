<template>
  <div>
    <header style="background-color: #050416">
      <top-toolbar></top-toolbar>
    </header>

   <div style="height: 100vh; background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://vivreparis.fr/wp-content/uploads/2021/11/carrousel-paris-noel.jpg'); background-size: cover; transform: scaleX(-1)">
      <div style="color: white; height: 50vh; width: 80vw; position: absolute;  margin: 25vh 10vw; font-size: 2.5vw; font-family: Arial Black; transform: scaleX(-1)">
        <h2>{{ $t('home.title') }}</h2>
        <h1>{{$t('attribute.from')}} {{this.$store.state.manifestation.datedebut}} {{$t('attribute.to')}} {{this.$store.state.manifestation.datefin}}</h1>
      </div>
   </div>

    <div id="presentation">
      <div style="margin:30vh 10%; background-color: #3f4545; color: white; padding: 50px">
        <h3 style="text-align: justify;font-size: 4vh">{{$t('home.description')}}</h3>
      </div>
    </div>

    <div id="map">
      <user-map :maneges-data="maneges" :stands-data="stands"></user-map>
    </div>

    <footer id="about">
      <user-footer></user-footer>
    </footer>
  </div>
</template>

<script>
import TopToolbar from "@/components/users/userToolbar.vue";
import userFooter from "@/components/users/userFooter.vue";
import userMap from "@/components/users/userMap.vue";
import axios from "axios";

export default {
  name: 'HomeView',
  data:()=>{
    return{
      maneges: [],
      stands: []
    }
  },
  components:{
    TopToolbar,
    userFooter,
    userMap
  },
  methods: {
    getData(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      }).then(data=>{
        if(data.data.success){
          this.maneges = data.data.data.maneges
          this.stands = data.data.data.stands
        }
      })
    }
  },
  mounted(){
    this.getData()
  }
}
</script>
