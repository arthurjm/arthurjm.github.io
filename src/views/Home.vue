<template>
    <Header />
    <div>
        <h2>Jeux :</h2>
        <ul>
            <li>
                <router-link :to="{ name: 'memoji' }">Memoji</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: 'Home',
    components: {
        Header,
    },
    data: function () {
        return {
        }
    },
    methods: {
    },
};
</script>

<style scoped>
div {
    text-align: left;
}

a {
    color: var(--text-link-color);
}
</style>
