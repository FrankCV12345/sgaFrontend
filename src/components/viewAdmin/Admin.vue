<template>
    <v-layout>
      <v-flex sm="12">
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
                        {title:'Admin. Usuarios', items:[
                            {title : 'Agregar Usuario',icon:'mdi-account-plus', to:'/admin/agregaUsusario'},
                            {title : 'Lista Usuarios',icon:'mdi-account-multiple-outline', to:'/admin/ListaUsers'},
                            ]
                        },{title:'Admin. Cursos', items:[
                                {title : 'Registro de Cursos',icon:'mdi-book-open-page-variant', to:'/admin/AgregaCurso'},
                                {title : 'Lista de Cursos',icon:'mdi-book-open-page-variant', to:'/admin/ListaCursos'},
                            ]
                        },
                        {
                            title:'Admin. de Secciones', items:[
                                {title : 'Agregar Seccion',icon:'mdi-google-circles-communities', to:'/admin/AddSecciones'},
                                {title : 'Lista Secciones',icon:'mdi-google-circles-communities', to:'/admin/ListaSecciones'}                                
                                                            
                            ]
                        },{
                            title:'Admin. Calificaciones', items:[
                                {title : 'Ver calificaciones',icon:'mdi-account-star', to:'/admin/CalificacionProfesor'},
                            ]
                        },
                        {title : 'Reportes',items:[
                          {title:'Informes en Graficos',icon:'mdi-chart-histogram', to:'/admin/Dashboard'}  
                        ]
                        }
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
                     if(localStorage.getItem('nombreRol') !== 'Administrador(a)'){
                            localStorage.setItem('idUser',null)
                            localStorage.setItem('nombreRol',null)
                            localStorage.setItem('tokem',null)
                            this.$router.push('/login')
                    }else{
                        this.$router.push('/admin/Dashboard')
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