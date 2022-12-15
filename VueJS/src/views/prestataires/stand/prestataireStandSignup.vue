<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-signup-stand></prestataire-signup-stand>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireSignupStand from "@/components/prestataires/stand/prestataireSignupStand.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireStandSignup",
  components:{
    prestataireToolbar,
    prestataireSignupStand,
    flashMessage
  }
}
</script>