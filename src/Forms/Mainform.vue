<template>
    <div class="container" >
        <b-container class="ProductList" >
                <div class="d-flex flex-row  flex-wrap justify-content-end d-flex justify-content-start mw-30 mh-50 d-inline" >
                    <div class="p-10" v-for="item in filterData" :key = item.id > 
                        <Cards class="selected mw-50 mh-100"  :id = item.id  :picture = item.picture  :name = item.name :price = item.price />
                    </div>
                </div>
        </b-container>
        
        
    </div>
</template>

<script> 
import axios from 'axios'; 
import Cards from '../components/Cards.vue'
import {bus} from '../main.js'
export default {
    components: { 
        Cards  
        // ,Modals   
    },
    data(){
        return{
            items:[],
            search : ''
        }
    }
    ,
    methods:{
       
    },
    mounted(){
        axios.get("https://ecommerce-api-test.herokuapp.com/api/product/show")
        .then(res =>{
            this.items = res.data.data;  
        })
        bus.$on("search", data =>{ 
            this.search = data 
            // alert(this.search)
        });
    },
    computed:{
        filterData:function(){ 
            if(this.search.length === 0){
                return this.items
            }else{
                return this.items.filter(item => {  
                    return item.name.match(this.search);     
                }); 
            }
                                     
        },
    }
}
</script>

<style scoped>
    *{
        margin:0px;
        padding:0px;
        font-size: 10px;
    }
    .selected:hover{
        border: 1px solid;
        padding: 2px;
        box-shadow: 5px 10px 18px #888888;
        cursor: pointer;
    }
    .selected:active{ 
        padding: 2px;
        box-shadow: 5px 10px 0px #888888;
        cursor: pointer;
    }
    /* .row{
        display:inline;
    } */ 
</style>>
     