<template>
  <div>
    <header>
      <user-toolbar></user-toolbar>
    </header>
    <flash-message></flash-message>
    <user-attractions></user-attractions>
  </div>
</template>

<script>
import userToolbar from "@/components/users/userToolbar.vue";
import flashMessage from "@/components/users/flashMessage.vue";
import userAttractions from "@/components/users/userAttractions.vue";
export default {
  name: "attractionsView",
  components:{
    userToolbar,
    flashMessage,
    userAttractions
  }
}
</script>