import Vue from 'vue'
import VueRouter from 'vue-router' 
import App from './App.vue'  
import "./plugins/bootstrap-vue"
import Mainform from './Forms/Mainform.vue'
import Cart from './Forms/Cart.vue'
import Import from './Forms/ImportExcel.vue'
import Reports from './Forms/Reports.vue'

import {  BootstrapVueIcons } from 'bootstrap-vue'


import numeral from 'numeral'

Vue.use(BootstrapVueIcons)
Vue.use(VueRouter);
Vue.config.productionTip = false 
 
const router = new VueRouter({
  mode:'history',
  routes:[ 
    {path:'/',component:Mainform},
    {path:'/Cart',component:Cart},
    {path:'/Import',component:Import},
    {path:'/History',component:Reports}


  ]
}) 

export const bus = new Vue();
export const Format = (number) =>{
  var newFormat = numeral(number).format('0,0.00');
  return newFormat;
} 

new Vue({ 
  router,
  render: h => h(App),
}).$mount('#app')
