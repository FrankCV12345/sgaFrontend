<template>
    <v-container>
        <v-row>
            <v-col> <h2>Registro de nuevo Alumno</h2></v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.nombre"
                label="Nombres"
                outlined
                ></v-text-field>
            </v-col>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.apellidos"
                label="Apellidos"
                outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.correo"
                label="Correo"
                outlined
                ></v-text-field>
            </v-col>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.dni"
                label="DNI"
                outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.telefono"
                label="telefono"
                outlined
                ></v-text-field>
            </v-col>
            <v-col sm="6">
                <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :return-value.sync="NewAlumno.fechaNacimiento"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            label="Fecha Nacimiento"
                            prepend-icon="mdi-calendar"
                            v-model="NewAlumno.fechaNacimiento"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="NewAlumno.fechaNacimiento" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(NewAlumno.fechaNacimiento)">OK</v-btn>
                        </v-date-picker>
                </v-menu>

            </v-col>
        </v-row>

        <v-row>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.direcion"
                label="Direcion"
                outlined
                ></v-text-field>
            </v-col>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.nombreColegio"
                label="Nombre Colegio"
                outlined
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-select v-if="LstTipoDoc != null"
                        :items="LstTipoDoc"
                        item-text="nombreDoc"
                        name='id'
                        v-model="NewAlumno.tipoDoc.id"
                        item-value="id"
                        label="Selecione Tipo Doc."
                    >
                </v-select>
            </v-col>
            <v-col sm="6">
                <v-select v-if="LstSexo != null"
                        :items="LstSexo"
                        item-text="nombreSexo"
                        name='id'
                        v-model="NewAlumno.nombreSexo.id"
                        item-value="id"
                        label="Selecione Sexo."
                    >
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6" > 
                <v-select v-if="LstaSedes != null"
                        :items="LstaSedes"
                        item-text="nombreSede"
                        name='id'
                        v-model="NewAlumno.nombreSede.id"
                        item-value="id"
                        label="Selecione Sede"
                    >
                </v-select>
            </v-col>
            <v-col sm="6" > 
                <v-select v-if="LstaSecciones != null"
                        :items="LstaSecciones"
                        item-text="NombreAndId"
                        name='id'
                        v-model="NewAlumno.grupo.id"
                        item-value="id"
                        label="Selecione Seccion"
                    >
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-btn color="primary" @click="RegistrarAlumno()">
                    Registrar Matricula
                </v-btn>
            </v-col>
            <v-col sm="6" >
                <v-btn  color="red darken-3"  class="white--text" >
                    Cancelar
                </v-btn>
                
            </v-col>
        </v-row>
        <v-snackbar v-model="showNackBar" :color="colorSnackBar" :timeout="timeout" >
            {{messageSnackBar}}
            <v-btn text @click="showNackBar = false" >Cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import {s_listaSexo,s_listaTipoDoc,s_listaSedes,s_registraUser,s_ListaSecciones, Func_LlenaCeros} from '@/API'
import {Func_IsNulOrEmpty} from '@/validations/validate.js'
export default {
    name:'registroMatricula',
    data(){
        return {
            NewAlumno:{nombre:null,apellidos:null ,nombreSexo:{id:null} , tipoDoc:{id:null}, nombreSede:{id:null}, grupo:{id:null, carrera:{nombre:null}}, rol: {
                id: 1
            }},
            LstTipoDoc:null,
            LstSexo:null,
            LstaSedes:null,
            LstaSecciones:null,
            errores:[],
            showNackBar:false,
            messageSnackBar:'',
            timeout:2000,
            colorSnackBar:'', 
            colorSnakBarSuces:'cyan darken-2',
            colorSnackBarError:'error'
        }
    },
    methods:{
        ListarSexo:function(){
            s_listaSexo().then(
                response =>{
                    this.LstSexo = response.data
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        ListarTipoDoc:function(){
              s_listaTipoDoc().then(
                  response =>{
                      this.LstTipoDoc = response.data
                  }
              ).catch(
                  error => {
                    console.error(error)
                  }
              )  
        },ListarSedes:function(){
            s_listaSedes().then(
                response =>{
                    this.LstaSedes =response.data
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        ListarSecciones:function(){
            s_ListaSecciones().then(
                response =>{
                    this.LstaSecciones = response.data
                    for(let i = 0 ; i < response.data.length; i++ ){
                        this.LstaSecciones[i].NombreAndId =  this.LlenaCerros(response.data[i].id,5,'SEC') +" - "+ response.data[i].carrera.nombre +" - "+response.data[i].turno.nombreturno
                    }
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },
        RegistrarAlumno(){
            s_registraUser(this.NewAlumno).then(
                response =>{
                    this.messageSnackBar ="Alumno Registrado"
                    this.colorSnackBar = this.colorSnakBarSuces
                    this.showNackBar = true
                    console.log(response)
                }
            ).catch(
                error =>{   
                    this.messageSnackBar ="Error al Registrar"
                    this.colorSnackBar = this.colorSnackBarError
                    this.showNackBar = true
                    console.error(error)
                }
            )
        }
        ,LlenaCerros(numero , cantidadCeros,letra){
            return Func_LlenaCeros(numero , cantidadCeros,letra)
        }
        
    },
    created(){
        this.ListarSexo(),
        this.ListarTipoDoc(),
        this.ListarSedes(),
        this.ListarSecciones()
    }
}
</script>