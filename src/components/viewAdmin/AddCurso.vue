<template>
    <v-layout>
        <v-flex sm12>

            <h1>Agregar Curso</h1>
            <v-text-field v-model="curso.nombrecurso" :counter="30" label="Nombre Curso" required></v-text-field>
            <v-text-field v-model="curso.descripioncurso" :counter="120" label="Descripcion Curso" required></v-text-field>
            <v-btn
                color="primary"
                @click="registraCuro()"
            >
                Guardar
            </v-btn>
            <v-btn>
                Cancelar
            </v-btn>
            <v-snackbar v-model="snackBar" :color="colorSnakBar" :timeout="2000">
                {{textoSnackBar}}
                <v-btn text @click="snackBar = false">
                    Cerrar
                </v-btn>
            </v-snackbar>
        </v-flex>
    </v-layout>
</template>
<script>
import {s_RegistraCurso} from '@/API'
export default {
    name:'addCurso',
    data(){
        return {
            curso :{
                    nombrecurso:'',
                    descripioncurso:'',
                    sfotdelete: false
                },
            snackBar:false,
            textoSnackBar:'Registrado',
            colorSnakBar:'',
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error'
        }
    },
    methods:{
        registraCuro(){
            s_RegistraCurso(this.curso).then(
                response => {
                    if(response.status == 201){
                   
                        this.textoSnackBar = "Se registro Correctamente"
                        this.colorSnakBar = this.colorSnakBarSuces
                        this.snackBar = true
                    }
                }
            ).catch(
                error => {
                    this.textoSnackBar = "Ocurrio un error "
                    this.colorSnakBar = this.colorSnackBarError
                    this.snackBar = true
                }
            )

        }
    },
    created(){

    }
}
</script>