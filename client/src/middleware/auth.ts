export default function auth({ router }: any) {
  console.log("isLogin: ", localStorage.getItem("isLogin"));
  if (!localStorage.getItem("isLogin")) {
    return router.push({ name: "login" });
  }

  return true;
}
