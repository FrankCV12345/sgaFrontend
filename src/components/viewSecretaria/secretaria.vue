<template>
    <v-container>
        <v-row>
            <v-col sm="3">
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
            </v-col>
            <v-col sm="9">
                 <router-view />
            </v-col>
        </v-row>
      
    </v-container> 
</template>
<script>
export default {
    name:'secretaria',
    data(){
        return {            
            itemsMenu:[
                        {title:'Solicitudes', items:[
                            {title : 'Mis Solicitudes',icon:'mdi-book-open', to:'MisSolicitudes'},
                            {title : 'Lista Solicitudes',icon:'mdi-format-list-bulleted', to:'Solicitudes'},
                            ]
                        },
                        {title:'Matriculas', items:[
                                {title : 'Agregar Matricula',icon:'mdi-account-plus', to:'agregaUsusario'},
                                {title : 'Matriculados',icon:'mdi-account-multiple-outline', to:'agregaUsusario'}
                                
                                ]
                        }
                            ]
                
                }
    }
}
</script>