<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-col sm="8" xs="12" >
                    <h1>Lista de Cursos</h1>
                </v-col>
                <v-col sm="4" xs="12"  >
                    <v-text-field
                    v-model="search"
                    flat
                    label="Buscar curso"
                    solo-inverted
                    ></v-text-field>
                </v-col>
            </v-row>
             <v-row>
                <v-col sm="12" >
                    <v-data-table
                        :headers="headersListCursos"
                        :items="listaCursos"
                        :search="search"
                    >
                        <template v-slot:item.action={item} >
                            <v-btn icon @click="dialogConfirmElimina = true , idDeleted = curso.id">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-btn icon @click="OpenDialoEditCurso(item)">
                                <v-icon>mdi-grease-pencil</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-flex>
        <v-dialog v-model="dialoEditcurso" v-if="cursoSelected != null" persistent max-width="900px" >
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col sm="12">
                            <v-text-field v-model="cursoSelected.nombrecurso" :counter="30" maxlength="30">

                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="12">
                            <v-text-field v-model="cursoSelected.descripioncurso" :counter="120" maxlength="120" >

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
        <v-dialog v-model="dialogConfirmElimina" max-width="350px" persistent>
            <v-card>
                <v-card-title>Esta seguro que quiere eliminar este curso ? </v-card-title>
                <v-spacer></v-spacer>
                <v-card-actions>
                    <v-btn color="red darken-4"  class="white--text" @click="deleteCurso()" >Eliminar</v-btn>
                    <v-btn @click="dialogConfirmElimina = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackBar" :color="colorSnakBar" :timeout="timeout" >{{textoSnackBar}}</v-snackbar>
    </v-layout>
</template>
<script>
import {s_ListaCursos, s_EditaCurso,s_EliminaCurso} from '@/API'
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
            timeout:2000,
            dialogConfirmElimina:false,
            EliminaStatus:false,
            idDeleted:null,
            headersListCursos:[
                {
                text:"Nombre del Curso",
                value:"nombrecurso"
                },{
                text:"Descripcion",
                value:"descripioncurso"
                },{
                    text:'',
                    value:'action'
                }
            ]

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
        },
        deleteCurso(){
           
                s_EliminaCurso(this.idDeleted).then(
                    response =>{
                        this.colorSnakBar = this.colorSnakBarSuces
                        this.textoSnackBar = "Eliminado correctamente"
                        this.snackBar= true
                        this.dialogConfirmElimina = false
                    }
                ).catch(
                    error =>{
                        this.colorSnakBar = this.colorSnackBarError
                        this.textoSnackBar = "No se pudo Eliminar"
                        this.snackBar= true
                        this.dialogConfirmElimina = false
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