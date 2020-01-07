<template>
    <v-layout>
        <v-flex sm12>
                <v-form lazy-validation  >
                <h1>Registrar Usuario</h1>
                    <v-text-field
                        :counter="80"
                        label="Nombre"
                        v-model="usuario.nombre"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="Apellidos"
                        :counter="120"
                        v-model="usuario.apellidos"
                        required
                    ></v-text-field>
                    
                    
                    <v-text-field
                        :counter="7"
                        label="DNI"
                        v-model="usuario.dni"
                        required
                    ></v-text-field>
                    
                    
                    <v-text-field
                        label="Telefono"
                        v-model="usuario.telefono"
                        :counter="9"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="E-mail"
                        :counter="180"
                        v-model="usuario.correo"
                        required
                    ></v-text-field>
                    
                    <v-text-field
                        label="Direccion"
                        v-model="usuario.direcion"
                        :counter="220"
                        required
                    ></v-text-field>
                    <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    :return-value.sync="usuario.fechaNacimiento"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            label="Fecha Nacimiento"
                            prepend-icon="mdi-calendar"
                            v-model="usuario.fechaNacimiento"
                            readonly
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="usuario.fechaNacimiento" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(usuario.fechaNacimiento)">OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                    
                    <v-select
                        :items="tipoSexo"
                        item-text="nombreSexo"
                        item-value="id"
                        v-model="usuario.sexo.id"
                        label="Selecione Sexo"
                    >
                    </v-select>
                    <v-select
                        :items="tiposDoc"
                        item-text="nombreDoc"
                        item-value="id"
                        name="id"
                        v-model="usuario.tipoDoc.id"
                        label="Selecione Tipo Doc."
                    >
                    </v-select>
                    <v-select
                        :items="tipoRol"
                        item-text="nombreRol"
                        name='id'
                        v-model="usuario.rol.id"
                        item-value="id"
                        label="Selecione Tipo Rol."
                    >
                    </v-select>
                   
                    
                    
                    <v-row v-if="usuario.rol.id == 1">
                        <v-col sm="4" >
                            <v-text-field
                            label="Nombre Colegio"
                            :counter="220"
                            v-model="usuario.nombreColegio"
                            required
                            ></v-text-field>
                        </v-col>
                        <v-col sm="4" >
                             <v-select
                                :items="Sedes"
                                item-text="nombreSede"
                                item-value="id"
                                label="Selecione Sede."
                                name="id"
                                v-model="usuario.sede.id"
                            >
                            </v-select>
                        </v-col>
                        <v-col sm="4">
                                <v-select v-if="LstaSecciones != null"
                                    :items="LstaSecciones"
                                    item-text="NombreAndId"
                                    name='id'
                                    v-model="usuario.grupo.id"
                                    item-value="id"
                                    label="Selecione Seccion"
                                    >
                                </v-select>
                        </v-col>
                    </v-row>
                    
                    
                    <v-btn
                        color="error"
                        class="mr-4"
                        @click="guardarUsuario()"
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
import {s_listaSexo,s_listaTipoDoc,s_listaRol,s_listaSedes,s_registraUser,s_ListaSecciones,Func_LlenaCeros} from '@/API'
export default {
    name:'AddUser',
    data(){
        return {
         usuario :{
            nombre: '',
            apellidos: '',
            direcion: '',
            dni: '',
            correo: '',
            telefono: '',
            nombreColegio: null,
            fechaNacimiento: new Date().toISOString().substr(0, 10),
            sexo: {
                id: null
            },
            tipoDoc: {
                id: null
                
            },
            rol: {
                id: null
            },
            sede: {
                id: null
            },
            grupo:{
                id:null
            }
        },
        tiposDoc:[],
        tipoSexo:[],
        tipoRol:[],
        Sedes:[],
        LstaSecciones:null
        }
    },
    created(){
        this.listaTipoDoc(),
        this.ListaTipoSexo(),
        this.listaRoles(),
        this.listaSedes(),
        this.ListarSecciones()
    },
    methods:{
        listaTipoDoc(){
               s_listaTipoDoc().then(
                response => {
                    
                    this.tiposDoc = response.data
                }).catch(
                   error => {
                       console.log(error)
                   })
        },
        ListaTipoSexo(){
             s_listaSexo().then(
                        response =>{
                            this.tipoSexo = response.data
                           
                        }
                ).catch(
                    error => {
                        console.error(error)
                    }
                )
        },
        listaSedes(){
                s_listaSedes().then(
                    response => {
                        this.Sedes = response.data
                    }
                ).catch(
                    error=>{
                        console.log(error)
                    }
                )
        },
        listaRoles(){
            s_listaRol().then(
                response => {
                    this.tipoRol = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        },
         ListarSecciones:function(){
            s_ListaSecciones().then(
                response =>{
                    this.LstaSecciones = response.data
                    for(let i = 0 ; i < response.data.length; i++ ){
                        this.LstaSecciones[i].NombreAndId =  this.LlenaCeros(response.data[i].id,5,'SEC') +" - "+ response.data[i].carrera.nombre +" - "+response.data[i].turno.nombreturno
                    }
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        }
        ,
        guardarUsuario(){
            s_registraUser(this.usuario).then(
                response =>{
                    console.log(response.data)
                }
            ).catch(
                error =>{
                    console.error(error)
                }
            )
        },LlenaCeros (numero , cantidadCeros,letra){
            return  Func_LlenaCeros(numero , cantidadCeros,letra)
        }
    },
    computed:{
    }
}
</script>