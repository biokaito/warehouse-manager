<script setup>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const checked = ref(false);

const { error, login, isPending } = useLogin();

const handleSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    //console.log('logged in')

    router.push({ name: "home" });
  }
};
</script>

<template>
  <div
    class="bg-[#eff3f8] flex items-center justify-center h-full min-w-screen min-h-screen overflow-hidden"
  >
    <div
      class="flex flex-col items-center justify-center xl:w-1/3 xs:1/2 w-10/12"
    >
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
          width: 100%;
        "
      >
        <div
          class="w-full bg-white py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <img
              src="logo-dark.svg"
              alt="warehouse's logo"
              class="mb-5 w-6rem flex-shrink-0"
            />
            <div class="text-900 text-3xl font-medium mb-3">Welcome, Guys!</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="gap-5">
            <label for="email1" class="block text-900 text-xl font-medium mb-2"
              >Email</label
            >
            <InputText
              id="email1"
              type="text"
              placeholder="Email address"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="email"
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >Password</label
            >
            <!-- <Password id="password1" v-model="password" placeholder="Password" toggleMask class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password> -->
            <InputText
              id="password1"
              type="password"
              placeholder="Password"
              class="w-full md:w-30rem mb-5"
              style="padding: 1rem"
              v-model="password"
            />
            <div class="flex items-center justify-between my-5 gap-5">
              <div class="flex items-center">
                <Checkbox
                  v-model="checked"
                  id="rememberme1"
                  binary
                  class="mr-2"
                ></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >Forgot password?</a
              >
            </div>
            <Button
              label="Sign In"
              class="w-full p-3 text-xl"
              :loading="isPending"
              @click="handleSubmit"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
