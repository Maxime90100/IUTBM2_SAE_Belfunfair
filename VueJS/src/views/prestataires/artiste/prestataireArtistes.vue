<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <h1>{{$t('artiste.name')}}</h1>
    <prestataire-show-artistes></prestataire-show-artistes>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireShowArtistes from "@/components/prestataires/artiste/prestataireShowArtistes.vue";
export default {
  name: "prestataireArtistes",
  components:{
    prestataireToolbar,
    prestataireShowArtistes
  }
}
</script>