<script setup>
import { BModal } from "bootstrap-vue-next";
import { defineEmits, defineProps, ref, watch, computed } from "vue";
import ProductCard from "@/components/ProductCard.vue";

import { storeToRefs } from 'pinia'
import { useCartStore } from '@/store/cartPinia'

const cartStore = useCartStore()
const { cartProducts } = storeToRefs(cartStore)

const props = defineProps(["isOpen", "popupProduct"]);
const emit = defineEmits(["update:isOpen"]);

const enrichedProduct = computed(() => {
  const cartItem = cartProducts.value.find(
    (cart) => cart.id === props.popupProduct.id
  );

  return cartItem ? cartItem : props.popupProduct;
});

function closepopUp() {
  emit("update:isOpen", false);
}
</script>

<template>
  <BModal
    v-model="props.isOpen"
    id="modal-center"
    :no-footer="true"
    centered
    :title="enrichedProduct.title"
    @close="closepopUp"
  >
    <ProductCard :product="enrichedProduct" :isPopUp="true" />
  </BModal>
</template>
