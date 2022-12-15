<template>
  <div>
    <header>
      <user-toolbar></user-toolbar>
    </header>
    <flash-message></flash-message>
    <user-login></user-login>
  </div>
</template>

<script>

import userLogin from "@/components/users/userLogin.vue";
import userToolbar from "@/components/users/userToolbar.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "loginView",
  components:{
    userToolbar,
    userLogin,
    flashMessage
  }
}
</script>