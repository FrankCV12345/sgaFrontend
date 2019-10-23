<template>
  <v-app>
    <v-content>
      <NavigationProfesores/>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import NavigationProfesores from './navigations/profesor'
export default {
  components : {NavigationProfesores},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
