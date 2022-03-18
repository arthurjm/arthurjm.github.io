<template>
    <div id="home">
        <div>
            <h2>Jeux :</h2>
            <ul>
                <li>
                    <router-link :to="{ name: 'Memory' }">Memory</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'Rythm' }">Rythm</router-link>
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
    margin: auto;
}

ul {
    list-style: none;
    padding: 0;
}

li {        
    margin: 10px;
}

a {
    color: var(--text-link-color);
}
</style>
