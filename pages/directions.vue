<template>
  <div id="mapbox" />
</template>

<script>
import mapboxgl from 'mapbox-gl'
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

export default {
  data: () => ({
    userLocation: {}
  }),
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYXJhcGwzeSIsImEiOiJjazA4eThjdnkwMzNuM21wYm5rbnhoNTZoIn0.4-8tR6ZMNfGDyoQhjKwHpQ'

    const map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/arapl3y/ck0a824j32m8j1cmwf3pgaqv8', // style URL
      center: [151.20075, -33.88137], // starting position as [lng, lat]
      zoom: 13
    })

    const geolocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    geolocation.on('geolocate', (e) => {
      const lon = e.coords.longitude
      const lat = e.coords.latitude
      this.userLocation.position = [lon, lat]
    })

    const navigationControl = new mapboxgl.NavigationControl()

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      profile: 'mapbox/walking',
      congestion: true,
      unit: 'metric',
      geometries: 'polyline',
      controls: {
        profileSwitcher: false,
        instructions: false
      }
    })

    map.addControl(geolocation)
    map.addControl(navigationControl)
    map.addControl(directions, 'top-left')
  }
}
</script>

<style>
#mapbox {
  width: 100vw;
  height: 100vh;
}
</style>
