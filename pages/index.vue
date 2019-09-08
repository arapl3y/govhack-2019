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

<<<<<<< HEAD
<style></style>
=======
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  @apply bg-primary text-white w-full h-full m-0 p-0;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 900;
  font-size: 100px;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
>>>>>>> 4a4cc6f6569bd110a90e6ef592ee29deb0256660
