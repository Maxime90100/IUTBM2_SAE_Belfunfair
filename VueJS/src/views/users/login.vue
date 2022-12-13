<template>
  <div>
    <header>
      <user-toolbar></user-toolbar>
    </header>
    <user-login></user-login>
  </div>
</template>

<script>

import userLogin from "@/components/users/userLogin.vue";
import userToolbar from "@/components/users/userToolbar.vue";

export default {
  name: "loginView",
  components:{
    userToolbar,
    userLogin
  }
}
</script>