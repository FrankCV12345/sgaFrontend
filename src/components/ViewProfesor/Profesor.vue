<template>
    <v-container>
        <v-row>
            <v-col sm="12" >
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