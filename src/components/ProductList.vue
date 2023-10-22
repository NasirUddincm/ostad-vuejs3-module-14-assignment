<script setup>
import { RouterLink } from 'vue-router';

import { useProductStore } from '@/stores/products';
import { computed, ref } from 'vue';

const productStore = useProductStore();

// Filter property
const filter = ref('');


// Pagination properties
const currentPage = computed(() => productStore.currentPage);
const itemsPerPage = computed(() => productStore.itemsPerPage);

// Calculate the start and end the current page
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() => startIndex.value + itemsPerPage.value);



// Pagination methods
const prevPage = () => {
  if (currentPage.value > 1) {
    productStore.currentPage -= 1;
  }
};

const nextPage = () => {
  const lastPage = Math.ceil(productStore.products.length / itemsPerPage.value);
  if (currentPage.value < lastPage) {
    productStore.currentPage += 1;
  }
};

 // Sort property and order
 const sortProperty = ref('name');
  const sortOrder = ref('asc');
  
  // Custom sorting methods
  const sortByName = () => {
    sortProperty.value = 'name';
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  };
  
  const sortByPrice = () => {
    sortProperty.value = 'price';
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  };
  
  // Sorting logic
  const sortedProducts = computed(() => {
    return productStore.products.slice().sort((a, b) => {
      const order = sortOrder.value === 'asc' ? 1 : -1;
      if (a[sortProperty.value] < b[sortProperty.value]) return -1 * order;
      if (a[sortProperty.value] > b[sortProperty.value]) return 1 * order;
      return 0;
    });
  });

  // Filter logic
const filteredProducts = computed(() => {
  return sortedProducts.value.filter((product) => {
    return product.name.toLowerCase().includes(filter.value.toLowerCase());
  });
});
  // Create a computed property for the products to be displayed on the current page
const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value));

</script>

<template>    
    <section class="bg-secondary-subtle py-3">
        <div class="container px-4 py-5" id="custom-cards">
            <h2 class="pb-2 border-bottom text-center fw-bold">Our Products</h2>
        
            <div class="input-group">
                <!-- Filter Input -->
                <input v-model="filter" class="form-control" type="text" placeholder="Filter by name" />
                <!-- Sort Input -->
                <button @click="sortByName" class="btn btn-outline-primary">Sort by Name</button>
                <button @click="sortByPrice" class="btn btn-outline-primary">Sort by Price</button>
            </div>

            <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                <div class="col" v-for="product in paginatedProducts" :key="product.id">
                    <div class="card-blog card-plain">
                        <div class="position-relative">
                        <RouterLink class="d-block blur-shadow-image" :to="`product-details/` + product.id">
                            <img :src="product.image" alt="shadow-sm" class="img-fluid shadow rounded-4">
                        </RouterLink>
                        </div>
                        <div class="card-body px-1 pt-3">
                        
                        <a href="javascript:;" class="nav-link"><h5>{{product.name}}</h5></a>
                        <p><strong>Price:</strong> ${{product.price}} </p>
                        <p>{{product.short}} </p>
                        <button type="button" class="btn btn-warning me-2">Buy Now</button>
                        <router-link type="button" 
                            :to="`product-details/` + product.id"
                            class="btn btn-outline-warning text-dark">
                            View Details
                        </router-link>
                        </div>
                    </div>
                </div>  
            </div>

             <!-- Pagination Controls -->
            <div class="d-flex justify-content-center">
                <button @click="prevPage" class="btn btn-outline-primary">Previous</button>
                <button @click="nextPage"  class="btn btn-outline-primary">Next</button>
            </div>
        </div>
    </section>
</template>