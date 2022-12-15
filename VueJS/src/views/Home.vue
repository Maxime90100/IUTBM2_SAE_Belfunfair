<template>
  <div>
    <header>
      <top-toolbar></top-toolbar>
    </header>

    <div id="presentation">
      <div style="margin-top: 30vh; margin-bottom: 40vh">
        <h2 style="font-size: x-large">{{ $t('home.title') }}</h2>
        <h1 style="font-size: xxx-large">{{ $t('home.date') }}</h1>
      </div>
      <div style="margin-right: 10%; margin-left: 10%; margin-bottom: 30vh; background-color: #3f4545; color: white; padding: 50px">
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
