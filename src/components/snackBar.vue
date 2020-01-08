<template>
    <v-snackbar
    :timeout="timeout"
    :color="back"
    v-model="showSnack">
    {{text}}
    <v-btn dark  text @click="showSnack = false" >
        Cerrar
    </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    name:"Appsnackbar",
    props:['snackBar','timeout','text','color'],
    data(){
        return{
            back:this.color,
            mode:'horizontal',
            showSnack: this.snackBar
        }
    }
}
</script>