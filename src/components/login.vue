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
                                type="mail"
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
                            <v-col>
                               <div class="g-recaptcha" data-sitekey="6Ld_UtAUAAAAABmAStIaxEzCpMP8AKdUYePIuKir"></div>                
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn color="primary" :disabled="validForm"  @click="login" >ENTRAR</v-btn>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
            <v-snackbar v-model="snackBar" :color="colorSnakBar" :timeout="2000">
                {{textoSnackBar}}
                <v-btn text @click="snackBar = false">
                    Cerrar
                </v-btn>
            </v-snackbar>
        <!--<Appsnackbar  :snackBar="prba" :text="textoSnackBar" :timeout="timeout" :color="colorSnakBarSuces" /> !-->
        </v-container>
</template>
<script>
import {AXIOS} from '../config/axios'
import Appsnackbar from '@/components/snackBar'
export default {
    name : 'login',
    components:{Appsnackbar} ,
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            usuario :{ correo : '', password:''},
            timeout:5000,
            message:'',
            snackBar:false,
            colorSnakBar:'',
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
            textoSnackBar:'--',
            validForm:false,
            prba:true
            
        }
    },
    methods : {    
           login (){
                if(this.CheckForm(this.usuario)){
                    let responseCaptcha = document.getElementById("g-recaptcha-response").value
                    this.usuario.responseCaptcha = responseCaptcha
                    AXIOS.post('loginSeguro',this.usuario).then( response => {
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
                        } else if(usuario.rol.nombreRol=='Docente'){
                            this.$router.push('/docente')
                        }                      
                        else {
                            this.message = 'Aun no existe una vista para este usuario'
                            this.ShowSnackBar = true
                            setTimeout(()=>{this.ShowSnackBar = false},this.timeout)
                        }
                    }).catch(
                        error =>{
                            this.snackBar = true
                            this.colorSnakBar = this.colorSnackBarError
                            switch  (error.response.status)
                            {
                                    case 401:
                                        this.textoSnackBar ='Datos Incorrectos'
                                    break
                                    case 500:
                                        this.textoSnackBar ='Ocurrio un error interno'
                                        break
                                    default:
                                        this.textoSnackBar ='Error Desconocido'
                                        break
                            } 
                        }
                    )
                        
                   }else {
                        this.snackBar = true
                        this.colorSnakBar = this.colorSnackBarError
                        this.textoSnackBar ='Datos invalidos'
                   }
           },
           verificaSession(){
               if(localStorage.getItem('tokem') != 'null'){
                    if(localStorage.getItem('nombreRol') == 'Administrador(a)'){
                        this.$router.push('/admin')
                    }else if( localStorage.getItem('nombreRol')=='Secretaria(o)'){
                        this.$router.push('/secretaria')
                    }else if(localStorage.getItem('nombreRol')=='Docente'){
                        this.$router.push('/docente')
                    }
               }
           },
           CheckForm(usuario){
               if(usuario.correo == ''  || usuario.password == '' || !this.validEmail(usuario.correo)){
                   return false
               }else{
                   return true
               }
           },  
            validEmail:function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
    },
    created(){
        this.verificaSession()
    }

}
</script>
