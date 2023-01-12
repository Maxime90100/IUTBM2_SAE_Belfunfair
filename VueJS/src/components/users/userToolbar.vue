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
          <v-list-item @click="goTo('/')">{{$t('userToolbar.presentation')}}</v-list-item>
          <v-list-item @click="goTo('/login')"><v-icon>mdi-login</v-icon>{{$t('button.login')}}</v-list-item>
        </v-list>
      </v-menu>

      <v-toolbar-title>
        <div v-if="$store.state.user">
          {{ $t('userToolbar.hello') }} !
          <span style="color: orange">
            {{this.$store.state.user.firstname}}
          </span>
        </div>
        <div v-else>
          Belfunfair
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ on }">
          <div v-if="$store.state.user && $store.state.user.role === 'user'">
            <v-btn @click="logout">{{$t('button.logout')}}</v-btn>
          </div>
          <div v-else>
            <v-btn @click="goTo('/login')">{{$t('button.login')}}</v-btn>
          </div>
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

      <!-- EXTEND MENU -->
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab @click="goTo('/')">{{$t('userToolbar.presentation')}}</v-tab>
          <v-tab @click="goTo('/attractions')">{{$t('userToolbar.attractions')}}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <br><br><br><br><br>
  </div>
</template>

<script>
import i18n from "@/i18n";

export default {
  name: 'userToolbar',
  methods: {
    goTo (path) {this.$router.replace(path)},
    changeLanguage(lang){return i18n.locale = lang},
    logout(){
      if(confirm(this.$t('confirm.logout'))){
        this.$store.state.user = null
        this.goTo('/')
      }
    }
  }
}
</script>