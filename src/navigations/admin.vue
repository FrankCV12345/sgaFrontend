<template>
    <div>
        <v-toolbar
            dark
            color="teal darken-3"
        >
            <v-app-bar-nav-icon @click="toggleDrawer" />
            
            <v-toolbar-title>Administrador</v-toolbar-title>
            <v-spacer/>
  
            <v-btn icon @click="logunt">
            <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
            overlay
            v-model="drawer"
            absolute
            value=""
            >
                <v-list
                    class="pt-0" dense
                >
                <v-divider/>
               
                
                <v-divider/>

                <v-list>
                    <v-list-group v-for="item in itemsMenuAdminUser " :key="item.title" no-action >
                        <template v-slot:activator>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </template>
                        <v-list-item v-for="subitem in item.items" :key="subitem.title" :to="subitem.to" @click="toggleDrawer" >
                            <v-icon>{{subitem.icon}}</v-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="subitem.title" ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>

                <v-list>
                    <v-list-item>
                        <v-list-item-icon >
                            <v-icon @click="toggleDrawer">mdi-keyboard-backspace</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Cerrar</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-list>
        </v-navigation-drawer>
        
    </div>
</template>
<script>
import  navigationMixsin from '@/mixins/navigatiosn'
export default {
    name : "administrador",
    mixins : [navigationMixsin],
    data(){
            return  {
                    drawer : false,
                    items :[
                        {title : 'Actualizar mis datos',icon:'mdi-account-edit', to:'agregaUsusario'},
                    ],
                      itemsMenuAdminUser :[
                        {title:'Admin. Usuarios', items:[
                            {title : 'Agregar Usuario',icon:'mdi-account-plus', to:'/admin/agregaUsusario'},
                            {title : 'Lista Usuarios',icon:'mdi-account-multiple-outline', to:'/admin/ListaUsers'},
                            ]
                        },{title:'Admin. Cursos', items:[
                                {title : 'Registro de Cursos',icon:'mdi-book-open-page-variant', to:'/admin/AgregaCurso'},
                                {title : 'Lista de Cursos',icon:'mdi-book-open-page-variant', to:'/admin/ListaCursos'},
                            ]
                        },{
                            title:'Admin. Solicitud', items:[
                                {title : 'Titpos Solicitud',icon:'mdi-book-open-page-variant', to:'/admin/TiposSolicitud'}
                            ]    
                        },
                        {
                            title:'Admin. de Secciones', items:[
                                {title : 'Agregar Seccion',icon:'mdi-google-circles-communities', to:'/admin/AddSecciones'},
                                {title : 'Lista Secciones',icon:'mdi-google-circles-communities', to:'/admin/ListaSecciones'}                                
                                                            
                            ]
                        },{
                            title:'Admin. Calificaciones', items:[
                                {title : 'Ver calificaciones',icon:'mdi-account-star', to:'/admin/CalificacionProfesor'},
                            ]
                        },
                        {title : 'Reportes',items:[
                          {title:'Informes en Graficos',icon:'mdi-chart-histogram', to:'/admin/Dashboard'}  
                        ]
                        },
                        {title : 'Mis datos',items:[
                            {title : 'Actualizar mis datos',icon:'mdi-account-edit', to:'/admin/Usuario'}
                        ]
                        }
                    ]
            }
    },
    methods:{
        move:function(ruta){
            this.$router.push(ruta)
        }
    }
}
</script>