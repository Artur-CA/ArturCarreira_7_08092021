<template>
  <div id="app">
     <header>
        <img src="./assets/icon-white-rse.png" id="logo" alt="Logo Groupomania" />
    </header>

  <router-view></router-view>

  </div>
</template>

<script>

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
body, html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #aeaeae;
}

#app {
  font-family: 'Roboto', sans-serif;
}

header {
  background-color: #ba4d55;
  background-size: cover;
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  font-size: 1.25em;

    & a{
      text-decoration: none;
      color: white;
      margin: auto;
    }
    
    & img {
      width: 22%;
      margin: auto;
    }
}

@media screen and (max-width: 768px) {
  header img {
    width: 35%;
  }
}
@media screen and (max-width: 450px) {
  header img {
    width: 50%;
  }
}
</style>