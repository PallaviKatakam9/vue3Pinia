<template>
    <BCard :title="product.title" :img-src="product.images && product.images[0]" img-alt="Image" img-top>
        <BCardText>
            <p>
                {{ (product?.description?.length > 150 && !isPopUp) ? product.description.slice(0, 150) + ' ...' : product.description }}
                <span @click="popupHandler(product)" v-show="!isPopUp" style="color: #0d6efd; cursor: pointer;">Read More</span>
            </p>

            <div v-show="isPopUp">
                <p> <span class="fw-bold">Warranty :</span> {{ product.warrantyInformation }}</p>
                <p> <span class="fw-bold">OverAll Rating : </span> {{ product.rating }}</p>
                <p> <span class="fw-bold">Shipping Info : </span> {{ product.shippingInformation }}</p>
                <p> <span class="fw-bold">Return Policy : </span> {{ product.returnPolicy }}</p>
            </div>
        </BCardText>
        <template #footer>
          <p>Price : ${{ product.price }}</p>
          <p v-show="slots.totalPrice"><slot name="totalPrice">Total Price : ${{ (product.price * product.cartQuantity).toFixed(2) }}</slot></p>
          <BButton
            v-if="!product.cartQuantity || product.cartQuantity == 0"
            variant="outline-primary float-end"
            @click="addToCart(product)"
            >Add to Cart</BButton>
          <div class="float-end" v-else>
            <BButton
              variant="outline-primary mx-2 round-button"
              size="sm"
              @click="removeFromCart(product)"
              >-</BButton>
            <span> {{ product.cartQuantity }} </span>
            <BButton
              variant="outline-primary mx-2 round-button"
              size="sm"
              @click="addToCart(product)"
              >+</BButton>
          </div>
        </template>
    </BCard>
</template>

<script setup>
    import {
    BButton,
    BCard,
    BCardText
    } from "bootstrap-vue-next";
    import ProductPopup from '@/components/ProductPopup.vue'

    import { defineProps, useSlots, defineExpose, ref, defineEmits } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()
    const slots = useSlots()
    const props = defineProps({
        product: Object,
        isPopUp: {
            type: Boolean,
            default: false,
        }
    })
    const emit = defineEmits(['open-popup'])

    function popupHandler(product){
        emit('open-popup', product)
    }

    function addToCart(product){
        store.commit('ADD_TO_CART', product)
    }

    function removeFromCart(product){
        store.commit('REMOVE_FROM_CART', product)
    }

</script>