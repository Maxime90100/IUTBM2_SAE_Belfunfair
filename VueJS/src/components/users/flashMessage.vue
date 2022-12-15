<template>
  <div id="flashMessage" v-if="this.$store.state.message" style="width: 80%; height: auto; margin-left: 10%; padding: 1%; opacity: 70%; color: white; text-align: center">
    {{this.$store.state.message.data}}
    <div style="text-align: center">
      <v-btn x-small @click="_delete()">{{$t('button.delete')}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "flashMessage",
  methods:{
    _delete(){this.$store.commit('setMessage',null)},
    changeMessage(){
      if(this.$store.state.message){
        let color = 'red'
        if(this.$store.state.message.success) color = 'green'
        document.querySelector('#flashMessage').style.backgroundColor = color
      }
    }
  },
  updated(){this.changeMessage()},
  mounted(){this.changeMessage()}
}
</script>