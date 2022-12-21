<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-signup-artiste></prestataire-signup-artiste>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireSignupArtiste from "@/components/prestataires/artiste/prestataireSignupArtiste.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireArtisteSignup",
  components:{
    prestataireToolbar,
    prestataireSignupArtiste,
    flashMessage
  }
}
</script>

<style scoped>

</style>