<template>
  <div>
    <header>
      <organisateur-toolbar></organisateur-toolbar>
    </header>
    <organisateur-prestataires></organisateur-prestataires>
  </div>
</template>

<script>
import organisateurToolbar from "@/components/organisateurs/organisateurToolbar.vue";
import organisateurPrestataires from "@/components/organisateurs/organisateurPrestataires.vue";
export default {
  name: "organisateurPrestatairesView",
  components:{
    organisateurToolbar,
    organisateurPrestataires
  }
}
</script>