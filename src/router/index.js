import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        props: true
    },
    {
        path: '/helloworld',
        name: 'helloworld',
        component: () =>
            import('../views/HelloWorld.vue')
    },
    {
        path: '/memory',
        name: 'memory',
        component: () =>
            import('../views/Memory.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router