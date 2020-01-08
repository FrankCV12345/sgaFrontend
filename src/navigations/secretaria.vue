<template>
      <div>
        <v-toolbar
            dark
            color="teal darken-3"
        >
            <v-app-bar-nav-icon @click="toggleDrawer" />
            <v-toolbar-title>Secretaria</v-toolbar-title>
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
               <!-- <v-list-item
                    v-for="item in items" :key="item.title"
                    :to="item.to"
                >
                    <v-list-item-icon>
                        <v-icon  >{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title > {{ item.title }} </v-list-item-title>
                    </v-list-item-content>
                    
                </v-list-item>
                -->
                <v-divider/>

                
                <v-list>
                    <v-list-group v-for="item in itemsMenu " :key="item.title" no-action >
                        <template v-slot:activator>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </template>
                        <v-list-item v-for="subitem in item.items" :key="subitem.title" :to="subitem.to" >
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
    name:'secretaria',
    mixins : [navigationMixsin],
    data(){
            return  {
                    drawer : false,
                    items :[
                        {title : 'Actualizar mis datos',icon:'mdi-account-edit', to:'agregaUsusario'},
                    ],
                     itemsMenu:[
                        {title:'Solicitudes', items:[
                            {title : 'Mis Solicitudes',icon:'mdi-book-open', to:'/secretaria/MisSolicitudes'},
                            {title : 'Lista Solicitudes',icon:'mdi-format-list-bulleted', to:'/secretaria/Solicitudes'},
                            ]
                        },
                        {title:'Matriculas', items:[
                                {title : 'Agregar Matricula',icon:'mdi-account-plus', to:'/secretaria/registraAlumno'},
                                {title : 'Matriculados',icon:'mdi-account-multiple-outline', to:'/secretaria/ListaAlumnos'}
                                ]
                        },
                        {title : ' Mis datos',items:[
                                {title : 'Actualizar mis datos',icon:'mdi-account-edit', to:'agregaUsusario'}
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