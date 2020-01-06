<template>
    <v-container>
        <v-row>
            <v-col sm="3">
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
            </v-col>
            <v-col sm="9" >
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
                    {title:'Mi Cursos', icon:'mdi-library', to:'/docente/listaCursosDocente'}
                ]}
            ]
        }
    },
    methods:{
       EvaluaSesion(){
            let tiempoDuraSession = 43200000
            let fechaActual = new Date()
            let fehcaSesion =  localStorage.getItem('FechHoraInicioSecion');
            let tokem = localStorage.getItem('tokem')
            if( tokem == 'null' ){    
                this.$router.push('/login')
            }else{
                if((fechaActual.getTime() - parseFloat(fehcaSesion) ) > tiempoDuraSession){
                    localStorage.setItem('idUser',null)
                    localStorage.setItem('nombreRol',null)
                    localStorage.setItem('tokem',null)
                    this.$router.push('/login')
                }else{
                     if(localStorage.getItem('nombreRol') !== 'Docente'){
                            localStorage.setItem('idUser',null)
                            localStorage.setItem('nombreRol',null)
                            localStorage.setItem('tokem',null)
                            this.$router.push('/login')
                    }
                }
            }
        }
    },
    created(){
        this.EvaluaSesion()
    }
}
</script>