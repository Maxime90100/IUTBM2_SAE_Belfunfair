<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-signup-stand></prestataire-signup-stand>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireSignupStand from "@/components/prestataires/stand/prestataireSignupStand.vue";
export default {
  name: "prestataireStandSignup",
  components:{
    prestataireToolbar,
    prestataireSignupStand
  }
}
</script>