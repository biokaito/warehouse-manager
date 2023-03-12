<template>
  <div class="w-full">
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <div class="space-x-2">
            <Button
              label="New"
              icon="pi pi-plus"
              severity="success"
              @click="openNew"
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedProducts || !selectedProducts.length"
            />
          </div>
        </template>

        <template #end>
          <div class="space-x-2 min-w-fit flex">
            <FileUpload
              mode="basic"
              accept="image/*"
              :maxFileSize="1000000"
              label="Import"
              chooseLabel="Import"
              class="mr-2 inline-block"
            />
            <Button
              label="Export"
              icon="pi pi-upload"
              severity="help"
              @click="exportCSV($event)"
            />
          </div>
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="products"
        v-model:selection="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Manage Products</h4>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></Column>
        <Column
          field="id"
          header="Code"
          sortable
          style="min-width: 5rem"
        ></Column>
        <Column
          field="name"
          header="Name"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column
          field="provider"
          header="Provider"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column field="price" header="Price" sortable style="min-width: 8rem">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column field="stock" header="Stock" sortable style="min-width: 8rem">
          <template #body="slotProps">
            {{ slotProps.data.stock }}
          </template>
        </Column>
        <Column field="status" header="Status" style="min-width: 12rem">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status.name"
              :severity="getStatusLabel(slotProps.data.status.name)"
            />
          </template>
        </Column>
        <Column
          field="manufacturingDate"
          header="Manufacturing Date"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column
          field="expiredDate"
          header="Expery Date"
          sortable
          style="min-width: 12rem"
        ></Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <div
              class="space-x-2"
              v-if="slotProps.data.status.value !== 'exported'"
            >
              <Button
                icon="pi pi-pencil"
                outlined
                rounded
                class="mr-2"
                @click="editProduct(slotProps.data)"
              />
              <Button
                icon="pi pi-send"
                outlined
                rounded
                severity="danger"
                @click="exportProduct(slotProps.data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name*</label>
        <InputText
          id="name"
          v-model.trim="product.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !product.name }"
        />
        <small class="p-error" v-if="submitted && !product.name"
          >Name is required.</small
        >
      </div>

      <div class="field">
        <label for="provider">Provider*</label>
        <InputText
          id="provider"
          v-model.trim="product.provider"
          required="true"
          :class="{ 'p-invalid': submitted && !product.provider }"
        />
        <small class="p-error" v-if="submitted && !product.provider"
          >Provider is required.</small
        >
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Dropdown
          id="inventoryStatus"
          v-model="product.status"
          :options="statuses"
          optionLabel="name"
          placeholder="Select a Status"
        >
        </Dropdown>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="manufacturingDate">Manufacturing Date*</label>
          <Calendar
            id="manufacturingDate"
            v-model="product.manufacturingDate"
            required="true"
            :class="{ 'p-invalid': submitted && !product.manufacturingDate }"
          />
          <small class="p-error" v-if="submitted && !product.manufacturingDate"
            >Manufacturing Date is required.</small
          >
        </div>
        <div class="field col">
          <label for="expiredDate">Expired Date</label>
          <Calendar id="expiredDate" v-model="product.expiredDate" />
        </div>
      </div>

      <div class="formgrid grid">
        <div class="field col">
          <label for="price">Price*</label>
          <InputNumber
            id="price"
            v-model="product.price"
            mode="currency"
            currency="USD"
            locale="en-US"
            required="true"
            :class="{ 'p-invalid': submitted && !product.price }"
          />
          <small class="p-error" v-if="submitted && !product.price"
            >Price is required.</small
          >
        </div>
        <div class="field col">
          <label for="quantity">Quantity*</label>
          <InputNumber
            id="quantity"
            v-model="product.stock"
            integeronly
            required="true"
            :class="{ 'p-invalid': submitted && !product.stock }"
          />
          <small class="p-error" v-if="submitted && !product.stock"
            >Quantity is required.</small
          >
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          text
          @click="hideDialog"
          :loading="isLoading"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          text
          @click="saveProduct"
          :loading="isLoading"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete the selected products?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          :loading="isLoading"
          @click="deleteProductsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          text
          :loading="isLoading"
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="exportProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to export the selected product?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          :loading="isLoading"
          @click="exportProductsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          text
          :loading="isLoading"
          @click="exportSelectedProduct"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import useProduct from "@/composables/useProduct";

interface IProductTableProps {
  productList: any[];
}

const props = defineProps<IProductTableProps>();

const {
  addProduct,
  error,
  isLoading,
  removeProduct,
  updateProduct,
  submitExportProduct,
} = useProduct();
const toast = useToast();
const dt = ref();
const products = ref(props.productList);
const productDialog = ref(false);
const deleteProductsDialog = ref(false);
const exportProductsDialog = ref(false);
const product = ref<any>({});
const selectedExportProduct = ref<any>({});
const selectedProducts = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
  { name: "INSTOCK", value: "instock" },
  { name: "LOWSTOCK", value: "lowstock" },
  { name: "OUTOFSTOCK", value: "outofstock" },
]);

const formatCurrency = (value: any) => {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  return;
};
const formatDatetime = (datetime: any) => {
  const createdDate = new Date(datetime);

  const day = createdDate.getDate();
  const month = createdDate.getMonth() + 1; //months are zero based
  const year = createdDate.getFullYear();

  return (
    day.toString().padStart(2, "0") +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    year
  );
};
const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = async () => {
  submitted.value = true;
  const shadownProduct = { ...product.value };
  if (
    shadownProduct.name?.trim() &&
    shadownProduct.provider?.trim() &&
    shadownProduct.manufacturingDate &&
    shadownProduct.price &&
    shadownProduct.stock
  ) {
    shadownProduct.manufacturingDate = formatDatetime(
      shadownProduct.manufacturingDate
    );
    if (shadownProduct.expiredDate) {
      shadownProduct.expiredDate = formatDatetime(shadownProduct.expiredDate);
    }
    if (!shadownProduct.id) {
      addProduct(shadownProduct).then((res: any) => {
        console.log("res: ", res);
        if (res.data) {
          product.value.id = res.data;
          products.value.push(product.value);
          productDialog.value = false;
          product.value = {};
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Created",
            life: 3000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Failed",
            detail: "Product Failed",
            life: 3000,
          });
        }
      });
    }
    if (product.value.id) {
      const prodIndex = findIndexById(product.value.id);
      await updateProduct(product.value).then((res) => {
        console.log("res: ", res);
        if (res.data) {
          products.value[prodIndex] = product.value;
          productDialog.value = false;
          product.value = {};
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Updated",
            life: 3000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Failed",
            detail: "Product Failed",
            life: 3000,
          });
        }
      });
    }
  }
};
const editProduct = (prod: any) => {
  product.value = { ...prod };
  productDialog.value = true;
};
const exportProduct = (prod: any) => {
  selectedExportProduct.value = { ...prod };
  exportProductsDialog.value = true;
};

const exportSelectedProduct = async () => {
  const prodIndex = findIndexById(selectedExportProduct.value.id);
  submitExportProduct({ id: selectedExportProduct.value.id }).then((res) => {
    if (res.data) {
      products.value[prodIndex] = {
        ...selectedExportProduct.value,
        status: { name: "EXPORTED", value: "exported" },
      };
      toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Product Exported",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Failed",
        detail: "Product Exported",
        life: 3000,
      });
    }
    exportProductsDialog.value = false;
    selectedExportProduct.value = {};
  });
};

const findIndexById = (id: any) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};
const deleteSelectedProducts = async () => {
  for (let index = 0; index < selectedProducts.value.length; index++) {
    const product = selectedProducts.value[index];
    const res = await removeProduct({ id: product.id });

    console.log("res delete: ", res);
  }

  products.value = products.value.filter(
    (val: any) => !selectedProducts.value.includes(val)
  );
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({
    severity: "success",
    summary: "Successful",
    detail: "Products Deleted",
    life: 3000,
  });
};

const getStatusLabel = (status: any) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "info";

    case "EXPORTED":
      return "danger";

    default:
      return null;
  }
};
</script>
