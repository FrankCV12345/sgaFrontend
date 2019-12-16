<template>
    <v-layout>
        <v-flex sm12>
            <v-list>
                <v-list-item v-for="user in listaUsers" :key='user.id' @click="detalleUser(user.id)">
                    <v-list-item-content>
                        <v-list-item-title v-text="user.nombre" ></v-list-item-title>
                        <v-list-item-subtitle v-text="user.rol.nombreRol"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>
        
    </v-layout>
</template>
<script>
import {s_ListaUsers} from '@/API'
export default {
    name:'listaUser',
    data(){
        return {
            listaUsers :[]
        }
    },
    created(){
         this.listarUsers()
    },
    methods:{
        listarUsers(){
            s_ListaUsers().then(
                resposne => {
                    this.listaUsers =  resposne.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        detalleUser(id){

        }

    }
}
</script>