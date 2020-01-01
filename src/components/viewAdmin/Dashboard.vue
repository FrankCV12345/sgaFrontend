<template>
    <v-container>
        <v-row>
                <v-col md="4" sm="6" xs="12" >
                    <v-card>
                        <v-card-title>Profeosres Calificados</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                            <BarChar :chart-data="datacollectionBarPromediosProfesores" :options="chartOptionsBarPromedio" ></BarChar>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col md="4" sm="6" xs="12" >
                    <v-card>
                        <v-card-title>Reporte de estado de solicitudes</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text v-if="datacollectionPieEstadosSolicitud != null">
                            <PieChart :chart-data="datacollectionPieEstadosSolicitud" :options="chartOptionsPie"></PieChart>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
    </v-container>
</template>
<script>
import {s_ProfesoreConPromedio,s_ReporteEstadosSolicitud} from '@/API'
import BarChar from './BarChar.js'
import PieChart from './PieChart.js'
export default {
    components:{
        BarChar,
        PieChart
    },
    name :'Dashboard',
    data(){
        return {
            datacollectionBarPromediosProfesores :null,
            datacollectionPieEstadosSolicitud:null,
            chartOptionsBarPromedio : {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            chartOptionsPie:null
        }
    },
    methods:{
        ListarProfesoresYPromedios(){
            s_ProfesoreConPromedio().then(
                response => {
                     this.llenarDatosParaBarChartPromediosProfesores(response.data)
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        listarEstadosSolcitud(){
            s_ReporteEstadosSolicitud().then(
                response =>{
                    this.llenaDatosParaPieChartEstadosSolicitudes(response.data)  
                }
            ).catch(
                error =>{
                    console.log(error)
                }
            )
        }
        ,
        llenarDatosParaBarChartPromediosProfesores(ListaProfesorees){
            let nombresProfesores  =[]
            let promedios=[]
            console.log(ListaProfesorees)
            for(let  i =0 ; i < ListaProfesorees.length; i++){
                nombresProfesores[i] = ListaProfesorees[i].nombreApellidos
                promedios[i]=ListaProfesorees[i].promedio
            }
            this.datacollectionBarPromediosProfesores ={
                labels: nombresProfesores,
                datasets: [
                    {
                        label: "Promedio",
                        backgroundColor: "#1565C0",
                        data: promedios
                    }
                ]    
            } 
            this.chartOptionsPie = {
                responsive: true, 
                maintainAspectRatio: false,
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                }
            }
        },
        llenaDatosParaPieChartEstadosSolicitudes(ListaEstados){
            let NombresEstados  =[]
            let cantidad=[]
            let colores =[]
            let generarColor = () => "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16))
            for(let  i =0 ; i < ListaEstados.length; i++){
                NombresEstados[i] = ListaEstados[i].tipoEstado
                cantidad[i]=ListaEstados[i].cantidad
                colores[i]=generarColor()
            }
            this.datacollectionPieEstadosSolicitud ={
                labels: NombresEstados,
                datasets: [
                    {
                        backgroundColor:colores,
                        data: cantidad
                    }
                ]    
            }

        }
    },created(){
        this.ListarProfesoresYPromedios(),
        this.listarEstadosSolcitud()
    }
    
}
</script>