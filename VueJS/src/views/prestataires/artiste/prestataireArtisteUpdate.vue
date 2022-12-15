<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-update-artiste></prestataire-update-artiste>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateArtiste from "@/components/prestataires/artiste/prestataireUpdateArtiste.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireArtisteUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateArtiste,
    flashMessage
  }
}
</script>