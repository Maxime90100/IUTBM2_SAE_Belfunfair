<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-update-stand></prestataire-update-stand>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireUpdateStand from "@/components/prestataires/stand/prestataireUpdateStand.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireStandUpdate",
  components:{
    prestataireToolbar,
    prestataireUpdateStand,
    flashMessage
  }
}
</script>