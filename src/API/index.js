import {AXIOS} from '../config/axios'
export const s_listaSexo = ()=>{
    return AXIOS.get('TipoSexo',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_listaTipoDoc = ()=>{
    return AXIOS.get('TipoDNI',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}

export const s_listaRol = ()=>{
    return AXIOS.get('TipoRol',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_listaSedes = ()=>{
    return AXIOS.get('Sede',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_registraUser = (params)=>{
    return AXIOS.post('usuario',params,{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaUsers = ()=>{
    return AXIOS.get('usuario',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}