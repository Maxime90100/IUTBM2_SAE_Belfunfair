<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-profil></prestataire-profil>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireProfil from "@/components/prestataires/prestataireProfil.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireHome",
  components:{
    prestataireToolbar,
    prestataireProfil,
    flashMessage
  }
}
</script>