<template>
    <v-layout>
        <v-flex sm12>

            <h1>Agregar Curso</h1>
            <v-text-field v-model="curso.nombrecurso" :counter="30" label="Nombre Curso" required></v-text-field>
            <v-text-field v-model="curso.descripioncurso" :counter="120" label="Descripcion Curso" required></v-text-field>
            <v-btn
                color="primary"
            >
                Guardar
            </v-btn>
            <v-btn>
                Cancelar
            </v-btn>
        </v-flex>
    </v-layout>
</template>
<script>
import {dsa} from '@/API'
export default {
    name:'addCurso',
    data(){
        return {
            curso :{
                    nombrecurso:'',
                    descripioncurso:'',
                    sfotdelete: false
                }
        }
    },
    methods:{
        registraUser(){

        }
    },
    created(){

    }
}
</script>