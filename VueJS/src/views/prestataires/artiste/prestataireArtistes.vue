<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <h1>{{$t('artiste.name')}}</h1>
    <flash-message></flash-message>
    <prestataire-show-artistes></prestataire-show-artistes>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireShowArtistes from "@/components/prestataires/artiste/prestataireShowArtistes.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireArtistes",
  components:{
    prestataireToolbar,
    prestataireShowArtistes,
    flashMessage
  }
}
</script>