<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <h1>{{$t('prestataireToolbar.manege')}}</h1>
    <prestataire-show-maneges></prestataire-show-maneges>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireShowManeges from "@/components/prestataires/manege/prestataireShowManeges.vue";
export default {
  name: "prestataireManeges",
  components:{
    prestataireToolbar,
    prestataireShowManeges
  }
}
</script>