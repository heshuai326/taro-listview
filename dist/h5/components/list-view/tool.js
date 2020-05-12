import Taro, { createSelectorQuery as _createSelectorQuery } from "@tarojs/taro-h5";
import storage from "../../utils/storage";
export function debounce(method, time = 500) {
  let timer = null;
  return function () {
    const context = this;
    // 在函数执行的时候先清除timer定时器;
    // @ts-ignore
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(function () {
      method.call(context);
    }, time);
  };
}
let timer = null;
let startTime = Date.now();
const throttle = function (func, delay) {
  return function () {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;
    const args = arguments;
    // @ts-ignore
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      // @ts-ignore
      timer = setTimeout(func, remaining);
    }
  };
};
const wait = function (time = 500) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });
};
function lazyScrollInit(className) {
  const lazyKey = `lazy${new Date().getTime()}`;
  const lazyBox = storage.get('lazyBox', []);
  if (lazyBox.length) {
    const length = lazyBox.length;
    const lastKey = lazyBox[length - 1];
    if (new Date().getTime() - Number(lastKey.key.replace('lazy', '')) > 86400000) {
      lazyBox.splice(0, length);
    }
  }
  lazyBox.push({ key: lazyKey, className, viewHeight: 0 });
  storage.set('lazyBox', lazyBox);
  return lazyKey;
}
function lazyScrollRemove() {
  const lazyBox = storage.get('lazyBox', []);
  lazyBox.pop();
  storage.set('lazyBox', lazyBox);
}
function updateScrollHeight(key, viewHeight) {
  const lazyBox = storage.get('lazyBox', []);
  const index = lazyBox.findIndex(i => i.key === key);
  const targetLazy = lazyBox[index];
  lazyBox.splice(index, 1, { ...targetLazy, viewHeight });
  storage.set('lazyBox', lazyBox);
}
function lazyScroll(key, selector, height) {
  const query = Taro.getEnv() === 'WEB' ? `.lazy-image-${key}` : `${selector} >>> .lazy-image-${key}`;
  throttle(() => {
    _createSelectorQuery().selectAll(query).boundingClientRect().exec(res => {
      const list = res[0];
      const indexs = [];
      list.forEach((i, index) => {
        if (i.top > -height * 1.5 && i.top < height * 1.5) {
          // @ts-ignore
          indexs.push(index);
        }
      });
      // @ts-ignore
      if (Taro[key] && typeof Taro[key] === 'function') Taro[key](indexs);
    });
  }, 500)();
}
export default { lazyScroll, wait, debounce, updateScrollHeight, lazyScrollInit, lazyScrollRemove };