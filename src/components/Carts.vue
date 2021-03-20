<template>
 <b-container>
    
 </b-container>
</template>

<script>
 
export default {
    props:{
        'id' : {
            type:Number,
            required:true
        },
        'names' : {
            type:String,
            required:true
        },
        'price' : {
            type:String,
            required:true
        } 
    },
     mounted(){
         alert(this.names +" - "+ this.price);
     }
     

}
</script>
 