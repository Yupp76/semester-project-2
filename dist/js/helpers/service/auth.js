async function authPostForm({ username, email, password }) {
  axios
    .post("http://localhost:1337/auth/local", {
      identifier: email.trim(),
      password: password.trim(),
    })
    .then((response) => {
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
    })
    .catch((error) => {
      console.log("An error occurred:", error.response);
    });
}

export { authPostForm };
