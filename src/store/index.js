import { createStore } from "vuex"
import cart from "./cart"

const store = createStore({
  modules: {
    cart : cart
  }
})

export default store