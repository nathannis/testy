<template>
  <div class="hello">
    <h1>Devices</h1>
    <div class="card bg-success" v-for="device in devices" :key="device.id">
      <div class="card-header"><h2>{{device.name}}</h2></div>
      <div class="card-body">
        <h3>{{device.status}}</h3>
        <div class="card bg-primary" v-for="sensor in device.sensors" :key="sensor.id">
          <div class="card-header"><h2>Sensor {{sensor.name}}</h2></div>
          <div class="card-body"><span>GPIO status: {{sensor.gpioStatus}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Devices',
  data () {
    return {
      devices: null
    }
  },
  methods: {
    reload () {
      axios.get(`/api/devices`)
        .then(response => {
          this.devices = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.reload()
  }
}
</script>

<style scoped>
</style>
