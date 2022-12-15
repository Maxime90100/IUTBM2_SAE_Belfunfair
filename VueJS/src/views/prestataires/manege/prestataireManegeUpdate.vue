<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-update-manege></prestataire-update-manege>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateManege from "@/components/prestataires/manege/prestataireUpdateManege.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireManegeUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateManege,
    flashMessage
  }
}
</script>