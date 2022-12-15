<template>
  <div>
    <header>
      <prestataire-toolbar></prestataire-toolbar>
    </header>
    <flash-message></flash-message>
    <h1>{{$t('prestataireToolbar.stand')}}</h1>
    <prestataire-show-stands></prestataire-show-stands>
  </div>
</template>

<script>
import prestataireToolbar from "@/components/prestataires/prestataireToolbar.vue";
import prestataireShowStands from "@/components/prestataires/stand/prestataireShowStands.vue";
import flashMessage from "@/components/users/flashMessage.vue";
export default {
  name: "prestataireStands",
  components:{
    prestataireToolbar,
    prestataireShowStands,
    flashMessage
  }
}
</script>