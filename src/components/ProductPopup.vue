<script setup>
import { BModal } from "bootstrap-vue-next";
import { defineEmits, defineProps, ref, watch, computed } from "vue";
import { useStore } from "vuex";

import ProductCard from "@/components/ProductCard.vue";

const store = useStore();

const props = defineProps(["isOpen", "popupProduct"]);
const emit = defineEmits(["update:isOpen"]);

const enrichedProduct = computed(() => {
  const cartItem = store.state.cart.cartProducts.find(
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
