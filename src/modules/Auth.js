import axios from 'axios'
export default{
    state :{
            user : null,
            role:'vistante',
            logged:false
    },
    actions:{
        Login :({commit},user)=>{
           return axios.post("http://localhost:8071/login",user)
        }
    },
    mutations: {
        setUser:(state,user)=>{
            if(user){
                state.user ={
                    uid:user.id,
                    email:user.tokem,
                    role:user.rol
                }
                state.logged = true

            }else{
                state.user =  null
                state.logged = false
            }
        },
        setRole:(state,role)=>{
            state.role = role
        }
    },
    getters:{
        logged:(state)=>{
            return !!state.user;
        },
        role:(state)=>{
            return state.role
        },
        isAdmin: (state)=> {
            return state.role === "Administrador"
        }
    }



}