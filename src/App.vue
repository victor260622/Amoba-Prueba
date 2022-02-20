<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  position: relative;
  background-color: #ffffff;
  color: #3d465b;
  margin: 0;
}
/* *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
} */
.table-bordered td {
  border: none;
}
thead.vtl-thead.thead-dark {
  display: none !important;
}
</style>
