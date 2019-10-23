<template>
        <v-container fluid >
            <h1>LOGIN</h1>
            <v-row align="center" justify="center" >
                <v-col  md="6" sm="9" xs="12" >
                    <v-container>
                        <v-row>  
                            <v-text-field
                                label="Usuario"
                                single-line
                                solo
                                ></v-text-field>       
                        </v-row>
                        <v-row>
                            <v-text-field
                                type="password"
                                label="Password"
                                single-line
                                solo
                                ></v-text-field>
                        </v-row>
                        <v-row>
                            <v-btn color="primary">ENTRAR</v-btn>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>    
        </v-container>
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