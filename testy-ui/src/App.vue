<template>
  <div id="app">
    <section class="jumbotron text-center">
      <div class="container">
        <h1 class="jumbotron-heading">Device Manager</h1>
        <p class="lead text-muted">This web application is all about viewing and managing the status of home devices (mostly centered around my Garage Door, that I can never remember to close)</p>
      </div>
    </section>
    <Devices/>
    <footer class="text-muted">
      <div class="container">
        <p>Device Manager by Nathan Shirlberg</p>
        <p>If you like it or have ideas, let me know nathan-nis@gmail.com</p>
      </div>
    </footer>
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
