<script setup>
    import { computed, ref, watchEffect, watch, defineEmits, defineExpose } from 'vue';
    import { storeToRefs } from 'pinia'
    import { useProductStore } from '@/store/productPinia'
    import Multiselect from '@vueform/multiselect'
    import '@vueform/multiselect/themes/default.css'
    import { BButton, BInputGroup, BFormInput } from 'bootstrap-vue-next';

    const productStore = useProductStore()
    const {categories : allCategories} = storeToRefs(productStore)
    const selectedCategory = ref('')
    const selectedSort = ref('')
    const searchText = ref('')
    const sortObject = [
        {
            label : 'high to low',
            value : 'desc'
        },
        {
            label : 'low to high',
            value : 'asc'
        }
    ]
    const categories = computed(() =>
        allCategories.value.map(cat => ({
            label: cat.name,
            value: cat.slug
        })) || []
    )

    const emit = defineEmits(['search', 'filterSearch'])
    defineExpose({searchText,selectedCategory,selectedSort})

    watchEffect(async() => {
        if (categories.value.length === 0) {
            await productStore.getCategories()
        }
    })

    function filterSearch() {
        searchText.value = ''
        emit('filterSearch', selectedCategory.value)
    }

    function search() {
        selectedCategory.value = '';
        emit('search',searchText.value)
    }

</script>

<template>
    <div>

        <BInputGroup class="my-3">
            <BFormInput v-model="searchText" placeholder="Search By Product Name"/>
            <BButton @click="search" variant="outline-info">Search</BButton>
        </BInputGroup>

        <Multiselect
            v-model="selectedCategory"
            :options="categories"
            :object="true"
            placeholder="Select categories"
            :create-option="false"
            @select = 'filterSearch'
            :canDeselect ='false'
        >
            <template #option="{ option }">
                <span>{{ option.label }}</span>
            </template>
        </Multiselect>

        <Multiselect
            class="my-3"
            v-model="selectedSort"
            :options="sortObject"
            :object="true"
            placeholder="Sort By Price"
            :create-option="false"
            :canDeselect ='true'
        >
            <template #option="{ option }">
                <span>{{ option.label }}</span>
            </template>
        </Multiselect>
    </div>
</template>