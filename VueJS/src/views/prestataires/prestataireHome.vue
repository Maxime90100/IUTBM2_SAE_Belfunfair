<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-profil></prestataire-profil>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireProfil from "@/components/prestataires/prestataireProfil.vue";
export default {
  name: "prestataireHome",
  components:{
    prestataireToolbar,
    prestataireProfil
  }
}
</script>