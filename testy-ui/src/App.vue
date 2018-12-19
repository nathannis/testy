<template>
  <div id="app">
    <Devices/>
  </div>
</template>

<script>
import Devices from './components/Devices.vue'

export default {
  name: 'app',
  components: {
    Devices
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
