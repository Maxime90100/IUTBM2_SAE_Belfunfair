<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <prestataire-add-stand></prestataire-add-stand>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireAddStand from "@/components/prestataires/stand/prestataireAddStand.vue";
export default {
  name: "prestataireStandAdd",
  components:{
    prestataireToolbar,
    prestataireAddStand
  }
}
</script>