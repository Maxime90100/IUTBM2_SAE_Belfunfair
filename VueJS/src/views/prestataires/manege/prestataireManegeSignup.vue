<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-signup-manege></prestataire-signup-manege>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireSignupManege from "@/components/prestataires/manege/prestataireSignupManege.vue";

export default {
  name: "prestataireManegeSignup",
  components:{
    prestataireToolbar,
    prestataireSignupManege
  }
}
</script>