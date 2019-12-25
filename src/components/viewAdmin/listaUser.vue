<template>
    <v-layout>
        <v-flex sm12>
            <v-list>
                <v-list-item v-for="user in listaUsers" :key='user.id' >
                    <v-btn icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon @click="detalleUser(user)">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-list-item-content>
                        <v-list-item-title v-text="user.nombre" ></v-list-item-title>
                        <v-list-item-subtitle v-text="user.rol.nombreRol"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>
        <v-dialog persistent scrollable max-width="600px" v-model="dialogViewUser" >
            <v-card style="height: 400px;">
                <v-card-title>{{userSelected.nombre +" "+userSelected.apellidos}}</v-card-title>
                <v-card-subtitle>{{userSelected.rol.nombreRol}}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text >
                    <p class="text-sm-left"><b> CORREO :</b> {{userSelected.correo}}</p>
                    <p class="text-sm-left"><b> TELEFONO :</b> {{userSelected.telefono}}</p>
                    <v-row v-if="userSelected.rol.id ==  1 ">
                        <v-col sm12 v-if="userSelected.grupo.id != null">
                            
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
    </v-layout>
</template>
<script>
import {s_ListaUsers,s_ListaSecciones,s_ActulizaUsers} from '@/API'
export default {
    name:'listaUser',
    data(){
        return {
            listaUsers :[],
            dialogViewUser:false,
            userSelected:{id:'',nombre:'',apellidos:'',correo:'',telefono:'',rol:{id:'',nombreRol:''},grupo:{id:'',carrera:{id:'',nombre:''}}},
            listaSecciones:[]

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
            console.log(user)
            this.userSelected=user;
            this.dialogViewUser = true;

        },
        delteUser(id){

        },
        listarSesciones(){
            s_ListaSecciones().then(
                response =>{
                    for(let i =0 ; i< response.data.length ; i ++){
                        response.data[i].idLLenado = this.llenaCeros(response.data[i].id,5,'S')
                    }
                    
                    this.listaSecciones = response.data
                    console.log(this.listaSecciones)
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