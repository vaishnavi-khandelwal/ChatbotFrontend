import axios from 'axios'
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
              feedback: '',
              suggestions:''
              
        }
    },
    methods: {
        formSubmit(e) {
            e.preventDefault();
            let currentObj = this;
            var config = {
              headers: {'Access-Control-Allow-Origin': 'http://localhost:8081'}
            };
            axios.post('http://localhost:8082/feedback/feedbackRoute', {
                fullName: this.fullName,
                email : this.email,
                mob : this.mob,
                feedback : this.feedback,
                suggestions:this.suggestions
            },config)
            .then(function (response) {
                currentObj.output = response.data;
                console.log(JSON.stringify(response));
                if(response.statusMessage == 'success');
                 router.push({ name: "homepage"});                    
            })
            .catch(function (error) {
                currentObj.output = error;
            });
        },
        rating(emit){

            // write your logic here for storing rating value (which comes in the emit variable) in the database            
            alert('rating : '+ emit);
            this.feedback=emit;
            console.log('rating : '+JSON.stringify(emit));
            //remove alert and console log statements its only for debugging purpose.
        }
    }
}
