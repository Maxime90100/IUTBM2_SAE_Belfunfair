<template>
  <div>
    <header>
      <organisateur-toolbar></organisateur-toolbar>
    </header>
    <flash-message></flash-message>
    <organisateur-profil></organisateur-profil>
  </div>
</template>

<script>
import organisateurToolbar from "@/components/organisateurs/organisateurToolbar.vue";
import FlashMessage from "@/components/users/flashMessage.vue";
import OrganisateurProfil from "@/components/organisateurs/organisateurProfil.vue";
export default {
  name: "organisateurHome",
  components:{
    OrganisateurProfil,
    FlashMessage,
    organisateurToolbar
  }
}
</script>