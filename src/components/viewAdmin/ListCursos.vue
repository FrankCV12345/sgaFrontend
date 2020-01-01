<template>
    <v-layout>
        <v-flex sm12>
            <v-row>
                <v-col sm="4">
                    <v-text-field
                    v-model="search"
                    flat
                    label="Buscar curso"
                    solo-inverted
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-list>
                <v-list-item v-for="curso in listaCursos" :key="curso.id">
                    <v-btn icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-grease-pencil</v-icon>
                    </v-btn>
                    <v-list-item-content>
                        <v-list-item-title v-text="curso.nombrecurso"></v-list-item-title>
                        <v-list-item-subtitle v-text="curso.descripioncurso"></v-list-item-subtitle>                    
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-flex>

    </v-layout>
</template>
<script>
import {s_ListaCursos} from '@/API'
export default {
    name:'ListaCursos',
    data(){
        return {
            listaCursos:[],
            search:'',
            searchItem:[]
        }
    },
    methods:{
        listarCursos(){
            s_ListaCursos().then(
                response => {
                    this.listaCursos = response.data
                }
            ).catch(
                error => {
                    console.error(error)
                }
            )
        }
    },
    created(){
        this.listarCursos()
    }, 
    computed: {
        filteredItems() {
        return this.searchItem.filter((item) =>{
            return item.nombrecurso.toLowerCase().match(this.search)  
        });
    }
  },
  mounted() {
      setTimeout(() => this.searchItem = this.listaCursos)
    }
}
</script>