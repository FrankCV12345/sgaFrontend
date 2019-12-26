<template>
    <v-layout>
        <v-flex sm12>
            <h1>Lista Profesores</h1>
            <v-list>
                <v-list-item v-for=" profesor in listaProfesores " :key="profesor.id">
                    <v-btn icon @click="VerCalificacion(profesor.nombre)">
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                    <v-list-item-content>
                        <v-list-item-title>{{profesor.nombre +" "+profesor.apellidos}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-card max-width="600px" max-height="800px">
                <v-card-title>Grafico</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <radar-chart :chart-data="datacollection"></radar-chart>
                    <button @click="fillData()">RANDOM</button>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import {s_ListaProfesores} from '@/API'
import RadarChart from './RadarChart.js'
export default {
    components: {
        RadarChart
    },
    name:'calificacionProfesor',
    
    data(){
        return {
            listaProfesores : [],
            datacollection: null
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
        VerCalificacion(){

        },
        fillData() {
        this.datacollection = {
          labels: ['Aptirud 1', 'Aptitud 2', 'Aptidud 3','Aptitud 4'],
          datasets: [
            {
                label: 'Aptitudes del Profesor',
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [4.2 ,5 ,2,3.4]
            }
          ]
        },
      { responsive: true, maintainAspectRatio: false }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      }
    },
    created(){
        this.listarProfesores(),
        this.fillData()
    },
    mounted(){
        //this.fillData()
    }
}
</script>