<template>
  <div id="main">
    <div id="red"></div>
    <div id="green"></div>
  </div>
</template>

<script>
export default {
  name: "css-demo",
  components: {},
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
$red: red;
$green: green;

#main {
  width: 500px;
  height: 500px;
}

#red {
  background-color: $red;
  height: 100px;
  height: 200px;
}

#green {
  background-color: $green;
  width: 300px;
  height: 450px;
}
</style>
