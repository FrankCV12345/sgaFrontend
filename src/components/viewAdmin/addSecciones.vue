<template>
    <v-layout>
        <v-flex sm12>
            <v-form lazy-validation  >
                <h1>Registro Seccion</h1>
                 <v-menu
                    ref="menuFechaInicio"
                    :close-on-content-click="false"
                    :return-value.sync="seccion.fechaInicio"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            label="Fecha Inicio"
                            prepend-icon="mdi-calendar"
                            v-model="seccion.fechaInicio"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="seccion.fechaInicio" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuFechaInicio = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuFechaInicio.save(seccion.fechaInicio)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>

                    <v-menu
                    ref="menuFechaFin"
                    :close-on-content-click="false"
                    :return-value.sync="seccion.fechaFin"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            label="Fecha Fin"
                            prepend-icon="mdi-calendar"
                            v-model="seccion.fechaFin"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="seccion.fechaFin" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menuFechaFin = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menuFechaFin.save(seccion.fechaFin)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    <v-select
                        :items="listaModalidades"
                        item-text="nombre"
                        item-value="id"
                        v-model="seccion.modalidad.id"
                        label="Selecione Modalidad"
                    >
                    </v-select>
                    
                    <v-select
                        :items="listaTurnos"
                        item-text="nombreturno"
                        item-value="id"
                        v-model="seccion.turno.id"
                        label="Selecione Turno"
                    >
                    </v-select>
                    <v-select
                        :items="listaCarreras"
                        item-text="nombre"
                        item-value="id"
                        v-on:change="listarCiclosParaCarrera(seccion.carrera.id)"
                        v-model="seccion.carrera.id"
                        label="Selecione Carrera"
                    >
                    </v-select>
                    <v-select
                        :items="listaCicloParaCarrera"
                        item-text="nrociclo"
                        item-value="id"
                        v-model="seccion.ciclo.id"
                        label="Selecione Ciclo"
                    >
                    </v-select>
                    <v-row>
                            <v-col sm="2">
                                <v-btn color="primary" @click="addCurso()">
                                        <v-icon>mdi-plus-box</v-icon>
                                        <span> Agregar Curso </span>
                                </v-btn> 
                                </v-col>
                                <v-col sm="10">

                                </v-col>
                    </v-row> 
                     <v-row v-for=" curso in seccion.cursos" :key="curso.id" >
                                <v-col sm="5">
                                    <v-select 
                                    :items="listaCursos"
                                    item-text="nombrecurso"
                                    item-value="id"
                                    v-model="curso.curso.id"
                                    label="Seleciones Curso"
                                    ></v-select>
                                </v-col>
                                <v-col sm="5">
                                    <v-select 
                                    :items="listaProfesores"
                                    item-text="nombre"
                                    item-value="id"
                                    v-model="curso.profesor.id"
                                    label="Seleciones profesor"
                                    ></v-select>
                                </v-col>
                                <v-col sm="2">
                                    <v-btn icon @click="QuitarCurso(curso)">
                                        <v-icon color="red darken-2">mdi-playlist-remove</v-icon>
                                    </v-btn>
                                </v-col>
                    </v-row>
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="guardarSeccion()"
                    >
                        Guardar
                    </v-btn>
                
                    <v-btn
                        color="warning"
                        @click="vaciar()"
                    >
                        Cancelar
                    </v-btn>
            </v-form>
             <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
                {{messageSnackBar}}
                <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
            </v-snackbar>
        </v-flex>
    </v-layout>
</template>
<script>
import {s_ListaModalidades, s_ListaTurnos,s_ListaCarreas,s_ListaCiclosParaCarrera,s_RegistraSeccion,s_ListaProfesores,s_ListaCursos,s_RegistraCursosGrupo}  from '@/API'
export default {
    name:'addSecciones',
    data(){
        return {
            seccion :{
                        fechaInicio:'',
                        fechaFin:'',
                        softdelete: false,
                        carrera: {
                            id: null
                        },
                        turno: {
                            id:null
                        },
                        ciclo: {
                            id: null
                        },
                        modalidad: {
                            id: null
                        },
                        cursos:[
                            
                        ]
                    },
                    menuFechaInicio:false,
                    menuFechaFin:false,
                    listaModalidades:[],
                    listaTurnos:[],
                    listaCarreras:[],
                    listaCicloParaCarrera:[],
                    listaProfesores:[],
                    listaCursos:[],
                    showNackBar:false,
                    messageSnackBar:'',
                    timeout:2000,
                    colorSnackBar:'', 
                    colorSnakBarSuces:'cyan darken-2',
                    colorSnackBarError:'error',
        }
    },
    created(){
       this.ListarModalidades(),
       this.ListarTurnos(),
       this.listarCarreras(),
       this.listarProfesores(),
       this.listarCursos()
    },
    methods:{
        ListarModalidades(){
            s_ListaModalidades().then(
                response => {
                    this.listaModalidades= response.data
                }
            ).catch(
                error=>{
                    console.error(error)
                }
            )
        },
        ListarTurnos(){
            s_ListaTurnos().then(
                response => {
                    this.listaTurnos = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        listarCarreras(){
            s_ListaCarreas().then(
                response => {
                    this.listaCarreras = response.data
                }   
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        listarCiclosParaCarrera(id){
            s_ListaCiclosParaCarrera(id).then(
                response => {
                    this.listaCicloParaCarrera = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
        guardarSeccion(){
            if(this.seccion.cursos.length > 0){
                s_RegistraSeccion(this.seccion).then(
                    response => {
                        this.seccion.id=  response.data.id
                        this.seccion.carrera =  response.data.carrera
                        this.RegistraCursos()
                        
                        this.showNackBar = true
                        this.messageSnackBar = 'Seccion Registrada Correctamente'
                        this.colorSnackBar = this.colorSnakBarSuces
                        this.seccion =  {
                            fechaInicio:'',
                            fechaFin:'',
                            softdelete: false,
                            carrera: {
                                id: null
                            },
                            turno: {
                                id:null
                            },
                            ciclo: {
                                id: null
                            },
                            modalidad: {
                                id: null
                            },
                            cursos:[
                                
                            ]
                            }
                    }
                ).catch(
                    error=> {
                        this.showNackBar = true
                        this.messageSnackBar = 'Error al registrar'
                        this.colorSnackBar = this.colorSnackBarError
                    }
                )
            }else{
                this.showNackBar = true
                this.messageSnackBar = 'Debe agrega almenos 1 curso para esta seccion'
                this.colorSnackBar = this.colorSnackBarError
            }
        },
        listarProfesores(){
            s_ListaProfesores().then(
                response => {
                    this.listaProfesores =  response.data
                }).catch(
                error =>{
                    console.log(error)
                })
        },listarCursos(){
            s_ListaCursos().then(
                response => {
                        this.listaCursos = response.data
                }).catch(
                    error =>{
                        console.log(error)
                    })
        },addCurso(){
            let contadorNulos = 0;
            for(let  i = 0 ; i < this.seccion.cursos.length; i ++){
                let idCurso =    this.seccion.cursos[i].curso.id
                
                let idProfesor = this.seccion.cursos[i].profesor.id

                if(idCurso == null || idProfesor == null  ){
                    contadorNulos+= 1
                }
            }
            if(contadorNulos == 0){    
                this.seccion.cursos.push(
                    {
                        curso:{
                            id:null
                        },
                        profesor:{
                            id:null
                        },
                        grupo:{
                            id:null
                        },
                        carrera:{
                            id:null
                        }
                    }
                )
            }else{
                console.log("Algunos cursos nulos")
            }
        },QuitarCurso(curso){
                this.seccion.cursos.splice(this.seccion.cursos.indexOf(curso),1)
        },vaciar(){
             this.seccion =  {
                            fechaInicio:'',
                            fechaFin:'',
                            softdelete: false,
                            carrera: {
                                id: null
                            },
                            turno: {
                                id:null
                            },
                            ciclo: {
                                id: null
                            },
                            modalidad: {
                                id: null
                            },
                            cursos:[
                                
                            ]
                            }
        },
        RegistraCursos(){
            for(let i =0 ; i < this.seccion.cursos.length; i++ ){
                this.seccion.cursos[i].grupo.id = this.seccion.id
                this.seccion.cursos[i].carrera = this.seccion.carrera
            }
            s_RegistraCursosGrupo(this.seccion.cursos).then(
                response =>{
                    console.log("Cursos registrados",response.data)
                }
            ).catch(
                error =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'No se pudieron registrar cursos'
                    this.colorSnackBar = this.colorSnackBarError
                    console.error(error)
                }
            )
        }

    }
}
</script>