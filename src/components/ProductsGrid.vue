<template>
  <BRow v-if="displayedProducts?.length > 0">
    <BCol md="4" xl="3" v-for="item in displayedProducts">
      <ProductCard :product="item" :isPopUp="false" @open-popup="handlePopupOpen"/>
    </BCol>

    <ProductPopup v-model:isOpen="openPopup" :popupProduct="selectedProduct" />
  </BRow>

  <BRow v-else>
    <p>No Products</p>
  </BRow>
</template>

<script setup>
    import {
    BCol,
    BRow,
    } from "bootstrap-vue-next";

    import { defineProps, ref } from 'vue';
    import ProductCard from '@/components/ProductCard.vue';
    import ProductPopup from '@/components/ProductPopup.vue'

    const selectedProduct = ref({})
    const openPopup = ref(false)
    
    const props = defineProps({
      displayedProducts: {
          type: Array,
          default: () => []
      }
    })

    function handlePopupOpen(product) {
      selectedProduct.value = product
      openPopup.value = true
    }

   
</script>

<style scoped>
    .card-title{
      height: 50px;
    }

  .round-button{
    border-radius: 50% !important;
    width: 30px;
    height: 30px;
  }
</style>
