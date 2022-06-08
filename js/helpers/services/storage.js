function storageGetData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function storageSetData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function storageClearData(key) {
  localStorage.removeItem(key);
}

function sessionGetData(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

function sessionSetData(key, data) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

function sessionClearData(key) {
  sessionStorage.removeItem(key);
}

export {
  storageGetData,
  storageSetData,
  storageClearData,
  sessionGetData,
  sessionSetData,
  sessionClearData,
};
