<template>
     <section>
         <Navbar></Navbar>
            <div class="bloc_register">
                <h2>🔧 Gestion du compte</h2>
                <p>Pseudo : {{ userAccount.username }}</p>
                <p>Fonction : {{ userAccount.jobtitle }}</p>
                <p>Avatar</p>
                <button @click="uploadFile" class="modifAvatar"><ProfileAvatar :src="userAccount.avatar" /></button>
				<input type="file" ref="fileUpload" @change="onFileSelected"  accept="image/*" id="file-input" aria-label="Modifier votre avatar">
                <p>Votre compte est actif depuis le <span>{{ dateFormat(userAccount.createdAt) }}</span></p><br>
                <button @click="deleteAccount" class="btn" aria-label="Supprimer votre compte"><strong>Supprimez votre compte</strong></button>  
            </div>  
     </section>
</template>

<script >
import Navbar from '../components/Navbar'
import ProfileAvatar from '../components/ProfileAvatar.vue'

export default {
    name: 'Account',
    components: {
        Navbar,
        ProfileAvatar
    },

    data() {
        return {
            userAccount: {
                userId: localStorage.getItem("userId"),
                username: "",
                createdAt: "",
                jobtitle: "",
            },
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

        
        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },

        uploadFile () {
				this.$refs.fileUpload.click()
		},

        onFileSelected(event) {
            this.avatar = event.target.files[0]
        },
    },
} 
</script>

<style lang="scss">
.btn {
    width: auto;
    margin: 30px 0;
}

#file-input {
    display: none;
}

.modifAvatar {

    margin: 0 auto;
}

</style>