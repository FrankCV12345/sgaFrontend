<template>
    <v-layout>
     <v-flex xs12 sm3 >
        <v-navigation-drawer permanent>
            <v-toolbar flat>
                <v-list>
                    <v-list-item-content>
                        <v-list-item-title class="title">Administracion</v-list-item-title>
                    </v-list-item-content>
                </v-list>
             </v-toolbar>
                    <v-divider/>
            <v-list>

                <v-list-item
                        v-for="item in itemsMenuAdminUser" :key="item.title"
                        :to="item.to"
                        >
                        <v-list-item-icon>
                            <v-icon  >{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title > {{ item.title }} </v-list-item-title>
                        </v-list-item-content>
                        
                </v-list-item>
            </v-list>
                
                
        </v-navigation-drawer>
      </v-flex>
      <v-flex sm9>
                    <router-view />
          
      </v-flex>
    </v-layout>
</template>
<script>
export default {
    name:'admin',
    data(){
         return  {
                    
                    itemsMenuAdminUser :[
                        {title : 'Agregar Usuario',icon:'mdi-account-plus', to:'agregaUsusario'},
                        {title : 'Lista Usuarios',icon:'mdi-account-multiple-outline', to:'ListaUsers'}
                    ]
            }
    }
}
</script>