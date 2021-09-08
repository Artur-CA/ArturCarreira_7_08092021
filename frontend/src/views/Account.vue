<template>
     <section>
         <Navbar></Navbar>
            <div class="bloc_register">
                <h2>🔧 Gestion du compte</h2>
                <p>Pseudo : {{ userAccount.username }}</p>
                <p>Fonction : {{ userAccount.jobtitle }}</p>
                <p>Avatar</p>
                <figure><img class="avatar" alt="Photo de Joker" src="../assets/img/joker.jpg"/>
                </figure> 
                <p>Votre compte est actif depuis le <span>{{ [ userAccount.createdAt, "YYYY-MM-DD" ] | moment("DD/MM/YYYY") }}</span></p><br>
                <button @click="deleteAccount" class="accountbtn"><strong>Supprimez votre compte</strong></button>  
            </div>  
     </section>
</template>

<script >
import Navbar from '../components/Navbar'

export default {
    name: 'Account',
    components: {
        Navbar
    },

    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                username: "",
                createdAt: "",
                jobtitle: ""
            },
            inputAccount: {
                username: "",
                jobtitle: ""
            }
        }
    },
 
    mounted() {
        let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.userAccount.username = data.username;
                this.userAccount.createdAt = data.createdAt;
                this.userAccount.jobtitle = data.jobtitle;
            })
            .catch(error => console.log(error))

    },

    methods: {
       
        getOneAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let options = {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then(response => response.json())
                .then(data => {
                    this.userAccount.username = data.username;
                    this.userAccount.jobtitle = data.jobtitle;
                })
                .catch(error => console.log(error))
        },


        deleteAccount() {
            let url = `http://localhost:3000/api/auth/${ this.userAccount.userId }`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    localStorage.clear();
                    alert("Votre compte a été supprimé !");
                })
                .then(this.$router.push("/register"))
                .catch(error => console.log(error))
        },
    },
} 
</script>

<style lang="scss">
.accountbtn {
    width: auto;
    margin: 30px 0;
}

.avatar {
    width: 6rem;
}

</style>