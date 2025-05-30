const product = ({
    state: {
        pageProducts : [],
        filterProducts : [],
        totalProducts : 0,
        totalFilterProducts : 0,
        categories : []
    },
    mutations: {
        ALL_PRODUCTS(state,payload){
            state.pageProducts = payload.products;
            state.totalProducts = payload.total
        },
        FILTER_PRODUCTS(state,payload){
            state.filterProducts = payload.products;
            state.totalFilterProducts = payload.total
        },
        ALL_CATEGORIES(state,payload){
            state.categories = payload;
        },
    },
    actions: {
        getProducts({ commit },pageNum) {
            return new Promise((resolve, reject)=>{
                fetch(`https://dummyjson.com/products?limit=12&skip=${12*pageNum}`)
                .then(res => res.json())
                .then(data => {
                    commit('ALL_PRODUCTS', data)
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        getSearchProducts({ commit },[search,pageNum]) {
            return new Promise((resolve, reject)=>{
                fetch(`https://dummyjson.com/products/search/?q=${search}&limit=12&skip=${12*pageNum}`)
                .then(res => res.json())
                .then(data => {
                    commit('FILTER_PRODUCTS', data)
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        getCategories({ commit }) {
            return new Promise((resolve, reject)=>{
                fetch('https://dummyjson.com/products/categories')
                .then(res => res.json())
                .then(data => {
                    commit('ALL_CATEGORIES', data)
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            })
        },
        getProductsByCategory({ commit },category) {
            return new Promise((resolve, reject)=>{
                fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => {
                    commit('FILTER_PRODUCTS', data)
                    resolve()
                }).catch(err =>{
                    reject(err)
                })
            })
        },
    }
})

export default product