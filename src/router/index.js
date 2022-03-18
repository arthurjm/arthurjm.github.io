import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => {
            return import('@/views/Home.vue');
        },
        props: true
    },
    {
        path: '/helloworld',
        name: 'HelloWorld',
        component: () => {
            return import('@/views/HelloWorld.vue');
        }
    },
    {
        path: '/memory',
        name: 'Memory',
        component: () => {
            return import('@/views/Memory.vue');
        }
    },
    {
        path: '/rythm',
        name: 'Rythm',
        component: () => {
            return import('@/views/Rythm.vue');
        }
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        redirect: '/'
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router