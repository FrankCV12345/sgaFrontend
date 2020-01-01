<template>
    <v-container>
        <v-row>
            <v-col sm="12">
                <h2>Solicitudes de los alumnos</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12">
                <v-list>
                    <v-list-item v-for=" item in listaSolicitudes " :key="item.id" >
                        <v-btn icon @click="VerSolicitud(item)">
                            <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-list-item-content>
                            <v-list-item-title>{{llenaCeros(item.id,5,'SOL')}} <v-spacer></v-spacer>  Tipo :{{item.tiposolicitud.nombresolicitud}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
        <v-dialog  v-model="dialogSolictud" scrollable persistent max-width="980px" >
            <v-card v-if="solicitudSelected != null &&  listaTiposEstado!=null">
                <v-card-title>{{llenaCeros(solicitudSelected.id,5,'SOL')}}</v-card-title>
                <v-card-subtitle>Fecha De solicitud :  {{solicitudSelected.fechaingresosolicitud}}</v-card-subtitle>
                <v-divider></v-divider>
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
                    <v-btn color="blue darken-1" text @click="dialogSolictud = false ">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import {s_ListaSolicitdes ,s_EstadosSolicitud,s_Actualizasolicitud } from '@/API'
export default {
    name:'Solicitudes',
    data(){
        return{
            listaSolicitudes:[],
            dialogSolictud:false,
            solicitudSelected : null,
            listaTiposEstado :null
        }
    },
    methods:{
        listarSolicitudes(){
            s_ListaSolicitdes().then(
                response =>{
                    this.listarEstadosSolicitud()
                    this.listaSolicitudes =  response.data
                }).catch(
                error =>{
                    console.error(error)
                })
        } ,
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
                    console.log("respuesta",response.data)
                }
            ).catch(
                error =>{
                    alert("Error")
                }
            )
        }
        ,
        VerSolicitud(solicitud){
            this.dialogSolictud = true
            this.solicitudSelected =  solicitud
        }
        ,
        llenaCeros(numero , cantidadCeros,letra){
            let numeroRellenado = ""+numero;
            for(let i =0 ; i <= cantidadCeros; i++){
                if(numeroRellenado.length < cantidadCeros ){
                     numeroRellenado="0"+numeroRellenado
                }else{
                     numeroRellenado=   letra + numeroRellenado     
                    break
                }
            }
            return numeroRellenado
        }
    },
    created(){
        this.listarSolicitudes()

    }
}
</script>