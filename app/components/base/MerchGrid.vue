<template>
  <section class="bg-black py-16">
    <div class="container mx-auto px-6">
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
const { products } = useMerchProducts()
</script>
