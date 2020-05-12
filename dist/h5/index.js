import Taro from "@tarojs/taro-h5";
import ListView from "./components/list-view/index";
Taro.initPxTransform({ designWidth: 750,
  deviceRatio: {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  } });
export { default as Skeleton } from './components/skeleton/index';
export { default as ListView } from './components/list-view';
export { default as LazyBlock } from './components/list-view/block';
export default ListView;