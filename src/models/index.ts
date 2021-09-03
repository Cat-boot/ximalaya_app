import {DvaLoadingState} from 'dva-loading-ts';

import home, {homeState} from './home';
import category, {CategoryModelState} from '@/models/category';
import album, {IAlbumModelState} from '@/models/album';

const models = [home, category, album];

//使用别名导出home.state的类型
export type RootState = {
  home: homeState;
  category: CategoryModelState;
  album: IAlbumModelState;
  loading: DvaLoadingState;
} & {
  //添加联合类型的model，
  [key: string]: typeof home.state;
};

export default models;
