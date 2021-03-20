<template>
   
      <div class="main__importExcel  d-flex flex-column container-fluid">
           <h1>Transaction History</h1>
        <div class="bottom row">
            <table class="table table-striped"  >
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Items</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Vatable Sales</th>
                <th scope="col">Vat</th>
                <th scope="col">Cash Tendered</th>
                <th scope="col">Change</th>


                

                </tr>
            </thead>
            <tbody v-for="item in items" :key="item.id">
                <tr>
                <th scope="row"></th>
                <td>{{item.totalItems}}</td>
                <td>{{item.totalAmount}}</td>
                <td>{{item.vatableSales}}</td>
                <td>{{item.vat}}</td>
                <td>{{item.cashTendered}}</td>
                <td>{{item.change}}</td>

                </tr>
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 
export default {
    data(){
      return{  
          items:[],
      }
    },
    mounted(){
            axios.get("https://ecommerce-api-test.herokuapp.com/api/report/History")
            .then(res =>{
                this.items = res.data;  
                // console.log(res.data);
            }).catch(error => {
                    console.log("ERRRR  header:",error.response.data);
            }); 
    }
}
</script>

<style>

</style>