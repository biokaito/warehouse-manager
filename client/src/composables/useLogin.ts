import { ref } from "vue";

const error = ref<any>(null);
const isPending = ref(false);

const login = async (email: string, password: string) => {
  isPending.value = true;
  error.value = null;

  try {
    // const res = await projectAuth.signInWithEmailAndPassword(email, password)
    const res = "successfull";
    error.value = null;
    isPending.value = false;
    localStorage.setItem("isLogin", "true");
    console.log(`Signed in with ${email} and ${password}`);
    return res;
  } catch (err) {
    //console.log(err.message)
    error.value = "Incorrect login credentials";
    isPending.value = false;
  }
};

const useLogin = () => {
  return { error, login, isPending };
};

export default useLogin;
