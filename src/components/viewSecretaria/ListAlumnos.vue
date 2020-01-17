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
                    <template v-slot:item.action={item}>
                        <v-btn icon  @click="DialogAlumnos = true,matriculadoSelected = item">
                            <v-icon>mdi-grease-pencil</v-icon>
                        </v-btn>
                    </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="DialogAlumnos"  max-width="900px" persistent >
            <v-card>
                <v-card-title>Cambiar Seccion</v-card-title>
                <v-card-text v-if="listaSecciones != null && matriculadoSelected != null ">
                    <v-select
                    label="Selecione Seccion"
                    :items="listaSecciones"
                    item-text="DetalleSeccion"
                    item-value="id"
                    v-model="matriculadoSelected.grupo.id"
                    >

                    </v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red darken-3" class="white--text" @click="EditarSecionMatriculado()">Actualizar Seccion</v-btn>
                    <v-btn color="blue darken-3" class="white--text" @click="DialogAlumnos = false" >Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
            <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
                {{messageSnackBar}}
                <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
            </v-snackbar>
    </v-container>
</template>
<script>
import { s_ListaAlumnos,Func_LlenaCeros,s_ListaSecciones,s_ActulizaUsers} from '@/API'
export default {
    name:"ListaAlumnos",
    data(){
        return{
            DialogAlumnos:false,
            ListAlumnos:null,
            listaSecciones:null,
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
                },{
                    text:'',
                    value:'action'
                }
            ],
            matriculadoSelected : null,
            showNackBar:false,
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error',

        }
    },
    methods:{
        ListarAlumnos: function(){
            s_ListaAlumnos().then(
                response =>{
                    this.ListAlumnos = response.data
                    for(let  i = 0 ; i < response.data.length; i++){
                        this.ListAlumnos[i].nombreAndApellidos =  response.data[i].nombre +" "+ response.data[i].apellidos
                        this.ListAlumnos[i].grupo.idConCeros =this.llenaCeros(this.ListAlumnos[i].grupo.id,5,"SEC")
                    }
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        EditarSecionMatriculado(){
            s_ActulizaUsers(this.matriculadoSelected.id,this.matriculadoSelected).then(
                response =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Se Actualizo la Seccion'
                    this.colorSnackBar = this.colorSnakBarSuces   
                    this.DialogAlumnos = false

                }
            ).catch(
                error =>{
                    this.showNackBar = true
                    this.messageSnackBar = 'Error al actualizar'
                    this.colorSnackBar = this.colorSnackBarError
                    this.DialogAlumnos = false
                }
            )
        },ListarSecciones(){
            s_ListaSecciones().then(
                response =>{
                    this.listaSecciones = response.data
                    for(let i =0 ; i < response.data.length; i++){
                        this.listaSecciones[i].DetalleSeccion = this.llenaCeros(response.data[i].id,5,'SEC') +'/ Carrera :'+response.data[i].carrera.nombre +' / Turno : '+response.data[i].turno.nombreturno + ' / Ciclo: '+response.data[i].ciclo.nrociclo  
                    }
                    console.log(response.data)
                }
            ).catch(
                error =>{
                    
                }
            )
        }
        ,
        llenaCeros(numero , cantidadCeros,letra){
            return Func_LlenaCeros(numero , cantidadCeros,letra)
        }
    },
    created(){
        this.ListarAlumnos(),
        this.ListarSecciones()
    }
}
</script>