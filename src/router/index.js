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