<template>
    <div>
        <v-toolbar
            dark
            color="teal darken-3"
        >
            <v-app-bar-nav-icon @click="toggleDrawer" />
             <v-toolbar-title>Profesor</v-toolbar-title>
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
                
                 <v-list>
                    <v-list-group v-for="item in itemsMenu " :key="item.title" no-action >
                        <template v-slot:activator>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </template>
                        <v-list-item v-for="subitem in item.Subitems" :key="subitem.title" :to="subitem.to" >
                            <v-icon>{{subitem.icon}}</v-icon>
                            <v-list-item-content>
                                <v-list-item-title v-text="subitem.title" ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                
                <v-divider/>

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
    name : "profesor",
    mixins : [navigationMixsin],
    data(){
            return  {
                    drawer : false,
                    items :[
                        {title : 'Ingresar Nota',icon:'mdi-pen', to:'/calificaciones'},
                         {title : 'Cerrar Sesion',icon:'mdi-logout', to: '/salir'}
                    ],
                     itemsMenu :[
                        {
                            title:'Notas Alumno', Subitems:[
                                {title:'Mi Cursos', icon:'mdi-library', to:'/docente/listaCursosDocente'}
                            ]
                        }
                            
                    ]
            }
    }
}
</script>