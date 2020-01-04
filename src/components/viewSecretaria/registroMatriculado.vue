<template>
    <v-container>
        <v-row>
            <v-col> <h2>Registro de nuevo Alumno</h2></v-col>
        </v-row>
        <v-row>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.nombre"
                label="Nombres"
                outlined
                ></v-text-field>
            </v-col>
            <v-col sm="6">
                <v-text-field
                v-model="NewAlumno.apellidos"
                label="Apellidos"
                outlined
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:'registroMatricula',
    data(){
        return {
            NewAlumno:{nombre:null,apellidos:null}
        }
    }
}
</script>