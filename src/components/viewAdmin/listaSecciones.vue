<template>
    <v-layout>
        <v-flex sm12>
            <v-list>
                <v-list-item v-for="seccion in listaSecciones" :key="seccion.id" @click="verSeccion()" >
                    <v-list-item-content>
                       
                         <v-list-item-title v-text="seccion.id" ></v-list-item-title>
                        <v-list-item-subtitle v-text="seccion.fechaInicio"></v-list-item-subtitle>
                        <v-list-item-subtitle v-text="seccion.fechaFin"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>
    </v-layout>
</template>
<script>
import {s_ListaSecciones} from '@/API'
export default {
    name:'listaSecciones',
    data(){
        return {
            listaSecciones:[]
        }
    },
    methods:{
        ListarSecciones(){
            s_ListaSecciones().then(
                response => {
                    this.listaSecciones =  response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        verSeccion(){}
    },
    created(){
        this.ListarSecciones()
    }
}
</script>