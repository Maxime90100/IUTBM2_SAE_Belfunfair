<template>
  <div>
    <header>
      <user-toolbar></user-toolbar>
    </header>
    <flash-message></flash-message>
    <h1>{{$t('userToolbar.ticket')}}</h1>
    <div id="form">
      <div v-if="!qrcode">
        <label>
          <v-icon>mdi-calendar-range</v-icon>
          Date
        </label>
        <input v-model="date" id="date" type="date" required>
        <label>
          <v-icon>mdi-ticket-account</v-icon>
          Nombre de billet Adulte (+16 ans)
        </label>
        <input v-model="nbTicketAdult" type="number" min="0" required>
        <label>
          <v-icon>mdi-ticket-account</v-icon>
          Nombre de billet Enfant (-16 ans)
        </label>
        <input v-model="nbTicketChild" type="number" min="0" required>
        <label>
          <v-icon>mdi-map-marker</v-icon>
          Adresse de réception du e-billet
        </label>
        <input v-model="email" type="email" required>
        <h5>Prix billet Adulte: {{this.priceAdult}}€</h5>
        <h5>Prix billet Enfant: {{this.priceChild}}€</h5>
        <div style="text-align: center">
          <button v-on:click="buy" v-if="calculatePrice>0" type="submit">Acheter pour {{calculatePrice}} €</button>
        </div>
      </div>
      <div id="qrCode"></div>
    </div>
  </div>
</template>

<script>
import UserToolbar from "@/components/users/userToolbar.vue";
import FlashMessage from "@/components/users/flashMessage.vue";
import QRCode from "qrcode"
export default {
  name: "ticketView",
  components: {FlashMessage, UserToolbar},
  data: ()=>{
    return{
      priceAdult:4.50,
      priceChild:3,
      nbTicketAdult:0,
      nbTicketChild:0,
      email:null,
      date: new Date().toISOString().substr(0, 10),
      qrcode:null
    }
  },
  computed:{
    calculatePrice(){
      return (this.priceAdult * this.nbTicketAdult + this.priceChild * this.nbTicketChild).toFixed(2)
    }
  },
  methods:{
    checkConnexion(){
      if(!this.$store.state.user) {
        this.$router.replace('/login')
        this.$store.commit('setMessage', {success:0,data:'Vous devez vous connecter pour accéder à l\'espace e-billet !'})
      }
    },
    async generateQRCode() {
      QRCode.toDataURL(this.qrcode, function (err, url) {
        if (err) throw err;
        const img = document.createElement('img');
        img.src = url;
        document.getElementById('qrCode').appendChild(img);
      });
    },
    buy(){
      if(confirm(`Voulez-vous acheter ce billet pour ${this.nbTicketAdult} Adultes et ${this.nbTicketChild} Enfants ?\n DATE: ${this.date}\n MAIL: ${this.email}\n TOTAL: ${this.calculatePrice} €`))
      this.qrcode = window.location.href
      this.generateQRCode()
    }
  },
  mounted() {
    this.checkConnexion()
    this.email = this.$store.state.user.email
  }
}
</script>

<style scoped>
#form{
  width: 80vw;
  margin-left: 10vw;
  padding: 20px;
  background-color: orange;
  border-radius: 20px;
}
input{
  border-radius: 20px;
  margin-bottom: 20px;
}
label{
  color: white;
}
button{
  margin-top: 10px;
  background:none;
  color: white;
  padding: 10px;
  border: 2px solid white;
  border-radius: 20px;
}
button:hover{
  background:white;
  color: orange;
}
#qrCode{
  text-align: center;
  margin: 10px 0;
}
</style>