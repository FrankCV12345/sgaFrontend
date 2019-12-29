<template>
        <v-container fluid >
            <h1>LOGIN SGA</h1>
            <v-row align="center" justify="center" >
                <v-col  md="6" sm="9" xs="12" >
                    <v-container>
                        <v-row>  
                            <v-text-field
                                v-model="usuario.correo"
                                label="Usuario"
                                single-line
                                solo
                                ></v-text-field>       
                        </v-row>
                        <v-row>
                            <v-text-field
                                v-model="usuario.password"
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
            <appSnackBaar
            :v-if="ShowSnackBar"
            :snackBar="ShowSnackBar"
            :timeout="timeout"
            :text="message"
            />    
        </v-container>
</template>
<script>
import {AXIOS} from '../config/axios'
import appSnackBaar from '@/components/snackBar'
export default {
    name : 'login',
    components:{appSnackBaar} ,
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            usuario :{ correo : '', password:''},
            timeout:5000,
            message:'',
            ShowSnackBar:false
        }
    },
    methods : {    
           login (){
                   AXIOS.post('login',this.usuario).then( response => {
                            let usuario =  response.data
                            let fecha = new Date()
                            localStorage.setItem('tokem',usuario.token)
                            localStorage.setItem('idUser',usuario.id)
                            localStorage.setItem('nombreRol',usuario.rol.nombreRol)
                            localStorage.setItem('FechHoraInicioSecion',fecha.getTime())

                       if(usuario.rol.nombreRol == 'Administrador(a)'){
                           this.$router.push('/admin')
                       }else if( usuario.rol.nombreRol=='Secretaria(o)'){
                           this.$router.push('/secretaria')
                       }                       
                       else {
                           this.message = 'Aun no existe una vista para este usuario'
                           this.ShowSnackBar = true
                           setTimeout(()=>{this.ShowSnackBar = false},this.timeout)
                       }
                   }).catch(
                       error =>{
                           console.error(error)
                       }
                   )
           },
           verificaSession(){
               if(localStorage.getItem('tokem') != 'null'){
                    if(localStorage.getItem('nombreRol') == 'Administrador(a)'){
                        this.$router.push('/admin')
                    }else if( localStorage.getItem('nombreRol')=='Secretaria(o)'){
                        this.$router.push('/secretaria')
                    }
               }
           }
    },
    created(){
        this.verificaSession()
    }

}
</script>
