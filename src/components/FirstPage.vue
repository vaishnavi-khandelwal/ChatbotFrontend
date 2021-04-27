<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Name</h3>
            <p class="forgot-password text-center mt-4 mb-2"> 
                <router-link style="text-decoration: none;" to="/donor"> <button type="submit" class="btn btn-dark btn-lg ">Donate</button></router-link>
            </p>
            <p class="forgot-password text-center mt-5 mb-2"> 
                <router-link style="text-decoration: none;" to="/requester"> <button type="submit" class="btn btn-dark btn-lg ">Request</button></router-link>
            </p>

        </form>
    </div>
</template>

<script>
    export default{
        data(){
            return{}
        }
    }
</script>