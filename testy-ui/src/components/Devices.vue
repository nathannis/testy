<template>
  <main>
    <div class="container">
      <h1>Devices</h1>
      <div class="row">
        <div class="col-md-4" v-for="device in devices" :key="device.id">
          <div class="card mb-4 shadow-sm">
            <div class="card-header"><h2>{{device.name}}</h2></div>
            <div class="card-body">
              <b>{{device.status}}</b>
            <div class="progress" v-if="device.progress">
              <div class="progress-bar" role="progressbar" :aria-valuenow="device.progress"
              aria-valuemin="0" aria-valuemax="100" style="width:70%">
                <span class="sr-only">{{device.progress}}% Complete</span>
              </div>
            </div>
              <div class="d-flex justify-content-between align-items-center">
                <div v-for="sensor in device.sensors" :key="sensor.id">
                  <h2>Sensor: {{sensor.name}}</h2>
                  <span>GPIO status: {{sensor.gpioStatus}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
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
