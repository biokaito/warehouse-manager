import { ref } from "vue";
import request from "../utils/axios";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const isLoading = ref(false);
const error = ref("");

const addProduct = async (product: any) => {
  isLoading.value = true;
  const newProduct = {
    ...product,
    status: product.status ? product.status.value : "instock",
  };
  const respone = await request
    .post(API_ENDPOINTS.PRODUCT, newProduct)
    .then((res: any) => {
      isLoading.value = false;
      return res;
    })
    .catch((e: any) => {
      isLoading.value = false;
      error.value = e;
      return e;
    });
  return respone;
};

const removeProduct = async ({ id }: any) => {
  isLoading.value = true;
  const respone = await request
    .delete(API_ENDPOINTS.PRODUCT, { data: { id } })
    .then((res: any) => {
      isLoading.value = false;
      return res;
    })
    .catch((e: any) => {
      isLoading.value = false;
      error.value = e;
      return e;
    });
  return respone;
};

const updateProduct = async (product: any) => {
  isLoading.value = true;
  const newProduct = {
    ...product,
    status: product.status ? product.status.value : "instock",
  };
  const respone = await request
    .patch(API_ENDPOINTS.PRODUCT, newProduct)
    .then((res: any) => {
      isLoading.value = false;
      return res;
    })
    .catch((e: any) => {
      isLoading.value = false;
      error.value = e;
      return e;
    });
  return respone;
};

const submitExportProduct = async ({ id }: any) => {
  isLoading.value = true;
  const respone = await request
    .patch(API_ENDPOINTS.EXPORT_PRODUCT, { id })
    .then((res: any) => {
      isLoading.value = false;
      return res;
    })
    .catch((e: any) => {
      isLoading.value = false;
      error.value = e;
      return e;
    });
  return respone;
};

const useProduct = () => {
  return {
    addProduct,
    isLoading,
    error,
    removeProduct,
    updateProduct,
    submitExportProduct
  };
};

export default useProduct;
