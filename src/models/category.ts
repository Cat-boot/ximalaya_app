import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import storage, {load} from '@/config/storage';
import axios from 'axios';
import {RootState} from '@/models/index';
const categoryUrl = 'category';
export interface ICategory {
  id: string;
  name: string;
  classify?: string;
}
export interface CategoryModelState {
  myCategory: ICategory[];
  category: ICategory[];
  isEdit: boolean;
}
interface CategoryModel extends Model {
  namespace: 'category';
  state: CategoryModelState;
  reducers: {
    setState: Reducer<CategoryModelState>;
  };
  effects: {
    effectsLoadData: Effect;
    effectsIsEdit: Effect;
  };
  //subscriptions语义是订阅的意思，用来订阅一个数据源，根据条件去调用相应的action，因为类别是一般不会修改的，那就把类别数据储存到storage里，这样减少每次都远程请求数据
  subscriptions: SubscriptionsMapObject;
}
const initialState: CategoryModelState = {
  isEdit: false,
  myCategory: [
    {id: '0', name: '推荐'},
    {id: '1', name: 'vip'},
  ],
  category: [],
};
// noinspection ES6ShorthandObjectProperty
const categoryModel: CategoryModel = {
  namespace: 'category',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {...state, ...payload};
    },
  },
  effects: {
    *effectsLoadData(_, {call, put}) {
      //从storage中获取数据
      const myCategory = yield call(load, {key: 'myCategory'});
      const category = yield call(load, {key: 'category'});
      //发起action，将数据保存在state
      if (myCategory) {
        yield put({
          type: 'setState',
          payload: {
            myCategory,
            category,
          },
        });
      } else {
        yield put({
          type: 'setState',
          payload: {
            category,
          },
        });
      }
    },
    *effectsIsEdit({payload}, {put, select}) {
      //select是从state dva仓库拿到所有的数据
      const category = yield select((state: RootState) => state.category);
      yield put({
        type: 'setState',
        payload: {
          isEdit: !category.isEdit,
          myCategory: payload.myCategory,
        },
      });
      //如果是编辑状态，才把myCategory的数据保存在本地
      if (category.isEdit) {
        storage.save({
          key: 'myCategory',
          data: payload.myCategory,
        });
      }
    },
  },
  subscriptions: {
    //setup函数是谁便定义的，只要是在subscriptions对象中的函数，都会在dva加载完后执行
    setup({dispatch}) {
      dispatch({type: 'effectsLoadData'});
    },
    //声明异步函数，执行获取远程数据，
    asyncStorage() {
      //给storage中的sync添加myCategory异步函数
      storage.sync.myCategory = async () => {
        return null;
      };
      //给storage中的sync添加category异步函数
      storage.sync.category = async () => {
        const {data} = await axios.get(categoryUrl);
        return data;
      };
    },
  },
};
export default categoryModel;
