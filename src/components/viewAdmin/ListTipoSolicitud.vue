<template>
    <v-container>
        <v-row>
            <v-col sm="8" >
                <h1> Lista de tipos de solicitud </h1>
            </v-col>
            <v-col sm="4" >
                <v-text-field
                label="Buscar"
                v-model="searchTipoSol"
                >

                </v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col sm="12" >
                <v-data-table
                :headers="headers"
                :items="lstaTiposSolicitud"
                :search="searchTipoSol"
                >
                    <template  v-slot:item.action={item}  >
                        <v-btn icon  @click="editar(item)">
                            <v-icon>
                                mdi-eye
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import {s_TipoSolicitud} from '@/API'
export default {
    name:'TiposSolicitud',
    data(){
        return{
            searchTipoSol:'',
            lstaTiposSolicitud:[],
            headers:[
                {
                    text:'Nombre Solicitud',
                    value:'nombresolicitud'
                },{
                    text:'Descripcion',
                    value:'descripcion'
                },{
                    text:'',
                    value:'action'
                }
            ]
        }
    },
    methods:{
        listarSolicitudes(){
            s_TipoSolicitud().then(
                response =>{
                    this.lstaTiposSolicitud = response.data
                }
            ).catch(
                error =>{

                }
            )
        }, editar(item){

        }
    },
    created(){
        this.listarSolicitudes()
    }
}
</script>