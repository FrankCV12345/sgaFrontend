<template>
  <v-app>
    <v-content>
      <NavigationProfesores v-if="nombreRol === 'Docente'" />
      <NavigationAdmin v-if="nombreRol === 'Administrador(a)'"/>
      <NavigationSecretaria v-if="nombreRol === 'Secretaria(o)'" />
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationProfesores from './navigations/profesor'
import NavigationAdmin from './navigations/admin'
import NavigationSecretaria from './navigations/secretaria'
export default {
  components : {NavigationProfesores, NavigationAdmin,NavigationSecretaria},
  name: 'App',
   data(){
            return  {
              tokem:'',
              idUser:'',
              nombreRol:''
            }
    },
  created(){
    this.nombreRol= localStorage.getItem('nombreRol')
  },
  beforeUpdate(){
    this.nombreRol= localStorage.getItem('nombreRol')  
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
