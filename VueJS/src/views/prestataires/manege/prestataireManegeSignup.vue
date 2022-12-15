<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <prestataire-signup-manege></prestataire-signup-manege>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireSignupManege from "@/components/prestataires/manege/prestataireSignupManege.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireManegeSignup",
  components:{
    prestataireToolbar,
    prestataireSignupManege,
    flashMessage
  }
}
</script>