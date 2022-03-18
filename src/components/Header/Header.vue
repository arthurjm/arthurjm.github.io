<template>
    <div id="header">
        <router-link :to="'/'">
            <font-awesome-icon icon="home" size="2x" />
        </router-link>
        <ThemeButton />
    </div>
</template>

<script>
import ThemeButton from '@/components/Header/ThemeButton.vue';

export default {
    name: 'Header',

    components: {
        ThemeButton
    }
};
</script>

<style scoped>
#header {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin: 8px;
    width: -webkit-fill-available;
}

a {
    color: var(--text-primary-color);
}
</style>