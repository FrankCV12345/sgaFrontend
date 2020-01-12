<template>
    <v-container>
        <v-row>
            <v-col sm="12">
                <h1> Dashboard </h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="3" >
                <v-card  color="light-blue darken-3">
                    <v-card-text class="white--text">
                        <div class="display-1 mb-2">
                            {{resumen.cantidad_profesores}}
                        </div>
                        <h3>Cantidad de Profesores</h3>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="3" >
                <v-card color="light-blue darken-3" >
                    <v-card-text class="white--text">
                        <div class="display-1 mb-2">
                            {{resumen.cantidaMatriculados}}
                        </div>
                        <h3>Cantidad de Matriculados</h3>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="3" >
                <v-card color="light-blue darken-3">
                    <v-card-text class="white--text">
                        <div class="display-1 mb-2">
                            {{resumen.cantidad_Secciones}}
                        </div>
                        <h3>Cantidad de Secciones</h3>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col sm="3" >
                <v-card color="light-blue darken-3" class="white--text">
                    <v-card-text class="white--text">
                        <div class="display-1 mb-2">
                            {{resumen.cantidad_profesores_calificados}}
                        </div>
                        <h3>Cantidad de Profesores calificados</h3>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
                <v-col md="4" sm="6" xs="12" >
                    <v-card >
                        <v-card-title>Profeosres Calificados</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text >
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
                <v-col md="4" sm="6" xs="12" >
                    <v-card>
                        <v-card-title>Reporte de Matriculados Por fecha</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text v-if="dataCollectionLineCharregistradosPorFecha != null">
                            <LineChart :chart-data="dataCollectionLineCharregistradosPorFecha" :options="optionsLine"></LineChart>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="ListareportesPorSeccion != null">
                <v-col md="6" xs="12">
                    <v-card>
                        <v-card-title>Reporte de Secciones</v-card-title>
                        <v-spacer></v-spacer>
                        <v-card-text> 
                            <v-row>
                                <v-col sm="8" ></v-col>
                                <v-col sm="4" >
                                    <v-text-field
                                        v-model="searchReporteSecciones"
                                        append-icon="mdi-glasses"
                                        label="Buscar"
                                        single-line
                                        hide-details
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>       
                            <v-data-table
                                :headers="headers"
                                :items="ListareportesPorSeccion"
                                :search="searchReporteSecciones"
                            >
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
    </v-container>
</template>
<script>
import {s_ProfesoreConPromedio,s_ReporteEstadosSolicitud,s_ReporteResumen,s_ReporteCantregistradosporFecha,s_ReportePorSecciones,Func_LlenaCeros} from '@/API'
import BarChar from './BarChar.js'
import PieChart from './PieChart.js'
import LineChart from './LineChart.js'
export default {
    components:{
        BarChar,
        PieChart,
        LineChart
    },
    name :'Dashboard',
    data(){
        return {
            searchReporteSecciones:'',
            datacollectionBarPromediosProfesores :null,
            datacollectionPieEstadosSolicitud:null,
            dataCollectionLineCharregistradosPorFecha:null,
            chartOptionsBarPromedio : {
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            chartOptionsPie:null,
            optionsLine:{
                responsive: true,
                maintainAspectRatio: false,
                title: {
                display: true,
                text: ""
                }
            },
            resumen :{
                cantidad_profesores_calificados: null,
                cantidaMatriculados: null,
                cantidad_Secciones: null,
                cantidad_profesores: null
            },
            listMatriculadosPorFEcha:null,
            headers:[
                {
                    text:'Grupo',
                    value:'idConCeros'
                },
                {
                    text:'Carrera',
                    value:'nombreCarrera'
                },
                {
                    text:'Turno',
                    value:'nombreTurno'
                },
                {
                    text:'Cantidad Alumnos',
                    value:'catidadAlumnos'
                }
            ],
            ListareportesPorSeccion:null
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
        Listarresumen(){
            s_ReporteResumen().then(
                response =>{
                    this.resumen =response.data
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        ListarCantMAtriculadoporFecha(){
            s_ReporteCantregistradosporFecha().then(
                response =>{
                    this.listMatriculadosPorFEcha = response.data
                    this.llenaDatosParaLineChartCantregistradosPorFEcha( this.listMatriculadosPorFEcha)
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        listarReportesPorSeccion(){
            s_ReportePorSecciones().then(
                response =>{
                    this.ListareportesPorSeccion = response.data
                    for(let  i =0 ; i < response.data.length ; i ++){
                        this.ListareportesPorSeccion[i].idConCeros = this.llenaCeros(response.data[i].idGrupo,5,'SEC')
                    }
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        }
        ,
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
        },llenaDatosParaLineChartCantregistradosPorFEcha(lista){
            let Fechas = []
            let cantidades = []
            for(let  i = 0 ; i < lista.length ; i ++){
                Fechas[i] = lista[i].fecha
                cantidades[i] = lista[i].cantidadMatriculados
            }

                this.dataCollectionLineCharregistradosPorFecha ={
                    labels: Fechas,
                    datasets: [
                                {
                                    backgroundColor: "transparent",
                                    borderColor: "rgba(1, 116, 188, 0.50)",
                                    data: cantidades
                                }
                            ]    
                }
        },llenaCeros(numero , cantidadCeros,letra){
            return    Func_LlenaCeros(numero , cantidadCeros,letra)
        }
    },created(){
        this.ListarProfesoresYPromedios(),
        this.listarEstadosSolcitud(),
        this.Listarresumen(),
        this.ListarCantMAtriculadoporFecha(),
        this.listarReportesPorSeccion()
    }
    
}
</script>