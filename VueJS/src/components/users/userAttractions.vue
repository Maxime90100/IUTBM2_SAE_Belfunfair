<template>
  <div>
    <user-signup></user-signup>
    <div style="text-align: center">
      <h1>{{$t('userToolbar.attractions')}}</h1>
      <v-btn v-if="$store.state.user" v-on:click="showLike">
        <span v-if="liked"> Only liked</span>
        <span v-else> All</span>
      </v-btn>
    </div>
    <ul>
      <li>
        <h4>{{$t('attribute.manege')}} ({{getManeges.length}})</h4>
        <v-btn class="mb-2" small v-on:click="showManeges" id="btnManege">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Manege">
            <div v-for="(m,i) in getManeges" :key="'attractions-manege-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <div style="display: inline-flex; text-align: center; background: none">
                  <div v-if="$store.state.user">
                    <button  v-if="isliked('manege',m.id)" v-on:click="setLike('manege',m.id,false)" class="mr-2">
                      <v-icon color="red">mdi-heart</v-icon>
                    </button>
                    <button v-else v-on:click="setLike('manege',m.id,true)" class="mr-2">
                      <v-icon color="red">mdi-heart-outline</v-icon>
                    </button>
                  </div>
                  <h2>{{m.name}}</h2>
                </div>
                <h3>{{$t('attribute.from')}} {{m.datedebut}} {{$t('attribute.to')}} {{m.datefin}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{m.type}}</li>
                  <li v-if="m.taille_min">{{$t('attribute.taille')}}: {{m.taille_min}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{m.description}}
                </div>
                <div v-if="$store.state.user">
                  <notes-star :type="'manege'" :id="m.id" :rate="m.note"></notes-star>
                </div>
                <div v-else style="display: flex">
                  <span style="margin-right: 10px">{{Math.round((m.note)*10)/10}}/5</span>
                  <div v-for=" i in Math.round(m.note)" :key="i+'star-manege-'+m.id">
                    <v-icon small>mdi-star</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <h4>{{$t('attribute.stand')}} ({{getStands.length}})</h4>
        <v-btn class="mb-2" small v-on:click="showStands" id="btnStand">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Stand">
            <div v-for="(s,i) in getStands" :key="'attractions-stand-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <div style="display: inline-flex; text-align: center; background: none">
                  <div v-if="$store.state.user">
                    <button v-if="isliked('stand',s.id)" v-on:click="setLike('stand',s.id,false)" class="mr-2">
                      <v-icon color="red">mdi-heart</v-icon>
                    </button>
                    <button v-else v-on:click="setLike('stand',s.id,true)" class="mr-2">
                      <v-icon color="red">mdi-heart-outline</v-icon>
                    </button>
                  </div>
                  <h2>{{s.name}}</h2>
                </div>
                <h3>{{$t('attribute.from')}} {{s.datedebut}} {{$t('attribute.to')}} {{s.datefin}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{s.type}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{s.description}}
                </div>
                <div v-if="$store.state.user">
                  <notes-star :type="'stand'" :id="s.id"></notes-star>
                </div>
                <div v-else style="display: flex">
                  <span style="margin-right: 10px">{{Math.round((s.note)*10)/10}}/5</span>
                  <div v-for=" i in Math.round(s.note)" :key="i+'star-stand-'+s.id">
                    <v-icon small>mdi-star</v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <h4>{{$t('attribute.artist')}} ({{getArtistes.length}})</h4>
        <v-btn class="mb-2" small v-on:click="showArtists" id="btnArtist">{{$t('attribute.hide')}}</v-btn>
        <div>
          <div id="attractions-Artist">
            <div v-for="(a,i) in getArtistes" :key="'attractions-artist-'+i">
              <div style="width: 80vw; background-color: #cccccc; border-radius: 10px; padding: 10px; margin: 1vh 10vw">
                <div style="display: inline-flex; text-align: center; background: none">
                  <div v-if="$store.state.user">
                    <button v-if="isliked('artiste',a.id)" v-on:click="setLike('artiste',a.id,false)" class="mr-2">
                      <v-icon color="red">mdi-heart</v-icon>
                    </button>
                    <button v-else v-on:click="setLike('artiste',a.id,true)" class="mr-2">
                      <v-icon color="red">mdi-heart-outline</v-icon>
                    </button>
                  </div>
                  <h2>{{a.name}}</h2>
                </div>
                <h3>{{$t('attribute.fromHour')}} {{a.starthour}} {{$t('attribute.toHour')}} {{a.endhour}}</h3>
                <ul>
                  <li>{{$t('attribute.type')}}: {{a.type}}</li>
                </ul>
                <div style="background-color: white; border-radius: 10px; padding: 10px; text-align: justify; margin: 10px">
                  {{a.description}}
                </div>
                <div v-if="$store.state.user">
                  <notes-star :type="'artiste'" :id="a.id"></notes-star>
                </div>
                <div v-else style="display: flex">
                  <span style="margin-right: 10px">{{Math.round((a.note)*10)/10}}/5</span>
                  <div v-for=" i in Math.round(a.note)" :key="i+'star-artiste-'+a.id">
                    <v-icon small>mdi-star</v-icon>
                  </div>
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
import userSignup from "@/components/users/userConnection.vue";
import notesStar from "@/components/users/notesStar.vue";
export default {
  name: "userAttractions",
  components:{
    userSignup,
    notesStar
  },
  computed:{
    getManeges(){
      let maneges = []
      if(this.liked && this.likeLists.likeListManege){
        this.maneges.forEach(m=>{
          if(this.isliked('manege',m.id))
            maneges.push(m)
        })
      }
      else maneges = this.maneges
      return maneges
    },
    getStands(){
      let stands = []
      if(this.liked && this.likeLists.likeListStand){
        this.stands.forEach(s=>{
          if(this.isliked('stand',s.id))
            stands.push(s)
        })
      }
      else stands = this.stands
      return stands
    },
    getArtistes(){
      let artistes = []
      if(this.liked && this.likeLists.likeListArtiste){
        this.artistes.forEach(a=>{
          if(this.isliked('artiste',a.id))
            artistes.push(a)
        })
      }
      else artistes = this.artistes
      return artistes
    }
  },
  data:()=>{
    return{
      maneges:[],
      mExpand:false,
      stands:[],
      sExpand:false,
      artistes:[],
      aExpand:false,
      likeLists:[],
      liked:false
    }
  },
  methods:{
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
    },
    getLike(id_user){
      let url = id_user ? `http://localhost:3000/users/like/${this.$store.state.user.id}` : `http://localhost:3000/users/like`
      axios({
        method: 'get',
        url: url
      }).then(res=>{
        this.likeLists = res.data.data
      })
    },
    setLike(type,id,bool){
      axios({
        method: 'post',
        url: `http://localhost:3000/users/like/${this.$store.state.user.id}/${type}/${id}/${bool}`
      }).then(res=>{
        location.reload()
        console.log(res)
        //this.$store.commit('setMessage', {success:1,data:res.data.data})
      })
    },
    isliked(type,id){
      let res = false
      if(type === 'manege'){
        if(this.likeLists.likeListManege) {
          this.likeLists.likeListManege.forEach(m=>{
            if(m.id_manege === id && m.id_user === this.$store.state.user.id)
              res = true
          })
        }
      }else if(type === 'stand'){
        if(this.likeLists.likeListStand) {
          this.likeLists.likeListStand.forEach(s=>{
            if(s.id_stand === id && s.id_user === this.$store.state.user.id)
              res = true
          })
        }
      }else if(type === 'artiste'){
        if(this.likeLists.likeListArtiste) {
          this.likeLists.likeListArtiste.forEach(a=>{
            if(a.id_artiste === id && a.id_user === this.$store.state.user.id)
              res = true
          })
        }
      }
      return res
    },
    showLike(){
      this.liked = !this.liked
    }
  },
  mounted() {
    this.getData()
    this.showManeges()
    this.showStands()
    this.showArtists()
    this.getLike()
  }
}
</script>