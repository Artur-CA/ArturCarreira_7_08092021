<template>

        <div>
            <div class="bloc_comment">
                <textarea type="text" id="content" name="content" class="bloc_text" v-model="content"
                placeholder="Insérer votre pseudo ( ... ) puis votre commentaire"></textarea>
                <a v-on:click="createComment()"><i class="far fa-hand-pointer fa-2x" title="Envoyer" id="icon"></i></a>      
            </div>
            <div v-bind:value="content" v-for="comment in comments" :key="comment.id">
                <div class="bloc_author">
                    <p> {{ dateFormat(comment.createdAt) }} </p>
                 </div>
                 <div class="bloc_comments">
                <p> {{ comment.content }} </p>
                 </div>
            </div>
        </div>
    
</template>


<script >
export default {
    name: "Comments",

    data() {
        return {
            username: "",
            content: "",
            comment: "",
            comments: [],
        }
        
    },
    // Passer des données aux composants enfants avec les props
    props: {
        postId: Number,
        postUserId: Number
    },

    mounted() {
        let url = "http://localhost:3000/api/comments/" + this.postId + "/all";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
        };
        
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.comments = data;
            })
            .catch(error => console.log(error))
    },

    methods: {
        createComment() {
            let deliverComment = {
                "content": this.content,
                "postId": this.postId,
            }
            let url = "http://localhost:3000/api/comments/new"
            let options = {
                method: "POST",
                body: JSON.stringify(deliverComment),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            }

            fetch(url, options)
                .then(res => res.json())
                .then((res) => {
                    if (res.ok) {
                        this.content = {}
                    } else {
                        alert("Commentaire envoyé !");
                    }
                })
                .then(window.location.reload())
                .catch(error => console.log(error))
        },

        dateFormat(date){
            const event = new Date(date);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            return event.toLocaleDateString('fr-FR', options);
        },
    },
}

</script>

<style lang="scss">

.bloc_comment {
  width: 90%;
  margin: 0 auto;
  border-radius: 20px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bloc_comments {
  background-color: #aeaeae;
  text-align: center;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 15px; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow-wrap: anywhere;
}

.bloc_text {
    width: 90%;
    height: auto;
    margin: 20px 0;
}

#icon:hover {
color: #ba4d55;
}

</style>