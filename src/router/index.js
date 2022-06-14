import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

// const originalPush = VueRouter.prototype.push
//    VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }


Vue.use(VueRouter)

const router = new VueRouter({
    mode:'hash',
    base:process.env.BASE_URL,
    routes
})
export default router