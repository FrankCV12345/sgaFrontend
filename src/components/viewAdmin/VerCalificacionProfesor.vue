<template>
    <v-layout>
        <v-flex sm12>
            <h1>Lista Profesores</h1>
            <v-list>
                <v-list-item v-for=" profesor in listaProfesores " :key="profesor.id">
                    <v-btn icon @click="verPerfilProfesor(profesor.id)">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-list-item-content>
                        <v-list-item-title>{{profesor.nombre +" "+profesor.apellidos}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
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
    </v-layout>
</template>
<script>
import {s_ListaProfesores,s_VerPerfilProfesor} from '@/API'
import RadarChart from './RadarChart.js'
export default {
    components: {
        RadarChart
    },
    name:'calificacionProfesor',
    
    data(){
        return {
            listaProfesores : [],
            datacollection: null,
            DialogRadar:false
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
                    console.error(error)
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