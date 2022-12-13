<template>
  <div style="margin: 10%; padding: 3%; background-color: #3f4545">
    <h1 style="color: white">{{$t('prestataireToolbar.profil')}}</h1>
    <form>
      <input :value="this.$store.state.user.firstname" disabled>
      <input :value="this.$store.state.user.surname" disabled>
      <input :value="this.$store.state.user.email" disabled>
      <v-btn>{{ $t('button.change') }}</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  name: "prestataireProfil"
}
</script>