<template>
        <v-container fluid >
            <h1>LOGIN</h1>
            <v-row align="center" justify="center" >
                <v-col  md="6" sm="9" xs="12" >
                    <v-container>
                        <v-row>  
                            <v-text-field
                                v-model="correo"
                                label="Usuario"
                                single-line
                                solo
                                ></v-text-field>       
                        </v-row>
                        <v-row>
                            <v-text-field
                                v-model="password"
                                type="password"
                                label="Password"
                                single-line
                                solo
                                ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-btn color="primary" v-on:click="login" >ENTRAR</v-btn>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>    
        </v-container>
</template>
<script>
import axios from 'axios'

export default {
    name : 'login',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            correo : '',
            password:''
        }
    },
    methods : {
           login :  function(){
               const urlLogin = "http://localhost:8071/login"
               axios.post(urlLogin, {correo: this.correo , password:this.password})
               .then(
                   response => {
                       alert("Bienbenido")
                       localStorage.setItem("Tokem",response.token)
                   }
               ).catch(
                   err => {
                    alert("Datos incorrectos")
                   }
                   
               )
           }
    }
}
</script>


<!--export const s_listClients = () => {
  return axios.get('clients',{ headers:{'Authorization': 'Bearer '+ localStorage.getItem('tokenP')}})
}-->
