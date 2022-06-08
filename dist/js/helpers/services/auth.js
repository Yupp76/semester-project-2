import { apiEndpoints } from "../constants/constants.js";

async function authPostForm(email, password) {
  const requestBody = {
    identifier: email.trim(),
    password: password.trim(),
  };
  console.log({requestBody})

  return await axios.post(apiEndpoints.auth, requestBody);
}

export { authPostForm };
