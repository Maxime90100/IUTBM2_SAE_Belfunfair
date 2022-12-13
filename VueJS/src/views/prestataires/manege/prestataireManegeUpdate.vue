<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-update-manege></prestataire-update-manege>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateManege from "@/components/prestataires/manege/prestataireUpdateManege.vue";
export default {
  name: "prestataireManegeUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateManege
  }
}
</script>