<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-add-manege></prestataire-add-manege>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireAddManege from "@/components/prestataires/manege/prestataireAddManege.vue";
export default {
  name: "prestataireManegeAdd",
  components:{
    prestataireToolbar,
    prestataireAddManege
  }
}
</script>