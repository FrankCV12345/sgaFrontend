import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/viewAdmin/admin'
import AddUser from '@/components/viewAdmin/AddUser'
import listUser from '@/components/viewAdmin/listaUser'
import notFound from '@/components/notFound'
import addSecciones from '@/components/viewAdmin/addSecciones'
import listaSecciones from '@/components/viewAdmin/listaSecciones'
import listCursos from '@/components/viewAdmin/listCursos'
import addCurso from '@/components/viewAdmin/addCurso'
import calificacionProfesor from '@/components/viewAdmin/VerCalificacionProfesor'
import Dashboard from '@/components/viewAdmin/Dashboard'
import secretaria from '@/components/viewSecretaria/secretaria'
import solicitudes from '@/components/viewSecretaria/ListaSolicitudes'
import solicitudesPorResponsable from '@/components/viewSecretaria/ListaSolicitudesPorResponsable'
/*import store from '@/store'
const beforeEnter = (to,from,next)=>{
  if(store.state.AuthModule.logged){
    next({ path:'/admin'})
  }else{
    next()
  }
}*/

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta:{title:'Login'}
    },
    {
      path:'/admin',
      name:'Administrador',
      component:admin,
      meta:{title:'Administrador'},
      children:[ 
        {
          path: 'agregaUsusario',
          name: 'Agrega Usuario',
          component: AddUser,
          meta:{title:'Agrega usuario'}
        },
        {
          path: 'ListaUsers',
          name: 'Lista Usuarios',
          component: listUser,
          meta:{title:'Lista de Usuarios'}
        },
        {
          path: 'AddSecciones',
          name: 'Secciones',
          component: addSecciones,
          meta:{title:'Agrega Nueva Seccion'}
        },
        {
          path: 'ListaSecciones',
          name: 'Lista Secciones',
          component: listaSecciones,
          meta:{title:'Lista de secciones'}
        },
        {
          path: 'ListaCursos',
          name: 'Lista Cursos',
          component: listCursos,
          meta:{title:'Lista Curso'}
        },
        {
          path: 'AgregaCurso',
          name: 'Agregar Curso',
          component: addCurso,
          meta:{title:'Agregar Cusrso'}
        },
        {
          path: 'CalificacionProfesor',
          name: 'Calificaciones profesor',
          component: calificacionProfesor,
          meta:{title:'Calificaciones profesor'}
        },
        {
          path: 'Dashboard',
          name: 'Dashboar',
          component: Dashboard,
          meta:{title:'Dashboard'}
        }
      ]
    },
    {
      path: '/secretaria',
      name: 'secretaria',
      component: secretaria,
      meta:{title:'Secretaria'},
      children:[
        {
          path: 'Solicitudes',
          name: 'Solicitudes',
          component: solicitudes,
          meta:{title:'Solicitudes '}
        },
        {
          path: 'MisSolicitudes',
          name: 'MisSolicitudes',
          component: solicitudesPorResponsable,
          meta:{title:' Mis Solicitudes atendidas '}
        }
      ]
    },{
      path:'*',
      component:notFound
    }
  ]
})
router.beforeEach(
  (to,from,next)=>{
    document.title = to.meta.title;
    next()
  })
export default router