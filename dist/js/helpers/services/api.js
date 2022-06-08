import {
  apiEndpoints,
  authenticatedUser,
  requestHeader,
} from "../constants/constants.js";

async function requestGetAssets() {
  return await axios.get(apiEndpoints.home)
}

async function requestGetData(entryID) {
  return entryID
    ? await axios.get(`${apiEndpoints.products}/${entryID}`)
    : await axios.get(apiEndpoints.products);
}

async function requestPostData(entryID, newData) {
  if (!!authenticatedUser === false) return Promise.reject('Wrong token');
  return entryID
    ? await axios.post(`${apiEndpoints.products}/${entryID}`, newData, requestHeader)
    : await axios.post(apiEndpoints.products, newData, requestHeader);
}

async function requestUpdateData(entryID, newData) {
  if (!!authenticatedUser === false || !entryID) return Promise.reject('Wrong token');
  return await axios.put(`${apiEndpoints.products}/${entryID}`, newData, requestHeader);
}

async function requestDeleteEntry(entryID) {
  if (!!authenticatedUser === false || !entryID) return Promise.reject('Wrong token');
  return await axios.delete(`${apiEndpoints.products}/${entryID}`, requestHeader);
}

export {
  requestGetData,
  requestPostData,
  requestUpdateData,
  requestDeleteEntry,
  requestGetAssets,
};
