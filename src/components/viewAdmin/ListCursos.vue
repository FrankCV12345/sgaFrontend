<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-col sm="4">
                    <v-text-field
                    v-model="search"
                    flat
                    label="Buscar curso"
                    solo-inverted
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-list>
                <v-list-item v-for="curso in listaCursos" :key="curso.id">
                    <v-btn icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon @click="OpenDialoEditCurso(curso)">
                        <v-icon>mdi-grease-pencil</v-icon>
                    </v-btn>
                    <v-list-item-content>
                        <v-list-item-title v-text="curso.nombrecurso"></v-list-item-title>
                        <v-list-item-subtitle v-text="curso.descripioncurso"></v-list-item-subtitle>                    
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>
        <v-dialog v-model="dialoEditcurso" v-if="cursoSelected != null" persistent max-width="900px" >
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col sm="12">
                            <v-text-field v-model="cursoSelected.nombrecurso" >

                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="12">
                            <v-text-field v-model="cursoSelected.descripioncurso" >

                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="EditarCurso()" >Actualizar</v-btn>
                    <v-btn @click="dialoEditcurso = false" >Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackBar" :color="colorSnakBar" :timeout="timeout" >{{textoSnackBar}}</v-snackbar>
    </v-layout>
</template>
<script>
import {s_ListaCursos, s_EditaCurso} from '@/API'
export default {
    name:'ListaCursos',
    data(){
        return {
            listaCursos:[],
            search:'',
            searchItem:[],
            dialoEditcurso : false,
            cursoSelected :  null,
            snackBar:false,
            colorSnakBar:'',
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
            textoSnackBar:'',
            timeout:2000
        }
    },
    methods:{
        listarCursos(){
            s_ListaCursos().then(
                response => {
                    this.listaCursos = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        OpenDialoEditCurso(curso){
            this.dialoEditcurso = true
            this.cursoSelected = curso
        },
        EditarCurso(){
            s_EditaCurso(this.cursoSelected).then(
                response =>{
                    this.cursoSelected = response.data
                    this.colorSnakBar = this.colorSnakBarSuces
                    this.textoSnackBar = "Actualizado correctamente"
                    this.snackBar= true
                    this.dialoEditcurso = false
                }
            ).catch(
                error =>{
                    this.colorSnakBar = this.colorSnackBarError
                    this.textoSnackBar = "Error al actualizar"
                    this.snackBar= true
                    this.dialoEditcurso = false
                }
            )
        }
    },
    created(){
        this.listarCursos()
    }, 
    computed: {
        filteredItems() {
        return this.searchItem.filter((item) =>{
            return item.nombrecurso.toLowerCase().match(this.search)  
        });
    }
  },
  mounted() {
      setTimeout(() => this.searchItem = this.listaCursos)
    }
}
</script>