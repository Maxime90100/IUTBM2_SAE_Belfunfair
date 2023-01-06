import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/users/login.vue";
import Attractions from "@/views/users/attractions.vue";

import prestataireHome from "@/views/prestataires/prestataireHome.vue";
import organisateurHome from "@/views/organisateurs/organisateurHome.vue";

import prestataireManeges from "@/views/prestataires/manege/prestataireManeges.vue";
import prestataireManegeAdd from "@/views/prestataires/manege/prestataireManegeAdd.vue";
import prestataireManegeUpdate from "@/views/prestataires/manege/prestataireManegeUpdate.vue";
import prestataireManegeSignup from "@/views/prestataires/manege/prestataireManegeSignup.vue";

import prestataireStands from "@/views/prestataires/stand/prestataireStands.vue";
import prestataireStandAdd from "@/views/prestataires/stand/prestataireStandAdd.vue";
import prestataireStandUpdate from "@/views/prestataires/stand/prestataireStandUpdate.vue";
import prestataireStandSignup from "@/views/prestataires/stand/prestataireStandSignup.vue";

import prestataireArtistes from "@/views/prestataires/artiste/prestataireArtistes.vue";
import prestataireArtisteAdd from "@/views/prestataires/artiste/prestataireArtisteAdd.vue";
import prestataireArtisteUpdate from "@/views/prestataires/artiste/prestataireArtisteUpdate.vue";
import prestataireArtisteSignup from "@/views/prestataires/artiste/prestataireArtisteSignup.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes:[
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path:"/login",
            name:"Login",
            component: Login
        },
        {
            path:"/attractions",
            name:"Attractions",
            component: Attractions
        },
        {
            path: "/prestataire",
            name: "prestataireHome",
            component: prestataireHome
        },
        {
            path: "/organisateur",
            name: "organisateurHome",
            component: organisateurHome
        },
        {
            path: "/prestataire/maneges",
            name: "prestataireManeges",
            component: prestataireManeges
        },
        {
            path: "/prestataire/maneges/add",
            name: "prestataireManegeAdd",
            component: prestataireManegeAdd
        },
        {
            path: "/prestataire/maneges/:id",
            name: "prestataireManegeUpdate",
            component: prestataireManegeUpdate
        },
        {
            path: "/prestataire/maneges/:id/signup",
            name: "prestataireManegeSignup",
            component: prestataireManegeSignup
        },
        {
            path: "/prestataire/stands",
            name: "prestataireStands",
            component: prestataireStands
        },
        {
            path: "/prestataire/stands/add",
            name: "prestataireStandAdd",
            component: prestataireStandAdd
        },
        {
            path: "/prestataire/stands/:id",
            name: "prestataireStandUpdate",
            component: prestataireStandUpdate
        },
        {
            path: "/prestataire/stands/:id/signup",
            name: "prestataireStandSignup",
            component: prestataireStandSignup
        },
        {
            path: "/prestataire/artistes",
            name: "prestataireArtistes",
            component: prestataireArtistes
        },
        {
            path: "/prestataire/artistes/add",
            name: "prestataireArtisteAdd",
            component: prestataireArtisteAdd
        },
        {
            path: "/prestataire/artistes/:id",
            name: "prestataireArtisteUpdate",
            component: prestataireArtisteUpdate
        },
        {
            path: "/prestataire/artistes/:id/signup",
            name: "prestataireArtisteSignup",
            component: prestataireArtisteSignup
        }
    ]
})