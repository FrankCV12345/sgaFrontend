export const Func_IsNulOrEmpty = (arregloCampos) =>{
    let cantNullOrEmpty = 0 
    for(let i =0 ; i < arregloCampos.length ; i++){
        if(arregloCampos[i] == null || arregloCampos[i] == '' || arregloCampos[i] == ' ' ){
            cantNullOrEmpty += 1
        }
    }
    if(cantNullOrEmpty > 0){
        return true
    }else{
        return false
    }
}