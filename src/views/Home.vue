<template>
    <div id="home">
        <div>
            <h2>Jeux :</h2>
            <ul>
                <li>
                    <router-link :to="{ name: 'memory' }">Memory</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
};
</script>

<style scoped>
#home {
    display: flex;
    justify-content: center;
}

ul {
    list-style: none;
    padding: 0;
}

a {
    color: var(--text-link-color);
}
</style>
