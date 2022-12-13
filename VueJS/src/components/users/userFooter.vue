<template>
  <v-app>
    <v-footer color="dark" absolute dark>
      <v-row justify="center" class="my-4 text-center">
        <v-col cols="12"><h1>{{$t('button.about') }}</h1></v-col>
        <v-col cols="12">
          <v-btn v-for="icon in icons" :key="icon" text dark>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="align-center">&copy; 2022 IUT Nord-Franche-Comté</v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "userFooter",
  data: () => {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
        'mdi-youtube',
      ],
    };
  }
}
</script>