// product.js (product store)
import { defineStore } from 'pinia';
import { products } from '@/components/database/products'

export const useProductStore = defineStore('product', {
  
  state: () => ({
    products: products,
    sortBy: 'name',
    sortOrder: 'asc',
    filters: {},
    currentPage: 1,
    itemsPerPage: 6,  
  }),

});
