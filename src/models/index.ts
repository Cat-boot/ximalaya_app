import {DvaLoadingState} from 'dva-loading-ts';

import home, {homeState} from './home';
import category, {CategoryModelState} from '@/models/category';

const models = [home, category];

//使用别名导出home.state的类型
export type RootState = {
  home: homeState;
  category: CategoryModelState;
  loading: DvaLoadingState;
};

export default models;
