<template>
  <v-app>
    <v-main>
      <v-slide-y-transition mode="out-in">
        <router-view id="top"/>
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>
<script>
  export default{
    name:"appView",
    mounted(){this.$store.commit('setManifestation')}
  }
</script>