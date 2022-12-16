<template>
  <div>
    <header>
      <organisateur-toolbar></organisateur-toolbar>
    </header>
    organisateur
  </div>
</template>

<script>
import organisateurToolbar from "@/components/organisateurs/organisateurToolbar.vue";
export default {
  name: "organisateurHome",
  components:{
    organisateurToolbar
  }
}
</script>