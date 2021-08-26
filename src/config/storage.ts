import AsyncStorage from '@react-native-community/async-storage';
import Storage, {LoadParams} from 'react-native-storage';
const storage = new Storage({
  size: 1000, //设置本地储存最大容量，如果超过1000会把之前自动删掉，进行循环存储
  storageBackend: AsyncStorage, // 数据引擎，设置数据保存在本地内存中，以防应用退出数据丢失，如果是浏览器就使用window.localstorage
  defaultExpires: 1000 * 3600 * 24 * 7, //设置过期时间7天，如果是null 就是永远不过期
  enableCache: true, //设置开启缓存
  sync: {}, //当我从storage获取数据时，storage没有相应的数据，获取数据过期了，就会调用sync里面相对应的方法
});
//设置load方法，从storage获取数据
// 为什么要重新封装load函数，是因为在dva调用call方法调用storage.load时会导致load中的this关键字会发生变化
const load = (params: LoadParams) => {
  return storage.load(params);
};

export {load};
export default storage;
