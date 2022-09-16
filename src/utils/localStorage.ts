export function getBoolean(key: string) {
  const value = window.localStorage.getItem(key);
  if (value === "true") {
    return true;
  } else {
    return false;
  }
}

export function getInteger(key: string) {
  let value = 0;
  try {
    value = parseInt(JSON.parse(window.localStorage.getItem(key) || "0"));
  } catch (e) {
    console.error(e);
  }
  return value;
}

export function getString(key: string) {
  return window.localStorage.getItem(key) || "";
}

export function getObject(key: string) {
  let obj = null;
  try {
    obj = JSON.parse(window.localStorage.getItem(key) || "");
  } catch (e) {
    console.error(e);
  }
  return obj;
}

export function set(key: string, value: string | boolean | number | object) {
  if (typeof value === "string") {
    window.localStorage.setItem(key, value);
  } else if (typeof value === "boolean") {
    window.localStorage.setItem(key, "" + value);
  } else if (typeof value === "object") {
    let obj = "";
    try {
      obj = JSON.stringify(value);
    } catch (e) {
      console.error(e);
    } finally {
      window.localStorage.setItem(key, obj);
    }
  } else if (typeof value === "number") {
    window.localStorage.setItem(key, "" + value);
  }
}
