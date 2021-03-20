  <!-- :img-src= 'GetLink(this.picture)' -->
<template>
    <div class="container" >
        <b-card 
         
          
            img-src="https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"

            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 10rem ;min-hight: 5rem;font-size:14px; "
            class="mt-2 "
            @click="GetProduct()"
        >
            <b-card-text>
                <b>{{this.name}}</b>
                Php {{GetPrice(this.price)}}
            </b-card-text> 
        </b-card>
        
    </div>
</template> 
<script>
import axios from 'axios'; 
import Swal from 'sweetalert2'
import {Format} from "../main.js";
export default {
    components: { 
        // Modals
    },
    data(){
        return{
            subtotal:0
        }
    },
    props:{
        'id' : {
            type:Number,
            required:true
        },
        'picture' : {
            type:String,
            required:true
        },
        'name' : {
            type:String,
            required:true
        },
        'price' : {
            type:Number,
            required:true
        }

    }, 
    methods:{
        GetPrice(price){
            return Format(price)
        },
        GetLink(pic){
            return "require('./assets/" + pic + " ')"
        },


        GetProduct:function(){
            Swal.fire({
                title: this.name,
                input: 'number',
                onOpen: () => {
                    const input = Swal.getInput()
                    input.oninput = () => { 
                        input.value;
                }},
                inputLabel: 'Price :' + Format(this.price),
                imageUrl: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
                imageHeight: 200,
               
                inputPlaceholder: 'Add Quantity',
                showCancelButton: true,
                confirmButtonText: 'Add to Cart',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                            if (value > '0') {
                                Swal.fire({
                                icon: 'success',
                                title: 'Added!',
                                showConfirmButton: false,
                                timer: 1500
                                })

                                axios.post("https://ecommerce-api-test.herokuapp.com/api/cart/save",{
                                    products_id: this.id,
                                    price: this.price,
                                    quantity: value,
                                    subtotal: value * this.price
                                })
                                .then(res =>{
                                    this.items = res.data.data;  
                                }).catch(error => {
                                    console.log("ERRRR  header:: ",error.response.data);
                                })
                            } else {
                                resolve('Invalid Quantity!')
                            }
                        })
                    }
                })
        }
    },
}
</script>

<style scoped>
b{
    display: block;
}
</style>