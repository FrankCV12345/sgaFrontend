<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-col sm="8" > <h1>Lista de Secciones </h1></v-col>
                <v-col sm="4" >
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-glasses"
                        label="Buscar"
                        single-line
                        hide-details
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="12" >
                    <v-data-table
                    :headers="headers"
                    :items="listaSecciones"
                    :search="search"
                    >
                        <template v-slot:item.action={item} >
                            <v-btn icon @click="VerModalEditSeccion(item)">
                                <v-icon color="orange accent-3" >mdi-grease-pencil</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-flex>
        <v-dialog v-model="dialogEditSeccion" scrollable persistent max-width="980px" >
                <v-card  style="height: 700px;">
                    <v-card-title>
                        <span class="headline"> Editar Seccion {{llenaCeros(seccionSelecionada.id,4,'S')}}</span>
                    </v-card-title>
                    <v-card-subtitle>Carrera : {{seccionSelecionada.carrera.nombre}}</v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col sm6>
                                    <v-menu
                                    ref="menuFechaInicio"
                                    :close-on-content-click="false"
                                    :return-value.sync="seccionSelecionada.fechaInicio"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            label="Fecha Inicio"
                                            prepend-icon="mdi-calendar"
                                            v-model="seccionSelecionada.fechaInicio"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="seccionSelecionada.fechaInicio" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menuFechaInicio = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menuFechaInicio.save(seccionSelecionada.fechaInicio)">OK</v-btn>
                                        </v-date-picker>
                            </v-menu>
                                </v-col>
                                <v-col sm6>
                                    <v-menu
                                    ref="menuFechaFin"
                                    :close-on-content-click="false"
                                    :return-value.sync="seccionSelecionada.fechaFin"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            label="Fecha Fin"
                                            prepend-icon="mdi-calendar"
                                            v-model="seccionSelecionada.fechaFin"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="seccionSelecionada.fechaFin" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menuFechaFin = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menuFechaFin.save(seccionSelecionada.fechaFin)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm6>
                                    <v-select
                                    :items="listaModalidades"
                                    item-text="nombre"
                                    item-value="id"
                                    v-model="seccionSelecionada.modalidad.id"
                                    label="Selecione Modalidad"
                                    >
                                    </v-select>
                                </v-col>
                                <v-col sm6>
                                    <v-select
                                    :items="listaTurnos"
                                    item-text="nombreturno"
                                    item-value="id"
                                    v-model="seccionSelecionada.turno.id"
                                    label="Selecione Turno"
                                    >
                                    </v-select>
                                </v-col>
                            </v-row>
                            <!--Agregando cursos-->
                            <v-row>
                                <v-col sm="3">
                                    <v-btn color="primary" @click="addCurso()">
                                        <v-icon>mdi-plus-box</v-icon>
                                        <span> Agregar Curso </span>
                                    </v-btn> 
                                </v-col>
                                <v-col sm="9">

                                </v-col>
                            </v-row> 
                            <v-row v-for=" curso in listaCursosEnGrupo" :key="curso.id" >
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
                                    <v-btn icon @click="dialogConfitEliminaCurso =true, idCursoDelete= curso.id">
                                        <v-icon color="red darken-2">mdi-playlist-remove</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogEditSeccion = false">Cerrar</v-btn>
                        <v-btn color="blue darken-1" text @click="GuardarCursosParaSeccion()">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfitEliminaCurso" max-width="350px" persistent >
            <v-card>
                <v-card-title>Desea Eliminar este curso ?</v-card-title>
                <v-card-actions >
                    <v-btn color="red darken-3" class="white--text" @click="EliminaCurso()" >SI</v-btn>
                    <v-btn color="blue darken-3" class="white--text" @click="dialogConfitEliminaCurso = false " >NO</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
            {{messageSnackBar}}
            <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
        </v-snackbar>
    </v-layout>
</template>
<script>
import {s_ModificaGrupo,s_EliminaCursoCarrera,s_ListaModalidades, s_ListaTurnos,s_ListaCarreas,s_ListaCiclosParaCarrera,s_ListaSecciones, s_ListaProfesores,s_ListaCursos,s_ListaCursoPorGrupo,s_RegistraCursosGrupo} from '@/API'
export default {
    name:'listaSecciones',
    data(){
        return {
            dialogConfitEliminaCurso:false,
            listaSecciones:[],
            dialogEditSeccion:false,
            seccionSelecionada:{carrera:{},ciclo:{},fechaFin:'',fechaInicio:'',id:'',modalidad:{},turno:{},softdelete:false},
            listaCursosEnGrupo:[],
            listaProfesores:[],
            listaCursos:[],
            listaCursosCarrera:[],
            ModelCursoCarrera:{ curso: {id: ''}, profesor: { id: '' },grupo: {id: ''},carrera: {id: ''},softdelte: false},
            menuFechaInicio:false,
            menuFechaFin:false,
            listaModalidades:[{nombre:'',id:''}],
            listaTurnos:[{nombreturno:null, id:null}],
            listaCarreras:[],
            listaCicloParaCarrera:[],
            search:'',
            headers:[
                {
                    text: 'Seccion',
                    value: 'idConCeros',
                },{
                    text:'Carrera',
                    value:'carrera.nombre'
                },{
                    text:'Ciclo',
                    value:'ciclo.nrociclo'
                },{
                    text:'Fecha Inicio',
                    value:'fechaInicio'
                },{
                    text:'Fecha Fin',
                    value:'fechaFin'
                },
                { 
                    text: 'Actions', 
                    value: 'action',
                    sortable: false 
                }
            ],
            idCursoDelete:null,
            showNackBar:false,
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
        }
    },
    methods:{
        ListarSecciones(){
            s_ListaSecciones().then(
                response => {
                    for(let  i = 0 ; i< response.data.length ; i ++){
                        response.data[i].idConCeros =  this.llenaCeros(
                            response.data[i].id,5,'SEC')
                    }
                    this.listaSecciones =  response.data
                }).catch(
                error => {
                    console.error(error)
                })
        }, ListarModalidades(){
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
        listarCursosEngrupo(id){
            s_ListaCursoPorGrupo(id).then(
                response => {
                    this.listaCursosEnGrupo = response.data
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        registrarCursosParaGrupo(){
            
        },
        verSeccion(){},
        addCurso(){
            this.listaCursosEnGrupo.push(
                {
                    curso:{},
                    profesor:{},
                    grupo:{
                            id:this.seccionSelecionada.id
                            },
                    carrera:this.seccionSelecionada.carrera
                }
                )
        },
        GuardarCursosParaSeccion(){
            this.UpdatedGrupo()
            s_RegistraCursosGrupo(this.listaCursosEnGrupo).then(
                response =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Echo'
                    this.colorSnackBar  =  this.colorSnakBarSuces

                }
            ).catch(
                error=>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Error'
                    this.colorSnackBar  =  this.colorSnackBarError
                    
                    console.error(error)
                }
            )
        }
        ,
        VerModalEditSeccion(seccion){
            this.listarProfesores()
            this.listarCursos()
            this.listarCarreras()
            this.ListarTurnos()
            this.ListarModalidades()
            this.listarCursosEngrupo(seccion.id)
            this.dialogEditSeccion = true
            this.seccionSelecionada = seccion
           
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
        },
        llenaCeros(numero , cantidadCeros,letra){
            let numeroRellenado = ""+numero;
            for(let i =0 ; i <= cantidadCeros; i++){
                if(numeroRellenado.length < cantidadCeros ){
                     numeroRellenado="0"+numeroRellenado
                }else{
                     numeroRellenado=   letra + numeroRellenado     
                    break
                }
            }
            return numeroRellenado
        },
        EliminaCurso(){
            s_EliminaCursoCarrera(this.idCursoDelete).then(
                response =>{
                    this.dialogConfitEliminaCurso = false
                    console.log("Eliminado")
                }
            ).catch(
                error =>{
                    console.error("Error")
                }
            )
        },
        UpdatedGrupo(){
            s_ModificaGrupo(this.seccionSelecionada).then(
                response =>{
                    this.seccionSelecionada = response.data
                    console.log(response.data)
                }
            ).catch(
                error =>{
                    console.error("Error")
                }
            )
        }

    },
    created(){
        this.ListarSecciones()
    }
}
</script>