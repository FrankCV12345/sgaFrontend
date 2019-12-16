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
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="guardarSeccion()"
                    >
                        Guardar
                    </v-btn>
                
                    <v-btn
                        color="warning"
                    >
                        Cancelar
                    </v-btn>
            </v-form>
        </v-flex>
    </v-layout>
</template>
<script>
import {s_ListaModalidades, s_ListaTurnos,s_ListaCarreas,s_ListaCiclosParaCarrera}  from '@/API'
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
                        }
                    },
                    menuFechaInicio:false,
                    menuFechaFin:false,
                    listaModalidades:[],
                    listaTurnos:[],
                    listaCarreras:[],
                    listaCicloParaCarrera:[]
        }
    },
    created(){
       this.ListarModalidades(),
       this.ListarTurnos(),
       this.listarCarreras()
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
            console.log(this.seccion)
        }

    }
}
</script>