<template>
    <Header />
    <div>
        <h2>Liste :</h2>
        <ul>
            <li>
                <router-link :to="{ name: 'memory' }">Memory</router-link>
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
</style>
