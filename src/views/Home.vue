<template>
  <div id="home">
    <div v-for="(category, index) in links" :key="index">
      <h2>{{ category.name }}</h2>
      <ul>
        <li v-for="(link, index) in category.pages" :key="index">
          <PageLink
            :link="link"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PageLink from "@/components/PageLink.vue";

export default {
  name: "Home",

  components: {
    PageLink,
  },

  data() {
    return {
      links: [
        {
          name: "Jeux",
          pages: [
            { name: "Memory", url: "Memory", desktop: true, mobile: true },
            { name: "Rythm", url: "Rythm", desktop: true, mobile: false },
          ],
        },
        {
          name: "Outils",
          pages: [
            {
              name: "Visionneuse d'images",
              url: "Image",
              desktop: true,
              mobile: false,
            },
          ],
        },
      ],
    };
  },
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
  margin: 1% auto;
  width: fit-content;
}
</style>
