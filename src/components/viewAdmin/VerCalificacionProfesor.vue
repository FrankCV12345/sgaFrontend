<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-col sm="8" ><h1>Lista Profesores</h1></v-col>
                <v-col sm="4" >
                    <v-text-field
                    label="Buscar"
                    v-model="searchProfesor"
                    >

                    </v-text-field>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col sm="12" >
                    <v-data-table
                    :headers="headers"
                    :items="listaProfesores"
                    :search="searchProfesor"
                    >
                        <template v-slot:item.action={item} >
                            <v-btn icon @click="verPerfilProfesor(item.id)">
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <v-dialog  v-model="DialogRadar" scrollable persistent max-width="680px" >
                <v-card  max-height="600px">
                    <v-card-title>Grafico Radar de Aptitudes de profesor </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <radar-chart :chart-data="datacollection"></radar-chart>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="DialogRadar = false"  color="primary"> Cerrar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
            <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
                {{messageSnackBar}}
                <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
            </v-snackbar>
    </v-layout>
</template>
<script>
import {s_ListaProfesores,s_VerPerfilProfesor,Func_TextoTipoError} from '@/API'
import RadarChart from './RadarChart.js'
export default {
    components: {
        RadarChart
    },
    name:'calificacionProfesor',
    
    data(){
        return {
            searchProfesor:'',
            headers:[
                {
                    text:'Nombre Profesor',
                    value:'nombre'
                },
                {
                    text:'Apellidos ',
                    value:'apellidos'
                },
                {
                    text:'',
                    value:'action'
                }
            ],
            listaProfesores : [],
            datacollection: null,
            DialogRadar:false,
            showNackBar:false,
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',
        }
    },
    methods:{
        listarProfesores(){
           s_ListaProfesores().then(
                response => {
                    this.listaProfesores =  response.data
                }).catch(
                error =>{
                    console.log(error)
                })
        },
        verPerfilProfesor(id){
            s_VerPerfilProfesor(id).then(
                response => {
                    this.fillData(response.data.promedioAclaraDudas,response.data.primedioExpresaClaramente,response.data.dominaTema)
                   this.DialogRadar = true
                }
            ).catch(
                error =>{
                    this.showNackBar = true
                    this.messageSnackBar = this.tipoError(error.response.status)
                    this.colorSnackBar = this.colorSnackBarError
                    
                }
            )
        },
        VerCalificacion(){

        },
        fillData(promDominaTema,AclaraDudas,ExpresaClaramene) {
        this.datacollection = {
          labels: ['Domina tema ', 'Aclara dudas', 'Se expresa claramente'],
          datasets: [
            {
                label: 'Aptitudes del Profesor',
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [promDominaTema,AclaraDudas,ExpresaClaramene]
            }
          ]
        },
      { responsive: true, maintainAspectRatio: false }
      },tipoError(error){
          return Func_TextoTipoError(error)
      }
    },
    created(){
        this.listarProfesores()
        this.fillData(0,0,0)
    },
    mounted(){
    }
}
</script>