import Taro, { getStorageSync as _getStorageSync, setStorageSync as _setStorageSync, removeStorageSync as _removeStorageSync, clearStorageSync as _clearStorageSync } from "@tarojs/taro-h5";
function get(key, defaultValue) {
  let value = _getStorageSync(key);
  if (!value || value === ' ' || value === 'undefined' || value === 'null') {
    value = '';
  }
  return value ? JSON.parse(value) : defaultValue;
}
function set(key, value) {
  _setStorageSync(key, JSON.stringify(value));
}
function remove(key) {
  _removeStorageSync(key);
}
function clear() {
  _clearStorageSync();
}
export default {
  get,
  set,
  remove,
  clear
};