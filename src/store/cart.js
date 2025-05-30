const cart = ({
    state: {
        cartProducts : []
    },
    mutations: {
        ADD_TO_CART(state,payload){
            const existing = state.cartProducts.find(item => item.id === payload.id)
            if (existing) {
                existing.cartQuantity += 1
            } else {
                state.cartProducts.push({ ...payload, cartQuantity: 1 })
            }
        },
        REMOVE_FROM_CART(state,payload){
            const index = state.cartProducts.findIndex(item => item.id === payload.id)

            if (index !== -1) {
                const existing = state.cartProducts[index]
                existing.cartQuantity -= 1

                if (existing.cartQuantity <= 0) {
                state.cartProducts.splice(index, 1)
                }
            }
        }

    },
    actions: {
        
    }
})

export default cart