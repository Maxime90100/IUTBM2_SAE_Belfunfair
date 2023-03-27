<template>
  <div>
    <header>
      <user-toolbar></user-toolbar>
    </header>
    <flash-message></flash-message>
    <user-golden-book></user-golden-book>
  </div>
</template>

<script>
import UserToolbar from "@/components/users/userToolbar.vue";
import FlashMessage from "@/components/users/flashMessage.vue";
import userGoldenBook from "@/components/users/userGoldenBook.vue";

export default {
  name: "goldenBook",
  components: {
    FlashMessage,
    UserToolbar,
    userGoldenBook
  }
}
</script>

<style scoped>

</style>