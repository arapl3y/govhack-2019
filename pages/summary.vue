<template>
  <div
    class="bg-primary text-white text-xl min-h-screen flex justify-center items-center text-center m-0 py-16 px-6"
  >
    <div class="mx-auto w-full max-w-2xl">
      <div class="text-green-300 font-black">
        You kept your cool!
      </div>
      <h1 class="block font-black leading-tight text-5xl md:text-6xl pb-6">
        Route stats
      </h1>
      <div class="pb-8 max-w-md mx-auto">
        <img src="/statscard.svg" class="w-full" />
      </div>
      <nuxt-link
        to="/"
        class="inline-block rounded bg-secondary text-white font-black py-4 px-10"
      >
        Explore again &rarr;
      </nuxt-link>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  }
}
</script>

<style></style>
