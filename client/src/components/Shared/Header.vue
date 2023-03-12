<template>
  <div>
    <Toolbar>
      <template #start>
        <div class="ml-10">
          <router-link to="/">
            <Image
              src="shark03.jpg"
              alt="Image Text"
              width="80"
              class="cursor-pointer"
            />
          </router-link>
        </div>
        <!-- <Sidebar v-model:visible="visible">
          <h2>Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
        <Button icon="pi pi-arrow-right" @click="visible = true" /> -->
      </template>

      <template #end>
        <div class="layout-topbar-menu mr-10">
          <button class="p-link layout-topbar-button">
            <i class="pi pi-calendar"></i>
          </button>
          <button class="p-link layout-topbar-button">
            <i class="pi pi-user"></i>
          </button>
          <button class="p-link layout-topbar-button">
            <i class="pi pi-cog"></i>
          </button>
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-topbar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--text-color-secondary);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color 0.2;

  &:hover {
    color: var(--text-color);
    background-color: var(--surface-hover);
  }

  i {
    font-size: 1.5rem;
  }

  span {
    font-size: 1rem;
    display: none;
  }
}
</style>
