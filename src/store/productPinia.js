import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const pageProducts = ref([])
  const filterProducts = ref([])
  const totalProducts = ref(0)
  const totalFilterProducts = ref(0)
  const categories = ref([])

  const getProducts = async (pageNum = 0) => {
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=12&skip=${12 * pageNum}`)
      const data = await res.json()
      pageProducts.value = data.products
      totalProducts.value = data.total
    } catch (err) {
      console.error('Error fetching products:', err)
      throw err
    }
  }

  const getSearchProducts = async (search, pageNum = 0) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/search/?q=${search}&limit=12&skip=${12 * pageNum}`)
      const data = await res.json()
      filterProducts.value = data.products
      totalFilterProducts.value = data.total
    } catch (err) {
      console.error('Error searching products:', err)
      throw err
    }
  }

  const getCategories = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products/categories')
      const data = await res.json()
      categories.value = data
    } catch (err) {
      console.error('Error fetching categories:', err)
      throw err
    }
  }

  const getProductsByCategory = async (category) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/category/${category}`)
      const data = await res.json()
      filterProducts.value = data.products
      totalFilterProducts.value = data.total
    } catch (err) {
      console.error('Error fetching products by category:', err)
      throw err
    }
  }

  return {
    pageProducts,
    filterProducts,
    totalProducts,
    totalFilterProducts,
    categories,
    getProducts,
    getSearchProducts,
    getCategories,
    getProductsByCategory
  }
})
