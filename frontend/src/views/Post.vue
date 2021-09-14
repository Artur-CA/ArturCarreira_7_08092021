<template>
     <section>
        <Navbar></Navbar>
          <div class="bloc_register">          
            <h2>📡 Exprimez-vous !</h2>
            <form id="form_register" >
              <div class="form_group">
                <label for="title">Titre :</label>
                <input type="text" id="title" class="form_control" required v-model="inputPost.title"/>
              </div>
              <div class="form_group">
                <label for="content">Contenu :</label>
                <textarea type="text" id="content" rows="5" class="form_control" required v-model="inputPost.content"></textarea>
              </div>
            </form>              
             <button v-on:click="sendPost" class="btn"><strong>Envoyer</strong></button> 
          </div> 
     </section> 
</template>

<script>
import Navbar from '../components/Navbar'
export default {
    name: 'Post',
    components: {
        Navbar,
    },

    data() {
        return {
            inputPost: {
                title: "",
                content: "",
            },
            userId: ""
        }
    },

    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        console.log(this.userId)
    },

    methods: {
        sendPost() {
            let deliverPost = {
                "title": this.inputPost.title,
                "content": this.inputPost.content,
                "userId": this.userId
            }
            console.log(deliverPost)
            let url = "http://localhost:3000/api/posts/new"
            let options = {
                method: "POST",
                body: JSON.stringify(deliverPost),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }
            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.ok) {
                        window.location.reload();
                        this.inputPost = {} // Suppression des inputs
                    } else {
                        alert("C'est posté !");
                    }
                })
                .then(this.$router.push("/list"))
                .then(window.location.reload())
                .catch(error => console.log(error))
        }
    }
}
</script>


<style lang="scss">
section {
    display: flex;
    margin: auto;
    flex-direction: column;
}

textarea {
    height: 11rem;
}


@media screen and (max-width: 768px) {
	section {
    flex-direction: column;
    margin-top: 25px;
    }
}

</style>