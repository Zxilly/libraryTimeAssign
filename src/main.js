import Vue from 'vue'
import VueRouter from 'vue-router'

import vuetify from './plugins/vuetify';

import App from './App.vue'

import welcome from "@/components/welcome";
import add from "@/components/add";
import generate from "@/components/generate";


Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()


const routes = [
    {path: '/', component: welcome},
    {path: '/add', component: add},
    {path: '/generate', component: generate}
]

const router = new VueRouter({
    routes
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
