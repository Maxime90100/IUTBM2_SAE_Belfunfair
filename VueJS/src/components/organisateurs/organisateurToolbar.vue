<template>
  <div>
    <v-app-bar
        dark
        collapse-on-scroll
        fixed
    >
      <!-- BURGER MENU -->
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-app-bar-nav-icon> </v-app-bar-nav-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="goTo('/organisateur')"><v-icon>mdi-account</v-icon>{{$t('organisateurToolbar.profil')}}</v-list-item>
          <v-list-item @click="goTo('/organisateur/prestataires')"><v-icon>mdi-account-group</v-icon>{{$t('organisateurToolbar.prestataires')}}</v-list-item>
          <v-list-item @click="logout"><v-icon>mdi-logout</v-icon>{{$t('button.logout')}}</v-list-item>
          <v-list-item @click="goTo('/')"><v-icon>mdi-home</v-icon>{{$t('organisateurToolbar.home')}}</v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title>{{this.$store.state.user.firstname}} {{this.$store.state.user.surname}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-flag</v-icon>
          </v-btn>
        </template>
        <v-list v-for="(lang,index) in $t('lang')" :key="index">
          <v-list-item @click="changeLanguage(lang.value)">
            <img :src="lang.image" width="25px" height="20px">
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn @click="goTo('/')">{{$t('organisateurToolbar.home')}}</v-btn>
      <v-btn @click="logout">{{$t('button.logout')}}</v-btn>

      <!-- EXTEND MENU -->
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="goTo('/organisateur')">{{$t('organisateurToolbar.profil')}}</v-tab>
          <v-tab @click="goTo('/organisateur/prestataires')">{{$t('organisateurToolbar.prestataires')}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <br><br><br><br><br>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: 'organisateurToolbar',
  data:()=>{
    return{
      message:null,
      color:null
    }
  },
  methods: {
    goTo (path) {this.$router.replace(path)},
    _delete(){this.$store.commit('setMessage',null)},
    changeLanguage(lang){return i18n.locale = lang},
    logout(){
      this.$store.state.user = null
      this.$store.state.message = null
      this.goTo('/login')
      sessionStorage.clear();
    }
  }
}
</script>