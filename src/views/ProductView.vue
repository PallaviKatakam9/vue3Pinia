<template>
  <ProductFilter ref='filterChild' @search="getSearchProducts" @filterSearch="getProductsByCategory" />

  <ProductsGrid :displayedProducts="displayedProducts"/>
 
  <BContainer class="mt-5" v-if="showPagination">
    <BRow>
      <BCol>
        <div class="overflow-auto">
          <BPagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
          />

          <p class="mt-3">Current Page: {{ currentPage }}</p>
        </div>
      </BCol>
    </BRow>
  </BContainer>

  <Loader v-if="showLoader"/>
</template>

<script setup>
  import { ref, watchEffect, watch, computed } from 'vue';
  import { useStore } from 'vuex';
  import ProductFilter from '@/components/ProductFilter.vue';
  import ProductsGrid from '@/components/ProductsGrid.vue';
  import Loader from '@/components/Loader.vue'
  import { BButton, BCard, BCardText, BCol, BContainer, BPagination, BRow } from 'bootstrap-vue-next';
  const store = useStore()

  let filteredProducts = ref([])
  const perPage = ref(12)
  const rows = ref(0)
  const currentPage = ref(1)
  const filterChild = ref(null)
  const filterClick = ref(true)
  const showPagination = ref(true)
  const showLoader = ref(false)
  const selectedSort = computed(() => filterChild.value?.selectedSort?.value)

  const displayedProducts = computed(() => {
    const enrichedProducts = filteredProducts.value.map(product => {
      const cartItem = store.state.cart.cartProducts.find(c => c.id === product.id)
      return {
        ...product,
        cartQuantity: cartItem ? cartItem.cartQuantity : 0
      }
    })
    showLoader.value = false

    if (selectedSort.value === 'asc') {
      return [...enrichedProducts].sort((a, b) => a.price - b.price)
    } else if (selectedSort.value === 'desc') {
      return [...enrichedProducts].sort((a, b) => b.price - a.price)
    } else {
      return enrichedProducts
    }
  })

  watch(()=>filterChild.value?.selectedCategory,async(val)=>{
    if((val == null && filterChild.value?.searchText =='') || val == null){
      showPagination.value = true
      if(currentPage.value == 1){
        await getProducts()
      }
      currentPage.value = 1
    }else if(filterChild.value?.searchText != '') {
      showPagination.value = true
    }else{
      showPagination.value = false
    }
  })

  watch(()=>filterChild.value?.searchText, async(newVal,oldVal)=>{
    if(oldVal == ''){
      showPagination.value = true
      currentPage.value = 1
    }
    if(newVal == '' && oldVal && !filterChild.value?.selectedCategory){
      filterClick.value = true;
       if(currentPage.value == 1){
        await getProducts()
      }
      currentPage.value = 1
    }else if(filterChild.value?.selectedCategory){
      showPagination.value = false
    }else{
      showPagination.value = true
    }
  })

  watch(currentPage, async()=>{
    if(!filterChild.value?.searchText && !filterChild.value?.selectedCategory){
      await getProducts()
    }else{
      if(filterClick.value == false)
        await getSearchProducts(filterChild.value?.searchText)
    }
  }, {immediate:true})


  async function getProducts(){
    showLoader.value = true
    await store.dispatch('getProducts',currentPage.value-1)
    filteredProducts.value = store.state.product.pageProducts
    rows.value = store.state.product.totalProducts
  }

  async function getSearchProducts(searchText){
    showLoader.value = true
    filterClick.value = true;
    await store.dispatch('getSearchProducts',[searchText,currentPage.value-1])
    filteredProducts.value = store.state.product.filterProducts,
    rows.value = store.state.product.totalFilterProducts
    filterClick.value = false;
  }

  async function getProductsByCategory(category){
    showLoader.value = true
    showPagination.value = false
    await store.dispatch('getProductsByCategory',category.value)
    filteredProducts.value = store.state.product.filterProducts,
    rows.value = store.state.product.totalFilterProducts
  }

</script>

<style scoped>

</style>
