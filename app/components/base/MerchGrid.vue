<template>
  <section class="bg-black py-24">
    <div class="container mx-auto px-6">
      <h2
        v-if="title"
        class="text-3xl lg:text-5xl font-bold text-white mb-16 text-center uppercase"
      >
        {{ title }}
      </h2>
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
const { locale } = useI18n()
const { merch } = useMerch()
const { products } = useMerchProducts()

const title = computed(() => {
  const t = merch.value?.title
  return t?.[locale.value] || t?.en || ''
})
</script>
