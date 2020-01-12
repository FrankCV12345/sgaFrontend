<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-row>
                    <v-col sm="8" ><h1>Lista de Usuarios</h1></v-col>
                    <v-col sm="4">
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-glasses"
                        label="Buscar"
                        single-line
                        hide-details
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-col sm="12">
                    <v-data-table
                        :headers="headers"
                        :items="listaUsers"
                        :search="search"
                    >
                        <template v-slot:item.action={item}  >
                            <v-btn color="red darken-3" icon @click="delteUser(item,false)" v-if="item.habilitado == true">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn color="blue darken-3" icon v-else @click="habilitarUser(item)" >
                                <v-icon>mdi-account-check</v-icon>
                            </v-btn>
                            <v-btn icon @click="detalleUser(item)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
           
        </v-flex>
        <v-dialog persistent scrollable max-width="600px" v-model="dialogViewUser" >
            <v-card style="height: 400px;">
                <v-card-title>{{userSelected.nombre +" "+userSelected.apellidos}}</v-card-title>
                <v-card-subtitle>{{userSelected.rol.nombreRol}}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text >
                    <p class="text-sm-left"><b> CORREO :</b> {{userSelected.correo}}</p>
                    <p class="text-sm-left"><b> TELEFONO :</b> {{userSelected.telefono}}</p>
                    <p class="text-sm-left"><b> DNI :</b> {{userSelected.dni}}</p>
                    <v-row v-if="userSelected.rol.id ==  1 ">
                        <v-col  class="text-sm-left" sm12 v-if="userSelected.grupo.id != null">
                            
                            <b> SECCION :</b> {{llenaCeros(userSelected.grupo.id,5,'S')}}
                    
                        </v-col>
                        <v-col sm12 v-else >
                            <v-select 
                            :items="listaSecciones"
                            item-text="idLLenado"
                            item-value="id"
                            v-model="userSelected.grupo.id"
                            label="Selecione Seccion Grupo"
                            ></v-select>
                                
                        </v-col>
                    </v-row>
                    

                </v-card-text>
                <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialogViewUser = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="ActualizaUsuario()" >Save</v-btn>
                </v-card-actions>
            </v-card>
            
        </v-dialog>
        <v-dialog v-model="DialogConfirmDisableOrEnabled"  persistent max-width="300px">
            <v-card>
                <v-card-text><h3>Desea Deshabilitar Este usuario ?</h3></v-card-text>
                <v-card-actions>
                    
                    <v-btn color="red darken-3" class="white--text" @click="delteUser(undefined,true)"> SI</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn  @click="DialogConfirmDisableOrEnabled = false">NO</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>
<script>
import {s_ListaUsers,s_ListaSecciones,s_ActulizaUsers,s_InHabilitaUsuario,s_HabilitaUsuario} from '@/API'
export default {
    name:'listaUser',
    data(){
        return {
            listaUsers :[],
            dialogViewUser:false,
            userSelected:{id:'',nombre:'',apellidos:'',correo:'',telefono:'',rol:{id:'',nombreRol:''},grupo:{id:'',carrera:{id:'',nombre:''}}},
            userEnabledOrDisabled:null,
            listaSecciones:[],
            search:'',
            DialogConfirmDisableOrEnabled:false,
            headers:[
                {
                    text: 'Nombre',
                    value: 'nombre',
                },{
                    text: 'Apellidos',
                    value: 'apellidos',
                },{
                    text: 'Correo',
                    value: 'correo',
                },
                {
                    text: 'Rol',
                    value: 'rol.nombreRol',
                },
                {
                    text: 'Telefono',
                    value: 'telefono',
                },
                { 
                    text: 'Actions', 
                    value: 'action',
                    sortable: false 
                }
            ]

        }
    },
    created(){
         this.listarUsers(),
         this.listarSesciones()
    },
    methods:{
        listarUsers(){
            s_ListaUsers().then(
                resposne => {
                    for(let i =0 ; i < resposne.data.length ; i ++){
                        if(resposne.data[i].grupo == null && resposne.data[i].rol.id == 1){
                            resposne.data[i].grupo ={id:null,carrera:{id:'',nombre:''}}
                        }
                    }
                    this.listaUsers =  resposne.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        detalleUser(user){
            this.userSelected=user;
            this.dialogViewUser = true;

        },
        delteUser(item,isConfirm){
            if(isConfirm && item == undefined){      
                s_InHabilitaUsuario(this.userEnabledOrDisabled.id).then(
                    response =>{
                        this.userEnabledOrDisabled.habilitado = response.data
                        this. listarUsers()
                        this.DialogConfirmDisableOrEnabled = false
                    }
                ).catch(
                    error =>{
                        console.error(error)
                    }
                )
            }else{

                this.userEnabledOrDisabled = item
                this.DialogConfirmDisableOrEnabled = true
            }
        },
        listarSesciones(){
            s_ListaSecciones().then(
                response =>{
                    for(let i =0 ; i< response.data.length ; i ++){
                        response.data[i].idLLenado = this.llenaCeros(response.data[i].id,5,'S')
                    }
                    
                    this.listaSecciones = response.data
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
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
        },
        habilitarUser(item){
            s_HabilitaUsuario(item.id).then(
                response =>{
                    this.listarUsers()
                }
            ).catch(
                error =>{

                }
            )
        }
        ,
        ActualizaUsuario(){
            s_ActulizaUsers(this.userSelected.id,this.userSelected).then(
                response => {
                    console.log(response)
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        }

    }
}
</script>