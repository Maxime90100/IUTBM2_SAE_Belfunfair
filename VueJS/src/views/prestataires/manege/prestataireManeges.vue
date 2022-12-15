<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <h1>{{$t('prestataireToolbar.manege')}}</h1>
    <flash-message></flash-message>
    <prestataire-show-maneges></prestataire-show-maneges>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireShowManeges from "@/components/prestataires/manege/prestataireShowManeges.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireManeges",
  components:{
    prestataireToolbar,
    prestataireShowManeges,
    flashMessage
  }
}
</script>