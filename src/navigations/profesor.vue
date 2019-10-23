<template>
    <div>
        <v-toolbar
            app
            dark
            color="secondary"
        >
            <v-app-bar-nav-icon @click="toggleDrawer" />
            <v-toolbar-items>
                <v-btn text>Link 1</v-btn>
                <v-btn text>Link 2</v-btn>
                <v-btn text>Link 3</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
  
            <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>
    </div>
</template>
<script>
export default {
    name : "profesor",
    data(){
            return  {
                    drawer : false,
                    items :[
                        {title : 'Ingresar Nota',icon:'', to:'/calificaciones'},
                         {title : 'Cerrar Sesion',icon:'', to: '/salir'}
                    ]
            }
    }
}
</script>