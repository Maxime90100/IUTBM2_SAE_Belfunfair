<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-update-artiste></prestataire-update-artiste>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateArtiste from "@/components/prestataires/artiste/prestataireUpdateArtiste.vue";
export default {
  name: "prestataireArtisteUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateArtiste
  }
}
</script>