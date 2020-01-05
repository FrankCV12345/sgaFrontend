<template>
    <v-container>
        <v-row>
            <v-col sm="4">
                <v-list>
                    <v-list-group v-for="item in itemsMenu" :key="item.title" >
                        <template v-slot:activator >
                            ?<v-list-item-title>{{item.title}}</v-list-item-title>
                        </template>
                        <v-list-item v-for="subitem in item.Subitems"  :key="subitem.tile" :to="item.to" >
                            <v-icon>{{subitem.icon}}</v-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{subitem.title}}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-col>
            <v-col sm="8" >
                <router-view/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:"profesor",
    data(){
        return{
            itemsMenu :[
                {title:'Notas Alumno', Subitems:[
                    {title:'Notas', icon:'mdi-library', to:''}
                ]}
            ]
        }
    }
}
</script>