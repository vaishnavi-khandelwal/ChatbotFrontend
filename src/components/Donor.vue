<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Donor</h3>
            <div class="form-group">
                <label>Product Name</label>
                <input type="text" class="form-control form-control-sm" v-model="offer" required>
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="text" class="form-control form-control-sm">
            </div>
            <div class="form-group">
                <label>Upload Photo</label>
                <input type="file" id="file" name="file" ref= "file" v-on:change="handelFileUplaod()">
            </div>


            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>

       

        </form>
    </div>
</template>
<script>
import {post} from 'axios'
import router from '../router/index'
    export default {
        mounted() {
            console.log('Component mounted.')
 
        },
        data() {
            return {
                  fullName: '',
                  email : '',
                  mob : '',
                  address:'',
                  offer:'',
                  file:''
  
            }
        },
        methods: {
            handelFileUplaod(){
                this.file=this.$refs.file.files[0];
                console.log('file data: '+this.file);

            },
            formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                //uplaod file
                let formData=new FormData();
                
                formData.append('fullName',this.fullName);
                formData.append('mob',this.mob);
                formData.append('email',this.email);
                formData.append('address',this.address);
                formData.append('offer',this.offer);
                formData.append('file',this.file);

                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                   'Content-Type': 'multipart/form-data' }
                };


                post('http://localhost:8082/Donor/donorRoute', formData,config)
                .then(function (response) {
                    currentObj.output = response.data;
                    console.log(JSON.stringify(response));
                    if(response.statusMessage == 'success');
                     router.push({ name: "homepage"});                    
                })
                .catch(function (error) {
                    currentObj.output = error;
                });

               
            }
            

            }  
        
    }
</script>

