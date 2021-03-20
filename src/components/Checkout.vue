<template>
    <b-container class="container-fluid" >
        <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Total Items :" label-for="input-md">
            <b-form-input id="input-default" class="w-100 bg-dark text-success text-right font-weight-bold" readonly  :value="getTotalItems()">{{getTotalItems()}}</b-form-input>
        </b-form-group>
        <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Amount :" label-for="input-md">
                <b-form-input id="input-default" class="w-100 bg-dark text-success text-right font-weight-bold" readonly :value="getTotalPrices()"></b-form-input>
        </b-form-group>
        <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Vat Items :" label-for="input-md">
            <b-form-input id="input-default" class="w-100 bg-dark text-success text-right font-weight-bold" readonly :value="data.vat"></b-form-input>
        </b-form-group>
 
         <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Sub total :" label-for="input-md">
            <b-form-input id="input-default" class="w-100 bg-dark text-success text-right font-weight-bold" readonly :value="data.subTotal"></b-form-input>
        </b-form-group>
                <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Cash Tendered :" label-for="input-md">
            <b-form-input type="number" id="input-default" class="w-100 text-success text-right font-weight-bold" value="0.00" v-model="data.cashTendered" @keyup="getChange"></b-form-input>
        </b-form-group>

                <b-form-group class="mx-12" label-cols-md="12" label-size="md" label="Change :" label-for="input-md">
            <b-form-input id="input-default" class="w-100 bg-dark text-success text-right font-weight-bold" readonly :value="data.change"></b-form-input>
        </b-form-group>
            <b-button variant="outline-primary" @click.prevent="fncPayout()">
                Payout
            </b-button>
            <b-button variant="danger">
                Cancel
            </b-button>
            
    </b-container>
</template>

<script>
import {Format } from "../main.js"
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    data(){
        return{  
            items:[], 
            totalClone:0,
            data:{
                totalPrice:0,
                totalItems:0,
                vatableSales:'',
                vat:'',
                subTotal:'',
                cashTendered:0,
                cashTendered_format:0,

                change:'',
                transNos:0
            }  
        }
    }, 
    mounted(){
        axios.get("https://ecommerce-api-test.herokuapp.com/api/cart/show")
        .then(res =>{
            this.items = res.data;  
            console.log(res.data);
            this.getTotalItems();
        }).catch(error => {
                console.log("ERRRR  header:",error.response.data);
        });  
        
        
        if(this.data.totalPrices > 0){
            let total =  this.totalClone; 
            let vat =  (total * .12)/1.12
            let vatableSales = total - vat  
            let subTotal = total
            
            this.data.vat = Format(vat)
            this.data.vatableSales = Format(vatableSales)
            this.data.subTotal = Format(subTotal)  
        } 
    },
    methods:{
        getTotalPrices(){
            let totalPricesdata = this.items.reduce((totalPrices,datas)=>{
                return totalPrices + Number(datas.price) * Number(datas.quantity)
            },0) 
            // BASIC COMPUTATION FOR VAT
            let vat =  (totalPricesdata * .12)/1.12
            let vatableSales = totalPricesdata - vat  
            let subTotal = vat + totalPricesdata


            this.data.totalPrice =  Format(totalPricesdata) 
            this.data.vatableSales = Format(vatableSales)
            this.data.vat = Format(vat)
            this.data.subTotal = Format(subTotal) 
            return this.data.totalPrice 
        },
        getTotalItems(){
            let totalItemdata =  this.items.reduce((totalItems,datas)=>{
                
                return totalItems + Number(datas.quantity) 
            },0) 
            this.data.totalItems = totalItemdata

            return Format(this.data.totalItems)
        },  
        getChange(){  
            if (Number(this.data.cashTendered.replace(/,/g, "")) >= Number(this.data.totalPrice.replace(/,/g, ""))) { 
                if(this.data.cashTendered.length <= 15 ){
                    let change = Number(this.data.cashTendered.replace(/,/g, "")) - Number(this.data.totalPrice.replace(/,/g, ""))
                    this.data.change = Format(change) 

                }  
            }else{
                this.data.change = 0
            } 
        }, 
        fncPayout(){
 
            if (Number(this.data.cashTendered.replace(/,/g, "")) <= Number(this.data.totalPrice.replace(/,/g, ""))) { 
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href>Why do I have this issue?</a>'
                })
            }

            // alert(_vatableSales)

              axios.post("https://ecommerce-api-test.herokuapp.com/api/payout/save",{
                transno:Math.ceil(Math.random()*10),
                users_id:1,
                totalItems:this.data.totalItems,
                totalAmount:this.data.totalPrice.replace(/,/g, ""),
                vatableSales: this.data.vatableSales.replace(/,/g, ""),
                vat:this.data.vat.replace(/,/g, ""),
                cashTendered:this.data.cashTendered.replace(/,/g, ""),
                change:this.data.change.replace(/,/g, "")

              }).then((response)=>{
                this.loadData();  
                console.log(response.data); 
                this.data.totalItems= 0
                this.data.totalAmount= 0
                this.data.vatableSales= ''
                this.data.vat=  ''
                this.data.cashTendered= 0
                this.data.change= 0
                this.items= [] 
                window.location.href = 'http://localhost:8080/'
              });
        },
        loadData(){
            axios.get("https://ecommerce-api-test.herokuapp.com/api/cart/show")
            .then(res =>{
                this.items = res.data;  
                console.log(res.data);
                this.getTotalItems();
            }).catch(error => {
                    console.log("ERRRR  header:",error.response.data);
            });   
        }
        
    }

}
</script>

<style>
.container-fluid{
    border:1px solid black;
    margin-top:10px;
    margin-bottom:10px;
}

</style>