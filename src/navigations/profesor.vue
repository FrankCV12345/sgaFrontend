<template>
    <div>
        <v-toolbar

            dark
            color="secondary"
        >
            <v-app-bar-nav-icon @click="toggleDrawer" />
            
            <v-spacer/>
  
            <v-btn icon>
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
                
                <v-list-item
                    v-for="item in items" :key="item.title"
                    
                >
                    <v-list-item-icon>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    
                </v-list-item>
                
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
                    ]
            }
    }
}
</script>