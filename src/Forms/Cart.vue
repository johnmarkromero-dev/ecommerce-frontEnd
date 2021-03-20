<template>
    <div class="container-fluid">
        <b-row>
            <b-col cols="8">
                <b-container-fluid>
                    <div class="mt-2" v-for="item in items" :key="item.id"  > 
                        <!-- <h4>{{item.name}}</h4> -->
                        <!-- <b-card class="mb-2" id="images" :img-src = 'GetLink(item.picture)' img-alt="Card image" img-left style="max-width: 0rem;" > -->
                            <b-card class="mb-2"   style=" display:flex; flex-direction:column;"  >
                                <img src= 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80' id="images"/>
                                <div class="info">
                                     <b-card-text class="product_details">
                                        <b>Product : {{item.name}}</b>
                                        <b>Unit Price : {{item.price}}</b>
                                        <b>Quantity : {{item.quantity}}</b>
                                        <b>Line total : {{item.subtotal}}</b>
                                    </b-card-text>
                                    <b-button variant="danger" @click="Remove(item.id)" >Remove</b-button>
                                </div>
                            </b-card>
                        </div>
                </b-container-fluid>
            </b-col>
            <b-col cols ="4">
                <Checkout />
            </b-col>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';  
import Checkout from '../components/Checkout.vue'
import {Format} from "../main.js"
import Swal from 'sweetalert2'
export default {
    components: { 
            // Carts  
            // ,
            Checkout   
        },
    data(){
        return{
            // fields: ['Image', 'Name', 'Price','Status'],
            items: [],
            data:{
                totalPrice:'',
                totalItems:'',
                vatableSales:'',
                vat:'',
                subTotal:'',
                cashTendered:'',
                change:'',
                transNos:''
            } 
        }
    },
    methods:{
        GetLink(pic){
            return "https://ecommerce-api-test.herokuapp.com/storage/laptops/" + pic
        },
        Remove(e){
            Swal.fire({
                title: 'Are you sure?',
                // text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    //  alert(this.id)
                     axios.post("https://ecommerce-api-test.herokuapp.com/api/cart/delete",{
                        id:e
                     })
                    .then(res =>{
                        this.items = res.data;  
                        console.log(res.data); 
                        window.location.href = 'http://localhost:8080/cart'
                    }).catch(error => {
                            console.log("ERRRR  header:",error.response.data);
                    });  

                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
            })
        },
       
    },
    mounted(){
        axios.get("https://ecommerce-api-test.herokuapp.com/api/cart/show")
        .then(res =>{
            this.items = res.data;  
            // console.log(res.data);
        }).catch(error => {
                console.log("ERRRR  header:",error.response.data);
        });  
        
        if(this.totalClone > 0){
            let total =  this.totalClone; 
            let vat =  (total * .12)/1.12
            let vatableSales = total - vat  
            let subTotal = total
            
            this.data.vat = Format(vat)
            this.data.vatableSales = Format(vatableSales)
            this.data.subTotal = subTotal  
        }else{
            this.data.vat = 0
            this.data.vatableSales = 0
            this.data.subTotal = 0 
        }
    }
 
}
</script>
<style scoped>
#cardList{

}
.product_details{
    display:flex;
    justify-content: start;
    flex-direction: column;
    font-size: 14;
}
#images{
    width:300px;
    height:30vh;
    display: inline;

}

</style>