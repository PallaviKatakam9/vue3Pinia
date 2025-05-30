import { createStore } from "vuex"
import product from "./product"
import cart from "./cart"

const store = createStore({
  modules: {
    product : product,
    cart : cart
  }
})

export default store