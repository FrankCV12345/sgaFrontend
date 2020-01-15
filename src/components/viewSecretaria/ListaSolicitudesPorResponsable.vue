<template>
    <v-container>
        <v-row>
            <v-col sm="8"> <h2>Mis Solicitudes atendidas</h2> </v-col>
            <v-col sm="4" >
                <v-text-field
                label="Buscar"
                v-model="searchSolicitud"
                >

                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col  sm="12"  v-if="listasolicitudes != null" > 
                <v-data-table
                :headers="headers"
                :items="listasolicitudes"
                :search="searchSolicitud"
                >
                    <template   v-slot:item.action={item} >
                        <v-btn v-if="item.estadosolicitud.id != 6" icon @click="VerSolicitud(item)">
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogSolicitud" persistent scrollable max-width="900px" >
            <v-card v-if="solicitudSelected !=null && listaTiposEstado !=null">
                <v-card-title>{{llenaCeros(solicitudSelected.id,5,'SOL')}}</v-card-title>
                <v-card-subtitle></v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text>
                     <v-row>
                        <v-col sm="6">Tipo Solicitud : {{solicitudSelected.tiposolicitud.nombresolicitud}}</v-col>
                        <v-col sm="6">Correo Alumno :{{solicitudSelected.usuariosolicitud.correo}} </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="6">Comentarios : {{solicitudSelected.comentarios }}</v-col>
                        <v-col sm="6">
                            <v-select
                                :items="listaTiposEstado"
                                item-text="nombresolicitud"
                                item-value="id"
                                v-on:change="ActualizarEstadoSolciitud()"
                                v-model="solicitudSelected.estadosolicitud.id"
                                label="Estado Solicitud"
                            >
                            </v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click=" dialogSolicitud = false">Cerrar</v-btn>
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
import {s_ListaSolicitudesPorResponsable,Func_LlenaCeros,s_EstadosSolicitud ,s_Actualizasolicitud} from '@/API'
export default {
    name:'solicitudesPorResponsable',
    data(){
        return{
            searchSolicitud:'',
            listasolicitudes : null,
            solicitudSelected:null,
            dialogSolicitud:false,
            listaTiposEstado : null,
            showNackBar:false,
            headers:[
                {
                    text:'ID Solicitud',
                    value:'idllenado'
                },
                {
                    text:'Tipo Solicitud',
                    value:'tiposolicitud.nombresolicitud'
                },
                {
                    text:'Estado',
                    value:'estadosolicitud.nombresolicitud'
                },
                {
                    text:'',
                    value:'action'
                }
            ],
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
        }
    },
    methods:{
        listarSolicitudes(){
            s_ListaSolicitudesPorResponsable().then(
                response => {
                    this.listasolicitudes = response.data
                   for(let i =0 ; i < response.data.length ; i ++){
                       this.listasolicitudes[i].idllenado =  this.llenaCeros(
                           response.data[i].id,
                           5,'SEC'
                       )

                   }
                }
            ).catch(
                error =>{
                    alert("error a listar solcitudes")

                }
            )
        },
        listarEstadosSolicitud(){
            s_EstadosSolicitud().then(
                response =>{
                    this.listaTiposEstado = response.data
                }
            ).catch(
                error=>{
                    console.error(error)
                }
            )
        },
          ActualizarEstadoSolciitud(){
            this.solicitudSelected.usuarioresponsable = {id:parseInt(localStorage.getItem("idUser"))}
            s_Actualizasolicitud(this.solicitudSelected).then(
                response =>{
                    this.showNackBar = true
                    this.messageSnackBar ='Se modifico el estado correctamente.'
                    this.timeout = 5000
                    this.colorSnackBar = this.colorSnakBarSuces
                }
            ).catch(
                error =>{
                    
                    this.showNackBar = true
                    this.messageSnackBar ='Error al modificar el estado'
                    this.timeout = 5000
                    this.colorSnackBar = this.colorSnackBarError
                }
            )
        },
        VerSolicitud(solicitud){
            this.dialogSolicitud = true
            this.solicitudSelected = solicitud
        },
        llenaCeros(num,cant,letra){
           return Func_LlenaCeros(num,cant,letra)
        }
    },
    created(){
        this.listarSolicitudes(),
        this.listarEstadosSolicitud()
    }
}
</script>