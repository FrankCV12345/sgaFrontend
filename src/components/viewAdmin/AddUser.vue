<template>
    <v-layout>
        <v-flex sm12>
                <v-form lazy-validation  >
                <h1>Registrar Usuario</h1>
                    <v-text-field
                        :counter="80"
                        label="Nombre"
                        v-model="usuario.nombre"
                        maxlength="80"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="Apellidos"
                        :counter="120"
                        v-model="usuario.apellidos"
                        required
                        maxlength="120"
                    ></v-text-field>
                    
                    
                    <v-text-field
                        :counter="7"
                        label="DNI"
                        v-model="usuario.dni"
                        required
                        type="number"
                        maxlength="7"
                    ></v-text-field>
                    
                    
                    <v-text-field
                        label="Telefono"
                        v-model="usuario.telefono"
                        :counter="9"
                        type="number"
                        required
                        maxlength="9"
                    ></v-text-field>
                    
                    <v-text-field
                        label="E-mail"
                        :counter="180"
                        v-model="usuario.correo"
                        :rules="[rules.mail]"
                        required
                        maxlength="180"
                    ></v-text-field>
                    
                    <v-text-field
                        label="Direccion"
                        v-model="usuario.direcion"
                        :counter="220"
                        required
                        maxlength="220"
                    ></v-text-field>
                    <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :return-value.sync="usuario.fechaNacimiento"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            label="Fecha Nacimiento"
                            prepend-icon="mdi-calendar"
                            v-model="usuario.fechaNacimiento"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="usuario.fechaNacimiento" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(usuario.fechaNacimiento)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    
                    <v-select
                        :items="tipoSexo"
                        item-text="nombreSexo"
                        item-value="id"
                        v-model="usuario.sexo.id"
                        label="Selecione Sexo"
                    >
                    </v-select>
                    <v-select
                        :items="tiposDoc"
                        item-text="nombreDoc"
                        item-value="id"
                        name="id"
                        v-model="usuario.tipoDoc.id"
                        label="Selecione Tipo Doc."
                    >
                    </v-select>
                    <v-select
                        :items="tipoRol"
                        item-text="nombreRol"
                        name='id'
                        v-model="usuario.rol.id"
                        item-value="id"
                        label="Selecione Tipo Rol."
                    >
                    </v-select>
                   
                    
                    
                    <v-row v-if="usuario.rol.id == 1">
                        <v-col sm="4" >
                            <v-text-field
                            label="Nombre Colegio"
                            :counter="220"
                            v-model="usuario.nombreColegio"
                            required
                            maxlength="220"
                            ></v-text-field>
                        </v-col>
                        <v-col sm="4" >
                             <v-select
                                :items="Sedes"
                                item-text="nombreSede"
                                item-value="id"
                                label="Selecione Sede."
                                name="id"
                                v-model="usuario.sede.id"
                            >
                            </v-select>
                        </v-col>
                        <v-col sm="4">
                                <v-select v-if="LstaSecciones != null"
                                    :items="LstaSecciones"
                                    item-text="NombreAndId"
                                    name='id'
                                    v-model="usuario.grupo.id"
                                    item-value="id"
                                    label="Selecione Seccion"
                                    >
                                </v-select>
                        </v-col>
                    </v-row>
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="guardarUsuario()"
                    >
                        Guardar
                    </v-btn>
                
                    <v-btn
                        color="warning"
                    >
                        Cancelar
                    </v-btn>
        
                </v-form>

        </v-flex>
        <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
            {{messageSnackBar}}
            <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
        </v-snackbar>
    </v-layout>
</template>
<script>
import Appsnackbar from '@/components/snackBar'
import {s_listaSexo,s_listaTipoDoc,s_listaRol,s_listaSedes,s_registraUser,s_ListaSecciones,Func_LlenaCeros,Func_TextoTipoError} from '@/API'
import {Func_IsNulOrEmpty} from '@/validations/validate.js'
export default {
    name:'AddUser',
    components:{Appsnackbar} ,
    data(){
        return {
         usuario :{
            nombre: null,
            apellidos: null,
            direcion: null,
            dni: null,
            correo: null,
            telefono: null,
            nombreColegio: null,
            fechaNacimiento: new Date().toISOString().substr(0, 10),
            sexo: {
                id: null
            },
            tipoDoc: {
                id: null
                
            },
            sede: {
                id: null
            },
            grupo:{
                id:null
            },
            rol: {
                id: null
            }
        },
        tiposDoc:[],
        tipoSexo:[],
        tipoRol:[],
        Sedes:[],
        LstaSecciones:null,
        showNackBar:false,
        messageSnackBar:'',
        timeout:2000,
        colorSnackBar:'', 
        colorSnakBarSuces:'cyan darken-2',
        colorSnackBarError:'error',
        rules:{
            mail: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'e-mail Invalido'
            }
        }
        }
    },
    created(){
        this.listaTipoDoc(),
        this.ListaTipoSexo(),
        this.listaRoles(),
        this.listaSedes(),
        this.ListarSecciones()
    },
    methods:{
        listaTipoDoc(){
               s_listaTipoDoc().then(
                response => {
                    
                    this.tiposDoc = response.data
                }).catch(
                   error => {
                       console.log(error)
                   })
        },
        ListaTipoSexo(){
             s_listaSexo().then(
                        response =>{
                            this.tipoSexo = response.data
                           
                        }
                ).catch(
                    error => {
                        console.error(error)
                    }
                )
        },
        listaSedes(){
                s_listaSedes().then(
                    response => {
                        this.Sedes = response.data
                    }
                ).catch(
                    error=>{
                        console.log(error)
                    }
                )
        },
        listaRoles(){
            s_listaRol().then(
                response => {
                    this.tipoRol = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
         ListarSecciones:function(){
            s_ListaSecciones().then(
                response =>{
                    this.LstaSecciones = response.data
                    for(let i = 0 ; i < response.data.length; i++ ){
                        this.LstaSecciones[i].NombreAndId =  this.LlenaCeros(response.data[i].id,5,'SEC') +" - "+ response.data[i].carrera.nombre +" - "+response.data[i].turno.nombreturno
                    }
                }
            ).catch(
                error =>{
                    this.messageSnackBar='Error al listar Secciones.'
                    this.colorSnackBar = this.colorSnackBarError
                    this.showNackBar =true
                }
            )
        }
        ,
        guardarUsuario(){ 
            let usuario = this.usuario
            let isNullOrEmpty = this.evaluaNullOrEmpty(
                [
                    usuario.nombre , 
                    usuario.apellidos,
                    usuario.direcion,
                    usuario.dni,
                    usuario.correo,
                    usuario.telefono,
                    usuario.rol.id,
                    usuario.sexo.id,
                    usuario.tipoDoc.id
                ]
                 )


            if(!isNullOrEmpty && !this.ValidaCamposParaAlumno(usuario)){
                s_registraUser(usuario).then(
                response =>{
                    this.showNackBar = true
                    this.messageSnackBar='Usuario Registrado'
                    this.colorSnackBar = this.colorSnakBarSuces       
                }
                ).catch(
                    error =>{
                        this.messageSnackBar = Func_TextoTipoError(error.response.status)
                        this.colorSnackBar= this.colorSnackBarError
                        this.showNackBar = true
                    }
                )
            }else{
                this.messageSnackBar = 'Campos invalidos o vacios'
                this.colorSnackBar= this.colorSnackBarError
                this.showNackBar = true

            }
            
        },LlenaCeros (numero , cantidadCeros,letra){
            return  Func_LlenaCeros(numero , cantidadCeros,letra)
        },evaluaNullOrEmpty(arreglo){
            return Func_IsNulOrEmpty(arreglo)
        },ValidaCamposParaAlumno(usuario){
            let isAlumno = usuario.rol.id == 1 ? true : false
            if(usuario.dni.length == 7 && usuario.telefono.length == 9){    
                if(isAlumno){
                    if(usuario.sede.id == null || usuario.nombreColegio == null || usuario.grupo.id == null ){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }else{
                return true
            }
        }
    },
    computed:{
    }
}
</script>