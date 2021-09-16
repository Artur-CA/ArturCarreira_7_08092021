<template>

    <div>
      <div v-for="post in posts" :key="post.id" class="bloc_register">
          <div class="bloc_author">
              <h2> {{ post.user.username }} </h2>
              <p> {{dateFormat(post.createdAt)}}  </p>
          </div>
          <div class="bloc_post">
              <h3 class="title"> {{ post.title }} </h3>
              <h4 class="content"> {{ post.content }} </h4>
          </div>  
          <div class="bloc_delete">
              <button v-if="post.userId == userId || isAdmin == true" 
              type="button" @click="deletePost(post.id)" class="btn" id="delete-btn" aria-label="Supprimez le message"><strong>Supprimez</strong></button>
          </div>

           <Comments :postId="post.id" :postUserId="post.userId" />
      </div>   
    </div>

</template>

<script>
import Comments from "@/components/Comments.vue";
export default {
    name: "ListPosts",
    components: {
        Comments
    },

    data() {
        return {
            username: "",
            jobtitle: "",
            userId: "",
            isAdmin: "",
            posts: []
        }
    },
    mounted() {
        this.userId = JSON.parse(localStorage.getItem("userId"));
        this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
        console.log(localStorage);


        let url = "http://localhost:3000/api/posts";
        let options = {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
        };
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.posts = data;
            })
            .catch(error => console.log(error))
    },

    methods: {

        deletePost(postId) {
            let url = `http://localhost:3000/api/posts/${ postId }`;
            let options = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                }
            };
            fetch(url, options)
                .then((response) => {
                    console.log(response);
                    alert("Suppression du post confirmé !");
                    window.location.reload();
                })
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

.bloc_author {
  width: 90%;
  margin: 0 auto;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bloc_post {
  width: 90%;
  margin: 0 auto;
  border: 6px #aeaeae solid;
  background-color: white;
  border-radius: 20px;
  overflow-wrap: anywhere;

    & .title {
      color: #ba4d55;
    }
}

h3 {
  text-transform: uppercase;
}

#delete-btn {
  margin-bottom: 50px;
  margin-left: 5%;
  display: flex;
  justify-content: left;
}


@media screen and (max-width: 450px) {
  .form-group {
    display: flex;
    flex-direction: column;
  }
}

</style>