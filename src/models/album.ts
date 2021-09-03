import {Model, Effect} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
const ALBUM_URL = 'album/list';
//节目接口类型
interface IProgram {
  id: string;
  title: string;
  playVolume: number;
  duration: string;
  data: string;
}
//作者接口类型
interface IAuthor {
  name: string;
  avatar: string;
}
//state接口类型
export interface IAlbumModelState {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  author: IAuthor;
  introduction: string;
  list: IProgram[];
}
//model接口类型
export interface IAlbumModel extends Model {
  namespace: 'album';
  state: IAlbumModelState;
  reducers: {
    setState: Reducer<IAlbumModelState>;
  };
  effect: {
    fetchAlbum: Effect;
  };
}
//声明默认值
const initialAlbum: IAlbumModelState = {
  id: '',
  title: '',
  summary: '',
  thumbnailUrl: '',
  author: {
    name: '',
    avatar: '',
  },
  introduction: '',
  list: [],
};
//声明model
const albumModel: IAlbumModel = {
  namespace: 'album',
  state: initialAlbum,
  reducers: {
    setState(state = initialAlbum, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effect: {
    *fetchAlbum({payload}, {call, put}) {
      const {data} = yield call(axios.get, ALBUM_URL);
      yield put({
        type: 'setState',
        payload: data,
      });
    },
  },
};
export default albumModel;
