<template>
  <div>
    <user-signup></user-signup>
    <div style="width: 80vw; margin-left: 10vw">
      <div v-if="$store.state.user">
        <h1>{{$t("attribute.myComments")}}</h1>
        <div style="margin: 20px; background-color: orange; padding: 10px; border-radius: 20px">
          <h3 style="color: white">{{$t('attribute.addComment')}}</h3>
          <textarea id="comment" style="border-radius: 5px;" maxlength="1000"></textarea>
          <v-btn v-on:click="addComment" small class="mt-1">{{$t('button.add')}}</v-btn>
        </div>
        <ul>
          <li v-for="c in getMyComment" :key="'comment-'+c.id">
            <v-btn v-on:click="deleteComment(c.id)" x-small dark color="red">{{$t('button.delete')}}</v-btn><br>
            <b>{{c.header}}</b>
            {{c.comment}}
          </li>
        </ul>
        <hr>
        <h1>{{$t("attribute.otherComments")}}</h1>
        <ul>
          <li v-for="c in getOtherComment" :key="'comment-'+c.id">
            <b>{{c.header}}</b>
            {{c.comment}}
          </li>
        </ul>
      </div>
      <div v-else>
        <h1>{{$t("attribute.comments")}}</h1>
        <ul>
          <li v-for="c in goldenBook" :key="'comment-'+c.id">
            <b>{{c.header}}</b>
            {{c.comment}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserSignup from "@/components/users/userConnection.vue";

export default {
  name: "goldenBook",
  components: {UserSignup},
  computed:{
    getOtherComment(){
      if(this.$store.state.user)
        return this.goldenBook.filter(e=>e.id_user!==this.$store.state.user.id)
      return this.goldenBook
    },
    getMyComment(){
      if(this.$store.state.user)
        return this.goldenBook.filter(e=>e.id_user===this.$store.state.user.id)
      return this.goldenBook
    }
  },
  data: ()=>{
    return{
      goldenBook:[]
    }
  },
  methods:{
    getGoldenBook(){
      axios({
        method:"get",
        url:"http://localhost:3000/users/goldenBook"
      }).then(res=>{
        this.goldenBook = res.data.data
        console.log(res)
      })
    },
    addComment(){
      let comment = document.getElementById('comment').value
      if(comment){
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const dateString = `${day}-${month}-${year}`;
        let header = `De "${this.$store.state.user.firstname} ${this.$store.state.user.surname}", le ${dateString}:\n`
        axios({
          method:"post",
          url:`http://localhost:3000/users/goldenBook/${this.$store.state.user.id}`,
          data:{
            header:header,
            comment:comment
          }
        }).then(res=>{
          location.reload()
          this.$store.commit('setMessage', {success:1,data:res.data.data})
        })
      }
    },
    deleteComment(id){
      axios({
        method:"post",
        url:`http://localhost:3000/users/goldenBook/delete/${id}`
      }).then(res=>{
        location.reload()
        this.$store.commit('setMessage', {success:1,data:res.data.data})
      })
    }
  },
  mounted() {
    this.getGoldenBook()
  }
}
</script>

<style scoped>
h1{
  margin-bottom: 20px;
}
hr{
  margin: 10px 0;
}
li, b{
  white-space: pre-wrap;
}
</style>