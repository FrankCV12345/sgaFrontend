<template>
    <v-snackbar
    :timeout="timeout"
    :color="color"
    v-model="showSnack">
    {{text}}
    <v-btn dark  text @click="showSnack = false" >
        Cerrar
    </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name:"App-snack-bar",
    props:['snackBar','timeout','text'],
    data(){
        return{
            color:'primary',
            mode:'horizontal',
            showSnack:  this.snackBar
        }
    }
}
</script>