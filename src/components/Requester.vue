<template>
    <div class="vue-tempalte">
        <form @submit="formSubmit">
            <h3>Requester</h3>
            <fieldset class="form-group">
                <legend>Product Name</legend>
               <div>
               <select v-model="selected">
                    <option disabled value="Available">Please Select One</option>
                    <option v-for="items in products" v-bind:key="items">{{items}}</option>
                </select>
               </div>
            </fieldset> 
            <div class="form-group">
                <label>Quantity</label>
                <input type="text" class="form-control form-control-sm">
            </div>
           
            <button type="submit" class="btn btn-dark btn-lg btn-block">Submit</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router/index'
    export default {
        data() {
            return {
                  fullName: '',
                  email : '',
                  mob : '',
                  address:'',
                  selected:"",
                  products:[],
                  file:''
            }
        },
         created() {
            console.log('Component mounted.')
          let currentObj=this;
          
        axios.get('http://localhost:8082/requester/RequestDetails')
        .then(function(response){
            console.log((response.data.data).length)
            let items=[]
            for(var i=0;i<(response.data.data).length;i++)
            {   
                
                items=response.data.data
                //console.log(currentObj.products)
            }
           currentObj.products=[...new Set(items)]
           // console.log(response.data.data)
            console.log(currentObj.products)

        })
        .catch(function(error){
            console.log(error)
           // router.push('homepage')
        })
 
        },
        methods: {
             handelFileUplaod(){
                this.file=this.$refs.file.files[0];
                console.log('file data: '+this.file);

            },
           formSubmit(e) {
                e.preventDefault();
                let currentObj = this;

                 let formData=new FormData();
                
                formData.append('fullName',this.fullName);
                formData.append('mob',this.mob);
                formData.append('email',this.email);
                formData.append('address',this.address);
                formData.append('selected',this.selected);
                formData.append('file',this.file);

                var config = {
                  headers: {'Access-Control-Allow-Origin': 'http://localhost:8081',
                  'Content-Type': 'multipart/form-data'}
                };
                axios.post('http://localhost:8082/requester/requestRoute', formData,config)
                .then(function (response) {
                    currentObj.output = response.body;
                   // console.log(JSON.stringify(response));
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

