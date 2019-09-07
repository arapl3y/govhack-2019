<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-green">
    <h1 class="mb-24 text-3xl text-white">Green Track</h1>

    <nuxt-link
      :to="{ path: 'directions' }"
      class="border-2 rounded px-6 py-4 text-white"
      >Start your trip</nuxt-link
    >
  </div>
</template>

<script>
export default {}
</script>

<style></style>
