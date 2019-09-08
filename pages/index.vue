<template>
  <div
    class="bg-primary text-white text-3xl min-h-screen flex justify-center items-center m-0 py-20 px-6"
  >
    <div class="mx-auto max-w-2xl px-6">
      <div
        class="flex align-middle content-middle items-middle logo text-green-300 font-black leading-none pb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 mr-3"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            class="fill-current"
            d="M22.17 9.17A7 7 0 1 0 14 16.06V20H6v-3h1v-4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4h1v5h16v-2h-3v-3.88a7 7 0 0 0 6.17-6.95zM4.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
          />
        </svg>
        GreenRoutes
      </div>
      <h1 class="block font-black leading-tight text-6xl pb-16">
        Where would you like to explore?
      </h1>
      <form @submit.prevent="handleForm">
        <label for="start" class="block pb-4">Starting point</label>
        <input
          id="start"
          v-model="address"
          type="text"
          name="start"
          class="rounded rounded-r-none py-4 px-8 w-9/12 text-gray-800"
          placeholder="Current location"
        /><button
          type="submit"
          class="w-3/12 p-4 rounded rounded-l-none bg-secondary"
        >
          &rarr;
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  },
  data() {
    return {
      address: ''
    }
  },
  methods: {
    async handleForm() {
      let lat
      let lng

      if (this.address.length > 0) {
        const accessToken =
          'pk.eyJ1IjoiYXJhcGwzeSIsImEiOiJjazA4eThjdnkwMzNuM21wYm5rbnhoNTZoIn0.4-8tR6ZMNfGDyoQhjKwHpQ'

        const url =
          'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
          encodeURIComponent(this.address) +
          '.json?access_token=' +
          accessToken

        const response = await fetch(url)
        const data = await response.json()

        if (
          !data ||
          !data.features ||
          !data.features[0] ||
          !data.features[0].center
        ) {
          alert('Could not find the selected location')
        }

        const coords = data.features[0].center

        if (coords.length >= 2) {
          lng = coords[0]
          lat = coords[1]
        }
      }

      this.$router.push({
        name: 'directions',
        query: {
          lat,
          lng
        }
      })
    }
  }
}
</script>

<style>
label[for='start']:before {
  content: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2015%2014%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M14.26.49L.76%206.14v.73l5.13%201.99%201.98%205.13h.74L14.26.49z%22%2F%3E%3C%2Fsvg%3E');
  @apply inline-block w-6 h-6 mr-4;
}
</style>
