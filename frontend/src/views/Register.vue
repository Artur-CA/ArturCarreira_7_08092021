<template>
     
          <div class="bloc_register">          
            <h2>👣 Rejoignez-nous !</h2>
            <form v-on:submit.prevent="register" id="form_register" >
              <div class="form_group">
                <label for="username">Pseudo :</label>
                <input type="text" id="username" class="form_control" required v-model="inputRegister.username"/>
              </div>
              <div class="form_group">
                <label for="jobtitle">Fonction :</label>
                <input type="text" id="jobtitle" class="form_control" required v-model="inputRegister.jobtitle"/>
              </div> 
              <div class="form_group">
                <label for="email">E-mail :</label>
                <input type="email" id="email" class="form-control" required v-model="inputRegister.email"/>
              </div>
              <div class="form_group">
                <label for="password">Mot de passe :</label>
                <input type="password" id="password" class="form-control" required v-model="inputRegister.password"/>
              </div>  
              <button><strong>Connexion</strong></button>                                       
            </form> 
             
              <nav class="nav_register"><p>Vous avez déjà un compte ? <router-link to="/">Connectez-vous !</router-link></p></nav> 
          </div> 
</template>


<script>

export default {
    name: 'Register',

    data() {
        return {
            inputRegister: {
                username: "",
                jobtitle: "",
                email: "",
                password: ""
            }
        }
    },

    methods: {
      
        register() {
          
            let registerDatas = {
                "username": this.inputRegister.username,
                "jobtitle": this.inputRegister.jobtitle,
                "email": this.inputRegister.email,
                "password": this.inputRegister.password
            }
           
            let url = "http://localhost:3000/api/auth/register"
            let options = {
                method: "POST",
                body: JSON.stringify(registerDatas),
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            console.log(options)

            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                      localStorage.setItem("userId", res.userId);
                      localStorage.setItem("token", res.token);
                      this.$router.push("/");
                      alert("Bienvenue sur Groupomania RSE ! Connectez-vous !");
                    console.log(localStorage)
                })
                .catch(error => console.log(error))
        }
    }
}
</script>


<style lang="scss">

form {
	margin-top: 30px;
}

button {
  width: 120px;
  height: 40px;
  border: 4px solid #1a2c4a;
  border-radius: 30px;
  padding: 10px;
  margin: 15px 0px 25px 0px;
  background-color: white;
  color: #1a2c4a;

    &:hover {
      transform: scale(1.1);
      transition: .1s ease-in-out;
      color: #ba4d55;
      border: 4px solid #ba4d55;
    }
}

label {
  display: block;
  width: 25%; 
  text-align: right; 
  font-size: 1.4em;
  margin: auto;
}

input, textarea {
  width: 50%;
  height: 3em;
  box-sizing: border-box;  
  outline: none;
  border: 4px solid #1a2c4a;
  border-radius: 15px;
  padding: 10px;
  margin: auto;

    &:focus {
      border-color: #ba4d55;
    }
}

.form_group {
  display: flex;
  padding-bottom: 15px;
  margin: auto;
 }

.bloc_register {
  color: #1a2c4a;
  margin: auto;
  width: 60%; 
  padding-top: 20px;
  box-shadow: inset 0px 0px 0px 6px white;
  border: 6px solid #1a2c4a;
  border-radius: 25px;
  text-align: center;
  margin-top: 50px;
  background-image: url("../assets/icon-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;

    & h2 {
      color: #1a2c4a;
      padding: 0 15px 0 15px;
    }
}

.nav_register {
  height: 50px;
  width: 100%;

    & a {
      color: #ba4d55;
      font-family: 'jokerman', cursive; 
      font-size: 0.8em;
      text-decoration: none;
    }

    & a:hover, a:focus {
      color: #1a2c4a;
    }
}


@media screen and (max-width: 768px) {
  .bloc_register {
    width: 80%; 
  }
}

@media screen and (max-width: 450px) {
  .bloc_register {
    width: 90%; 
    box-shadow: inset 0px 0px 0px 8px white;
    border: 5px solid #1a2c4a;
    font-size: 0.7em;
  }

  .form_group {
  display: flex;
  flex-direction: column;
  }

  label, input, textarea {
  width: 70%;
  text-align: center;
  }
}

</style>