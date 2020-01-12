<template>
    <v-container>
        <v-form>
            <v-row>
                <v-col sm="12" >
                    <h1> Actualizar Datos </h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" >
                    <v-text-field
                        :counter="80"
                        label="Nombre"
                         v-model="usuario.nombre"
                        maxlength="80"
                        required
                    ></v-text-field>
                </v-col>
                <v-col sm="4" >
                    <v-text-field
                        :counter="120"
                        label="Apellidos"
                        v-model="usuario.apellidos"
                        required
                        maxlength="120"
                    >
                    </v-text-field>
                </v-col>
                <v-col sm="4" >
                    <v-text-field
                    :counter="8"
                    v-model="usuario.dni"
                    required
                    label="DNI"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" >
                    <v-text-field
                    :counter="180"
                    label="Correo"
                    v-model="usuario.correo"
                    ></v-text-field>

                </v-col>
                <v-col sm="4" >
                    <v-text-field
                        label="Direccion"
                        v-model="usuario.direcion"
                        :counter="220"
                        required
                        maxlength="220"
                    ></v-text-field>
                </v-col>
                <v-col sm="4" >
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
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" > 
                    <v-select
                        :items="tipoSexo"
                        item-text="nombreSexo"
                        item-value="id"
                        v-model="usuario.sexo.id"
                        label="Selecione Sexo"
                    >
                    </v-select>
                    </v-col>
                <v-col sm="4" >
                     <v-select
                        :items="tiposDoc"
                        item-text="nombreDoc"
                        item-value="id"
                        name="id"
                        v-model="usuario.tipoDoc.id"
                        label="Selecione Tipo Doc."
                    >
                    </v-select>
                </v-col>
                <v-col sm="4" >
                    <v-btn color="blue darken-4" @click=" DialogCambiaContra = true" class="white--text" >
                        Actualizar Contrasena
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6" >
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="ActualizaDatosUser()"
                    >
                        Actualizar
                    </v-btn>
                </v-col>
                <v-col sm="6" >
                    <v-btn
                    color="warning"
                    >
                        Cancelar
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
        <v-dialog v-model="DialogCambiaContra" max-width="350" persistent>
            <v-card>    
                <v-card-title>Actualizar contrasena</v-card-title>
                <v-card-text>
                    <v-text-field
                        label="Contrasena anterior"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        label="Nueva contrasena"
                    ></v-text-field>
                    <v-text-field
                        type="password"
                        label="Confirme nueva contrasena"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="light-blue darken-4"  class="white--text"> Actualizar</v-btn>
                    <v-btn text @click="DialogCambiaContra = false"  >Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
            {{messageSnackBar}}
            <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import {s_VerUsuario,s_listaSexo,s_listaTipoDoc,s_ActulizaUsers} from '@/API'
export default {
    name:'UsuarioEdit',
    data(){
        return {
            DialogCambiaContra:false,
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
                rol: {
                    id: null
                },
                sede: {
                    id: null
                },
                grupo:{
                    id:null
                }
        },
        tipoSexo:[],
        tiposDoc:[],
        showNackBar:false,
        messageSnackBar:'',
        timeout:2000,
        colorSnackBar:'', 
        colorSnakBarSuces:'cyan darken-2',
        colorSnackBarError:'error',
        }
    },
    methods :{
        VerUSuario(){
            let id = localStorage.getItem("idUser")
            s_VerUsuario(id).then(
                response =>{
                    this.usuario = response.data
                }
            ).catch(
                error =>{

                }
            )
        },ListarTipoSexo(){
            s_listaSexo().then(
                response =>{
                    this.tipoSexo = response.data
                }
            ).catch(
                error =>{
                    console.log(error)
                }
            )
        },
        listarTipoDoc(){
            s_listaTipoDoc().then(
                response =>{
                    this.tiposDoc = response.data
                }
            ).catch(
                error =>{
                    console.log(error)
                }
            )
        },ActualizaDatosUser(){
            s_ActulizaUsers(this.usuario.id,this.usuario).then(
                response =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Usuario Actualizado correctamente'
                    this.colorSnackBar =  this.colorSnakBarSuces 
                }
            ).catch(
                error =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Error'
                    this.colorSnackBar =  this.colorSnackBarError 
                }
            )
        }
    },
    created(){
        this.VerUSuario(),
        this.listarTipoDoc(),
        this.ListarTipoSexo()
    }
}
</script>