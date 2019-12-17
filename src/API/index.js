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
export const s_ListaModalidades = ()=>{
    return AXIOS.get('Modalidad',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaTurnos = ()=>{
    return AXIOS.get('Turno',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaCarreas = ()=>{
    return AXIOS.get('Carreras',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaCiclosParaCarrera = (id)=>{
    return AXIOS.get('CiclosParaCarreras/'+id,{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_RegistraSeccion = (params)=>{
    return AXIOS.post('Grupo',params,{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaSecciones = ()=>{
    return AXIOS.get('Grupo',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}
export const s_ListaCursos = ()=>{
    return AXIOS.get('Curso',{headers:{'Content-Type': 'application/json','Authorization':  localStorage.getItem('tokem')}})
}