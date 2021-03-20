<template>
    <div class="sticky-top">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#"><router-link to="/" style="width: 40px; height: 40px; margin:0 8px; color:white; text-decoration:none;">Ecommerce Website</router-link></b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
           

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search" @change="ResetProduct()"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0"   @click="SelectedProduct()">Search</b-button>
                </b-nav-form>
                <a href="/Cart">
                    <b-icon-cart2 style="width: 40px; height: 40px; margin:0 8px"></b-icon-cart2>
                </a>
 
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                    <em>Admin</em>
                </template>
                <b-dropdown-item href="#">
                    <router-link to="/import"  >Export CSV File </router-link>
                </b-dropdown-item>
                 <b-dropdown-item href="#">
                    <router-link to="/History"  >Reports </router-link>
                </b-dropdown-item>
                 
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
 
 
</template> 
<script>
import {bus} from '../main.js'
export default ({
    data(){
        return{
            search:''
        }
    },
    methods:{
        SelectedProduct(){  
            bus.$emit("search",this.search);      
        }
        ,
        ResetProduct(){  
            if(this.search.length == 0){
                bus.$emit("search",'');
                // alert(this.search)      
            }
            
        }
    }
    
})
</script>

<style scoped>
   /* *{
       background: red;
   } */

</style>