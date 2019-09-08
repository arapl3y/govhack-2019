<template>
  <div>
    <div id="mapbox" />

    <div
      v-if="showHeader"
      class="h-28 w-full absolute top-0 left-0 info-box flex flex-row font-body"
    >
      <span
        class="bg-primary w-1/3 flex items-center justify-center py-8 text-white"
      >
        {{ localTemp }} &deg;C
      </span>

      <span class="bg-gray-400 w-1/3 flex items-center justify-center py-8"
        >{{ distance }}km</span
      >
      <span class="bg-gray-300 w-1/3 flex items-center justify-center py-8"
        >{{ duration }} minutes</span
      >
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
// import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw'

export default {
  data: () => ({
    draw: null,
    map: null,
    showHeader: false,
    localTemp: null,
    distance: null,
    duration: null,
    carbonSaved: null
  }),
  mounted() {
    const lat = this.$route.query.lat
    const lng = this.$route.query.lng

    mapboxgl.accessToken =
      'pk.eyJ1IjoiYXJhcGwzeSIsImEiOiJjazA4eThjdnkwMzNuM21wYm5rbnhoNTZoIn0.4-8tR6ZMNfGDyoQhjKwHpQ'

    this.map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/arapl3y/ck0a824j32m8j1cmwf3pgaqv8', // style URL
      center: [lng || 151.20075, lat || -33.88137], // starting position as [lng, lat]
      zoom: 14,
      minZoom: 11
    })

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        // ACTIVE (being drawn)
        {
          id: 'gl-draw-line',
          type: 'line',
          filter: [
            'all',
            ['==', '$type', 'LineString'],
            ['!=', 'mode', 'static']
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-color': '#3b9ddd',
            'line-dasharray': [0.2, 2],
            'line-width': 4,
            'line-opacity': 0.7
          }
        },
        // vertex point halos
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static']
          ],
          paint: {
            'circle-radius': 10,
            'circle-color': '#FFF'
          }
        },
        // vertex points
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static']
          ],
          paint: {
            'circle-radius': 6,
            'circle-color': '#3b9ddd'
          }
        }
      ]
    })

    const geolocation = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    const navigationControl = new mapboxgl.NavigationControl()

    // geolocation.on('geolocate', async (e) => {
    //   const lon = e.coords.longitude
    //   const lat = e.coords.latitude
    // })

    // const directions = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    //   profile: 'mapbox/walking',
    //   congestion: true,
    //   unit: 'metric',
    //   geometries: 'polyline',
    //   controls: {
    //     profileSwitcher: false,
    //     instructions: false
    //   }
    // })

    this.map.addControl(this.draw, 'bottom-right')
    this.map.addControl(geolocation, 'bottom-right')
    this.map.addControl(navigationControl, 'bottom-right')
    // this.map.addControl(directions, 'top-left')

    this.map.on('draw.create', this.updateRoute)
    this.map.on('draw.update', this.updateRoute)
    this.map.on('draw.delete', this.removeRoute)
  },
  methods: {
    async getLocalTemperature(lat, lon) {
      try {
        const req = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c1ce9d512a69e69adeb90b4a243590a9`
        )
        const data = await req.json()

        this.localTemp = data.main.temp
      } catch (err) {
        throw new Error(err)
      }
    },
    updateRoute() {
      this.removeRoute() // overwrite any existing layers
      const data = this.draw.getAll()
      const lastFeature = data.features.length - 1
      const coords = data.features[lastFeature].geometry.coordinates
      const newCoords = coords.join(';')
      this.showHeader = true

      const [lon, lat] = coords[0]

      this.getLocalTemperature(lat, lon)

      this.getMatch(newCoords)
    },
    async getMatch(e) {
      const url =
        'https://api.mapbox.com/directions/v5/mapbox/walking/' +
        e +
        '?geometries=geojson&steps=true&&access_token=' +
        mapboxgl.accessToken

      try {
        const req = await fetch(url)
        const data = await req.json()

        const distance = data.routes[0].distance * 0.001 // convert to km
        const duration = data.routes[0].duration / 60 // convert to minutes

        this.distance = distance.toFixed(2)
        this.duration = duration.toFixed(2)
        this.carbonSaved = (distance * 180).toFixed(2)

        const coords = data.routes[0].geometry
        this.addRoute(coords)
      } catch (err) {
        throw new Error(err)
      }
    },
    addRoute(coords) {
      // check if the route is already loaded
      if (this.map.getSource('route')) {
        this.map.removeLayer('route')
        this.map.removeSource('route')
      } else {
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: coords
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b9ddd',
            'line-width': 8,
            'line-opacity': 0.8
          }
        })
      }
    },
    removeRoute() {
      if (this.map.getSource('route')) {
        this.map.removeLayer('route')
        this.map.removeSource('route')
        this.showHeader = false

        this.localTemp = null
        this.distance = null
        this.duration = null
      } else {
      }
    }
  }
}
</script>

<style>
#mapbox {
  width: 100vw;
  height: 100vh;
}
</style>
