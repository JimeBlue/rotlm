<template>
  <section class="bg-black py-24">
    <div class="container mx-auto px-6">
      <h2
        v-if="merchContent?.title"
        class="text-3xl lg:text-5xl font-bold text-white mb-4 text-center uppercase"
      >
        {{ merchContent.title }}
      </h2>
      <div class="mx-auto mt-4 h-1 w-20 bg-primary-500" />
      <p
        v-if="merchContent?.description"
        class="text-white text-center mb-16 mt-8 max-w-2xl mx-auto"
      >
        {{ merchContent.description }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        <BaseMerchCard
          v-for="(product, index) in products"
          :key="index"
          v-bind="product"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { merchContent } = useMerchContent()
const { products } = useMerchProducts()
</script>
