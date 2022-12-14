<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-add-artiste></prestataire-add-artiste>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireAddArtiste from "@/components/prestataires/artiste/prestataireAddArtiste.vue";
export default {
  name: "prestataireArtisteAdd",
  components:{
    prestataireToolbar,
    prestataireAddArtiste
  }
}
</script>