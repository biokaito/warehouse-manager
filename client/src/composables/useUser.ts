const useUser = () => {
    //const logonUser = ref(null);
    // Ref or reactive should always only be used inside of script setup
    // Because it is not server side rendering friendly, and it could cause some memory leaks

    const logonUser = { name: "Triều" }

    return {
        logonUser,
    }
}

export default useUser
