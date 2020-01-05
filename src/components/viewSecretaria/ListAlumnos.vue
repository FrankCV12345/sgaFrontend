<template>
    <v-container>
        <v-row>
            <v-col sm="12" >
                <h1>Lista de alumnos</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="12" v-if="ListAlumnos != null" >
                <v-row>
                    <v-col sm="4">
                         <v-text-field
                            v-model="search"
                            append-icon="mdi-glasses"
                            label="Buscar"
                            single-line
                            hide-details
                            ></v-text-field>
                    </v-col>
                </v-row>
                <v-card>    
                    <v-data-table
                    :headers="headers"
                    :items="ListAlumnos"
                    :search="search"
                    >
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { s_ListaAlumnos,Func_LlenaCeros} from '@/API'
export default {
    name:"ListaAlumnos",
    data(){
        return{
            ListAlumnos:null,
            search:'',
            headers:[
                {
                    text: 'Nombre y Apellidos',
                    value: 'nombreAndApellidos',
                },{
                    text: 'Correo',
                    value: 'correo',
                },
                {
                    text: 'Carrera',
                    value: 'grupo.carrera.nombre',
                },
                {
                    text: 'Seccion',
                    value: 'grupo.idConCeros',
                }
            ]
        }
    },
    methods:{
        ListarAlumnos: function(){
            s_ListaAlumnos().then(
                response =>{
                    this.ListAlumnos = response.data
                    for(let  i =0 ; i < response.data.length; i++){
                        this.ListAlumnos[i].nombreAndApellidos =  response.data[i].nombre +" "+ response.data[i].apellidos
                        this.ListAlumnos[i].grupo.idConCeros =this.llenaCeros(this.ListAlumnos[i].grupo.id,5,"SEC")
                    }
                    console.log(this.ListAlumnos)
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        llenaCeros(numero , cantidadCeros,letra){
            return Func_LlenaCeros(numero , cantidadCeros,letra)
        }
    },
    created(){
        this.ListarAlumnos()
    }
}
</script>