<template>
  <div>
    <header>
      <organisateur-toolbar></organisateur-toolbar>
    </header>
    <flash-message></flash-message>
    <organisateur-prestataires></organisateur-prestataires>
  </div>
</template>

<script>
import organisateurToolbar from "@/components/organisateurs/organisateurToolbar.vue";
import organisateurPrestataires from "@/components/organisateurs/organisateurPrestataires.vue";
import FlashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "organisateurPrestatairesView",
  components:{
    FlashMessage,
    organisateurToolbar,
    organisateurPrestataires
  }
}
</script>