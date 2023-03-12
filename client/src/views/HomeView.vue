<script setup lang="ts">
import request from "../utils/axios";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import Header from "@/components/Shared/Header.vue";
import useProduct from "@/composables/useProduct";
import { onMounted, ref } from "vue";
import ProductTable from "@/components/Shared/ProductTable.vue";

const data: any = ref([]);
const isLoading = ref(true);
const error = ref("");

const getProducts = async () => {
  // isLoading.value = true;
  request
    .get(API_ENDPOINTS.PRODUCT)
    .then((res: any) => {
      isLoading.value = false;
      console.log("res.data: ", res.data);
      const { products } = res.data;
      data.value = products.map((product: any) => ({
        ...product,
        status: {
          name: product.status.toUpperCase(),
          value: product.status.toLowerCase(),
        },
      }));
    })
    .catch((e: any) => {
      isLoading.value = false;
      error.value = e;
      return e;
    });
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <Header />
  <div class="mt-10 mx-10 card flex justify-content-center">
    <div v-if="!isLoading && !error" class="w-full">
      <ProductTable :productList="data" />
    </div>
    <div v-else class="absolute left-1/2 top-1/2">
      <ProgressSpinner />
    </div>
  </div>
</template>
