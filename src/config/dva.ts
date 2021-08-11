import {create} from 'dva-core-ts';
import models from '@/models/index';
import createLoading from 'dva-loading-ts'; //导入dva-loading插件，
//1创建dva实例
const app = create();

//2加载model对象

models.forEach((model)=>{// 使用forEach遍历models
    app.model(model)//app.model加载model
})

app.use(createLoading())
//3启动dva
app.start();
//4导出dva数据
export default app._store;
