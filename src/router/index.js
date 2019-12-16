import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import admin from '@/components/viewAdmin/admin'
import AddUser from '@/components/viewAdmin/AddUser'
import listUser from '@/components/viewAdmin/listaUser'
import notFound from '@/components/notFound'
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