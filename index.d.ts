//声明dva-model-extend这个插件的ts类型
declare module 'dva-model-extend' {
  import {Model} from 'dva-core-ts';
  //声明一个函数，这个函数的类型为Model,传入的每一个参数都为一个类型为Model的对象，
  export default function modelExtend(...Model: Model[]): Model;
}
