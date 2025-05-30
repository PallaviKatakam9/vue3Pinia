<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import ProductsGrid from '@/components/ProductsGrid.vue';

  const store = useStore()
  const cartProducts = computed(() => store.state.cart.cartProducts)

  const totalCartPrice = computed(() => {
    return store.state.cart.cartProducts.reduce((sum, item) => {
      return sum + item.price * item.cartQuantity
    }, 0).toFixed(2)
  })
</script>

<template>
  <main>
    <ProductsGrid :displayedProducts="cartProducts">
      <template #totalPrice></template>
    </ProductsGrid>

    <div class="mt-5">
      <p>Total Cart Price : ${{ totalCartPrice }}</p>
    </div>
  </main>
</template>
