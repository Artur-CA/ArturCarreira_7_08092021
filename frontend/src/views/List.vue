<template>

     <section>

        <Navbar></Navbar>
        <ListPosts></ListPosts>

     </section>

</template>


<script>
import Navbar from '../components/Navbar'
import ListPosts from '../components/ListPosts'
export default {
    name: 'List',
    components: {
        Navbar,
        ListPosts
    },
}
</script>
  

<style>

</style>