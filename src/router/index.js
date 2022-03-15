import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => {
            return import('../views/Home.vue');
        },
        props: true
    },
    {
        path: '/helloworld',
        name: 'helloworld',
        component: () => {
            return import('../views/HelloWorld.vue');
        }
    },
    {
        path: '/memory',
        name: 'memory',
        component: () => {
            return import('../views/Memory.vue');
        }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router