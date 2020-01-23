<template>
    <v-container>
        <v-row>
            <v-col sm="8"> <h1> Lista de cursos</h1> </v-col>
            <v-col sm="4" >
                <v-text-field
                label="Buscar"
                v-model="searchCurso"
                >

                </v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="ListaDeCursos !=null" >
            <v-col sm="12" >
                <v-data-table
                :headers="headersListaCurso"
                :items="ListaDeCursos"
                :search="searchCurso"
                >
                    <template  v-slot:item.action={item} >
                        <v-btn icon @click="listarAlumnos(item)">
                            <v-icon>
                                mdi-eye
                            </v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-dialog persistent scrollable v-model="dialoglistaAlumnos" v-if="ListaAlumnos != null" max-width="900px" >
            <v-card>
                <v-card-title>Curso : <b> {{cursoSelected.nombreCurso }}</b></v-card-title>
                <v-card-subtitle>Seccion : {{llenaCeros(ListaAlumnos[0].id,5,'SEC') }} </v-card-subtitle>
                <v-spacer></v-spacer>
                <v-card-text>
                    <v-row>
                        <v-col sm="8" ></v-col>
                        <v-col sm="4" >
                            <v-text-field
                                v-model="searchAlumno"
                                label="Buscar Alumno"
                                append-icon="mdi-glasses"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col sm="12" >
                            <v-data-table
                            :headers="headers"
                            :items="ListaAlumnos"
                            :search="searchAlumno"
                            >
                                <template v-slot:item.action={item}  >
                                    <v-btn icon @click="ServicioNotas(item)">
                                        <v-icon>mdi-grease-pencil</v-icon>
                                    </v-btn>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="cerrarDialog()" >Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent max-width="900px" v-model="dialognotasAlulmno" >
                <v-card>
                    <v-card-title>{{notaSelected.alumno.nombre +"  "+notaSelected.alumno.apellidos}}</v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col sm="12">    
                                <v-text-field  
                                    v-model="notaSelected.nota1"
                                    label="Nota 1"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">    
                                <v-text-field 
                                    v-model="notaSelected.nota2"
                                    label="Nota 2"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">    
                                <v-text-field 
                                    v-model="notaSelected.nota3"
                                    label="Nota 3"
                                    type="number"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12">    
                            <v-text-field 
                                v-model="notaSelected.examenfinal"
                                label="Examen final"
                                type="number"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="ServicioNotas()" >
                            Guardar Nota
                        </v-btn>
                        <v-btn @click="cerrarDialogNotas()">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
                
        <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
            {{messageSnackBar}}
            <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
        </v-snackbar>
        </v-dialog>
    </v-container>
</template>
<script>
import {s_ListaCursosProfesor, s_ListaAlumnosPorGrupo,Func_LlenaCeros,s_RegistraNota} from '@/API'
export default {
    name:"listaCursosySeciones",
    data(){
        return {
            searchCurso:'',
            ListaDeCursos:null,
            ListaAlumnos : null,
            dialoglistaAlumnos: false,
            dialognotasAlulmno:false,
            notaSelected :  {
                nota1: null,
                nota2: null,
                nota3: null,
                examenfinal: null,
                estadoaprobado: null,
                fechaaultimaActualizacion: null,
                alumno:{id:null},
                curso:{id:null}
            },
            alumnoSelected : null,
            cursoSelected: null,
            headers:[
                {
                    text:"Nombre",
                    value:'nombre'
                },
                {
                    text:"Apellidos",
                    value:'apellidos'
                },{
                    text:"Correo",
                    value:'correo'
                },
                { 
                    text: '', 
                    value: 'action',
                    sortable: false 
                }
            ],
            headersListaCurso:[
                {
                    text:'Nombre Curso',
                    value:'nombreCurso'
                },
                {
                    text:'Seccion',
                    value:'IdConCeros'
                },
                {
                    text:'',
                    value:'action'
                }
            ],
            searchAlumno:'',
            showNackBar:false,
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
        }
    },
    methods:{
        ListarCursos(){
           s_ListaCursosProfesor().then(
               response =>{
                   this.ListaDeCursos = response.data
                   for(let i =0 ; i <  response.data.length ; i ++){
                       this.ListaDeCursos[i].IdConCeros =  this.llenaCeros(response.data[i].idGrupo,5,'SEC')
                   }
               }    
           ).catch(
               error =>{
                   console.error(error)
               }
           ) 
        },
        listarAlumnos(curso){
            this.cursoSelected = curso
            
            s_ListaAlumnosPorGrupo(curso.idGrupo).then(
                response =>{   
                    this.ListaAlumnos = (response.data.length == 0) ? null: response.data 
                    if(this.ListaAlumnos !== null){
                        this.dialoglistaAlumnos = true  
                    }
                }   
            ).catch(
                error =>{
                    this.showNackBar =true
                    this.colorSnackBar = this.colorSnackBarError
                    this.messageSnackBar= 'Error al listar Cursos'
                }
            )
        },
        ServicioNotas(alumno){
            if(alumno != undefined){
                this.notaSelected.alumno.id = alumno.id
                this.notaSelected.curso.id =  this.cursoSelected.idCurso_grupo
            
            }
                s_RegistraNota(this.notaSelected).then(
                response => {
                    
                    console.log(response.data)
                    this.notaSelected = response.data
                    console.log(this.notaSelected.alumno.nombre)
                    this.dialognotasAlulmno =  true
                    this.messageSnackBar ="Nota Registrada"
                    this.colorSnackBar = this.colorSnakBarSuces
                    this.showNackBar = true
                }
                ).catch(
                    error =>{
                        this.messageSnackBar ="Error al Registrar nota"
                        this.colorSnackBar = this.colorSnackBarError
                        this.showNackBar = true
                    }
                )
          
            
        },NotaIsCorrect(notas){
            
        },
        cerrarDialog(){
            this.dialoglistaAlumnos =  false;
            this.listaAlumnos = null
        },
        cerrarDialogNotas(){
            this.dialognotasAlulmno = false
            this.notaSelected = {
                nota1: null,
                nota2: null,
                nota3: null,
                examenfinal: null,
                estadoaprobado: null,
                fechaaultimaActualizacion: null,
                alumno:{id:null},
                curso:{id:null}
            }
        },
        llenaCeros(numero , cantidadCeros,letra){
            return Func_LlenaCeros(numero , cantidadCeros,letra)
        }
    },
    created(){
        this.ListarCursos()
    }

}
</script>