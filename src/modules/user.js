export default {
    state :{
        dialog :false,
        editMode:false,
        user:{
            nombre: '',
            apellidos: '',
            direcion: '',
            dni: '',
            correo: '',
            telefono: '',
            nombreColegio: '',
            fechaNacimiento: new Date().toISOString().substr(0, 10),
            sexo: {
                id: null
            },
            tipoDoc: {
                id: null
                
            },
            rol: {
                id: null
            },
            sede: {
                id: null
            }
        }
    },
    mutations:{
        toggleUsersDialog:(state,data)=>{
            state.dialog = !state.dialog
            state.editMode = !data.editMode
            state.user = data.user

        }
    },
    getters:{
        usersDialog:(state)=>{
            return state.dialog
        },
        userforEdid:(state)=>{
            return state.user
        },
        usersDialogEditMode:(state)=>{
            return state.editMode
        }
    }
}