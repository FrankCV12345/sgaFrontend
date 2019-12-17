<template>
    <v-layout>
        <v-flex sm12>
            <v-list>
                <v-list-item v-for="curso in listaCursos" :key="curso.id">
                    <v-list-item-content>
                        <v-list-item-title v-text="curso.nombrecurso"></v-list-item-title>
                        <v-list-item-subtitle v-text="curso.descripioncurso"></v-list-item-subtitle>                    
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>

    </v-layout>
</template>
<script>
import {s_ListaCursos} from '@/API'
export default {
    name:'ListaCursos',
    data(){
        return {
            listaCursos:[]
        }
    },
    methods:{
        listarCursos(){
            s_ListaCursos().then(
                response => {
                    this.listaCursos = response.data
                    console.log(this.listaCursos)
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        }
    },
    created(){
        this.listarCursos()
    }
}
</script>