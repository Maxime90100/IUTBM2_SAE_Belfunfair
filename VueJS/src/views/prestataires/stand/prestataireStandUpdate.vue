<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-update-stand></prestataire-update-stand>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateStand from "@/components/prestataires/stand/prestataireUpdateStand.vue";
export default {
  name: "prestataireStandUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateStand
  }
}
</script>