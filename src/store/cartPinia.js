import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartProducts = ref([])

    function addToCart(product) {
        const index = cartProducts.value.findIndex(item => item.id === product.id)
        if (index !== -1) {
            const existing = cartProducts.value[index]
            cartProducts.value[index] = {
            ...existing,
            cartQuantity: existing.cartQuantity + 1
            }
        } else {
            cartProducts.value.push({ ...product, cartQuantity: 1 })
        }
    }

    function removeFromCart(product) {
        const index = cartProducts.value.findIndex(item => item.id === product.id)

        if (index !== -1) {
            const item = cartProducts.value[index]
            if (item.cartQuantity > 1) {
                cartProducts.value[index] = {
                    ...item,
                    cartQuantity: item.cartQuantity - 1
                }
            } else {
            cartProducts.value.splice(index, 1)
            }
        }
    }

    return {
        cartProducts,
        addToCart,
        removeFromCart
    }
})