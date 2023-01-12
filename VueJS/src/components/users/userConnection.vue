<template>
  <div v-if="$store.state.user === null">
    <div style="width: 80vw; margin: 2vh 10vw; padding: 10px; text-align: center; background-color: indianred; color: white; border-radius: 10px">
      {{ $t('userToolbar.noUser') }}
      <v-btn class="ma-1" x-small v-on:click="goTo('/login')">{{$t('button.login')}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "userSignup",
  methods:{
    goTo(path){
      this.$router.replace(path)
    }
  }
}
</script>