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
                <v-list-item
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
    name : "administrador",
    mixins : [navigationMixsin],
    data(){
            return  {
                    drawer : false,
                    items :[
                        {title : 'Actualizar mis datos',icon:'mdi-account-edit', to:'agregaUsusario'},
                        
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