<template>
     
        <div class="bloc_register">
           
            <h2>🧐 Connectez-vous !</h2>
            <form v-on:submit.prevent="login" id="form_login" >
              <div class="form_group">
                <label for="email">E-mail :</label>
                <input type="email" id="email" class="form_control" required v-model="inputLogin.email"/>
              </div>
              <div class="form_group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" class="form_control" required v-model="inputLogin.password"/>
              </div>   
              <button type="submit"><strong>Connexion</strong></button>                                     
            </form> 
              
             <nav class="nav_register"><p>Pas encore inscrit ? <router-link to="/register">Rejoignez-nous !</router-link></p></nav>
        </div>  
</template>


<script>

export default {
    name: 'Login',

    data() {
        return {
            inputLogin: {
                email: "",
                password: "",
            }
        }
    },


    methods: {
        login() {
            let loginDatas = {
                "email": this.inputLogin.email,
                "password": this.inputLogin.password
            }
            console.log(loginDatas)

            let url = "http://localhost:3000/api/auth/login"
            let options = {
                method: "POST",
                body: JSON.stringify(loginDatas),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(options)
           
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.userId && res.token) {
                        localStorage.setItem("userId", res.userId);
                        localStorage.setItem("token", res.token);
                        localStorage.setItem("isAdmin", res.isAdmin);
                        this.$router.push("account");
                        alert('Bienvenue sur Groupomania RSE !');
                    
                    } else {
                        alert('Mot de passe incorrect !');
                    }
                })
                .catch(error => console.log(error))
        }
    }
}
</script>


<style lang="scss">

</style>