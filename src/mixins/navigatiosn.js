export default {
    methods : {
        toggleDrawer(){
            this.drawer = !this.drawer
        },
        logunt(){
               localStorage.setItem('idUser',null)
               localStorage.setItem('nombreRol',null)
               localStorage.setItem('tokem',null)

               this.$router.push('/login')
        }
    }
}