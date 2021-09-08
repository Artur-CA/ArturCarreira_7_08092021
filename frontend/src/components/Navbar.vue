<template>
        <nav id="navbar">
             <router-link to="/account" title="Votre compte"><i class="far fa-address-card"></i></router-link>
            <router-link to="/post" title="Rédiger un post"><i class="fas fa-pencil-alt"></i></router-link> 
            <router-link to="/list" title="Liste des posts"><i class="far fa-envelope"></i></router-link>
            <router-link to="/news" title="Actualités"><i class="fas fa-globe"></i></router-link>
            <router-link to="/" title="Déconnexion"><i @click="deconnect" class="fas fa-sign-out-alt"></i></router-link>
        </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        deconnect() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>

<style lang="scss">
#navbar {
    display: flex;
    flex-direction: column;
    height: 25rem;
    justify-content: space-around;
    position: fixed;
    align-self: flex-end;
    margin: auto;
    border: 5px solid #1a2c4a;
    box-shadow: inset 0px 0px 0px 6px white;
    border-radius: 25px;
    padding: 15px;
    background-image: url("../assets/icon-bg.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    align-items: center;
    margin-top: 50px;
    margin-right: 30px;

    & i {
    font-size: 2em;
    color: #1a2c4a;
    padding: 0 5px 0 5px;
    margin-right: 5px;

        &:hover {
            color: #ba4d55;
            transform: scale(1.1);
            transition: .1s ease-in-out;
        }
    }
}

@media screen and (max-width: 768px) {
	#navbar {
        height: auto;
        width: 75%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        position: relative;
        margin: auto;
    }
}

@media screen and (max-width: 450px) {
	#navbar {
        width: 82%;
    }
}
</style>