<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "@/store/cartPinia";
import ProductsGrid from "@/components/ProductsGrid.vue";

const cartStore = useCartStore();

const { cartProducts: allCartProducts } = storeToRefs(cartStore);

const totalCartPrice = computed(() => {
  return allCartProducts.value.reduce((sum, item) => {
    return sum + item.price * item.cartQuantity
  }, 0).toFixed(2)
})

</script>

<template>
  <main>
    <ProductsGrid :displayedProducts="allCartProducts">
      <template #totalPrice></template>
    </ProductsGrid>

    <div class="mt-5">
      <p>Total Cart Price : ${{ totalCartPrice }}</p>
    </div>
  </main>
</template>
