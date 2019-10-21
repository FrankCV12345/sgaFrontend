<template>
    <div>
        <h1>LOGIN</h1>
         <v-text-field
              label="Usuario"
              single-line
              solo
            ></v-text-field>
        <v-text-field
              label="Password"
              single-line
              solo
            ></v-text-field>
        <v-btn color="red">ENTRAR</v-btn>
    </div>
</template>
<script>
export default {
    name : 'login',
    data() {
        return {
      msg: 'Welcome to Your Vue.js App'
    }
    }
}
</script>