import {create} from 'dva-core-ts';
import models from '@/models/index';
// import modelExtend from 'dva-model-extend';
import createLoading from 'dva-loading-ts'; //导入dva-loading插件，
// import homeModel from '@/models/home';
// import home from '@/models/home';
//1创建dva实例
const app = create();

//2加载model对象

models.forEach((model) => {
  // 使用forEach遍历models
  app.model(model); //app.model加载model
});

app.use(createLoading());
//3启动dva
app.start();
//4导出dva数据
export default app._store;

// //避免createHomeModel重复加载，先声明一个接口
// interface Cached {
//   [key: string]: boolean;
// }
// const cached: Cached = {
//   home: true,
// };
// function registerModel(model: Model) {
//   if (!cached[model.namespace]) {
//     app.model(model);
//     cached[model.namespace] = true;
//   }
// }
// // 动态生成首页model，因为每次执行页面都会执行createHomeModel，
// export function createModel(namespace: string) {
//   //modelExtend函数，传入首页homeModel和每一个model唯一不可变的属性对象namespace
//   const model = modelExtend(homeModel, {namespace});
//   //把model传入dva中,
//   registerModel(model);
// }
