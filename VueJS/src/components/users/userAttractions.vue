<template>
  <div>
    <h1>{{$t('userToolbar.attractions')}}</h1>
    <ul>
      <li>
        <h4>{{$t('attribute.manege')}}</h4>
        <v-btn class="mb-2" small v-on:click="showManeges" id="btnManege">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Manege">
            <div v-for="(m,i) in maneges" :key="'attractions-manege-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <h2>{{m.name}}</h2>
                <h3>{{$t('attribute.from')}} {{m.datedebut}} {{$t('attribute.to')}} {{m.datefin}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{m.type}}</li>
                  <li v-if="m.taille_min">{{$t('attribute.taille')}}: {{m.taille_min}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{m.description}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <h4>{{$t('attribute.stand')}}</h4>
        <v-btn class="mb-2" small v-on:click="showStands" id="btnStand">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Stand">
            <div v-for="(s,i) in stands" :key="'attractions-stand-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <h2>{{s.name}}</h2>
                <h3>{{$t('attribute.from')}} {{s.datedebut}} {{$t('attribute.to')}} {{s.datefin}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{s.type}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{s.description}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <h4>{{$t('attribute.artist')}}</h4>
        <v-btn class="mb-2" small v-on:click="showArtists" id="btnArtist">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Artist">
            <div v-for="(a,i) in artistes" :key="'attractions-artist-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <h2>{{a.name}}</h2>
                <h3>{{$t('attribute.fromHour')}} {{a.starthour}} {{$t('attribute.toHour')}} {{a.endhour}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{a.type}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{a.description}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import {attribute} from "postcss-selector-parser";

export default {
  name: "userAttractions",
  data:()=>{
    return{
      maneges:null,
      mExpand:false,
      stands:null,
      sExpand:false,
      artistes:null,
      aExpand:false
    }
  },
  methods:{
    attribute,
    getData(){
      axios({
        method: 'get',
        url: 'http://localhost:3000/'
      }).then(data=>{
        if(data.data.success){
          this.maneges = data.data.data.maneges
          this.stands = data.data.data.stands
          this.artistes = data.data.data.artistes
        }
      })
    },
    showManeges(){
      let show = this.$t('attribute.show')
      let hide = this.$t('attribute.hide')
      let btn = document.getElementById("btnManege")
      let content = document.getElementById('attractions-Manege')
      let text
      if(this.mExpand){
        text = show
        content.style.display = 'none'
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        this.mExpand = false
      }else{
        text = hide
        content.style.display = 'block'
        btn.style.backgroundColor = 'black'
        btn.style.color = 'white'
        this.mExpand = true
      }
      btn.innerText = text
    },
    showStands(){
      let show = this.$t('attribute.show')
      let hide = this.$t('attribute.hide')
      let btn = document.getElementById("btnStand")
      let content = document.getElementById('attractions-Stand')
      let text
      if(this.sExpand){
        text = show
        content.style.display = 'none'
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        this.sExpand = false
      }else{
        text = hide
        content.style.display = 'block'
        btn.style.backgroundColor = 'black'
        btn.style.color = 'white'
        this.sExpand = true
      }
      btn.innerText = text
    },
    showArtists(){
      let show = this.$t('attribute.show')
      let hide = this.$t('attribute.hide')
      let btn = document.getElementById("btnArtist")
      let content = document.getElementById('attractions-Artist')
      let text
      if(this.aExpand){
        text = show
        content.style.display = 'none'
        btn.style.backgroundColor = 'white'
        btn.style.color = 'black'
        this.aExpand = false
      }else{
        text = hide
        content.style.display = 'block'
        btn.style.backgroundColor = 'black'
        btn.style.color = 'white'
        this.aExpand = true
      }
      btn.innerText = text
    }
  },
  mounted() {
    this.getData()
    this.showManeges()
    this.showStands()
    this.showArtists()
  }
}
</script>