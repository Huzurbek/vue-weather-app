<template>
  <div class="main-container">
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  created () {
    this.getWeather({ cityName: 'Moscow' })
  },
  methods: {
    ...mapActions(['getWeather'])
  }
}
</script>
<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

.main-container {
  /*border: 1px solid red;*/
  max-width: 1520px;
  min-width: 360px;
  margin: 0 auto;
  min-height: 1000px;
  color: #1B1B1B;
  font-family: 'Lato';
  font-style: normal;
}
</style>
