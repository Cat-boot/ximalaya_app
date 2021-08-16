import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
//设置carousel轮播图路径
const CarouselUrl = 'carousel';
//设置guess路径
const GuessUrl = 'Guess';
//设置channel列表路径
const ChannelUrl = 'channel';
//声明轮播图类型
export interface ICarouselData {
  id: string;
  img: string;
  color: [string, string];
}
//声明猜你喜欢数据类型
export interface IGuess {
  id: number;
  img: string;
  title: string;
}
//声明列表数据类型
export interface IChannel {
  id: string;
  img: string;
  title: string;
  remark: string;
  played: number;
  playing: number;
}
// 声明并导出默认值的属性
export interface homeState {
  ACarouselData: ICarouselData[];
  AGuessData: IGuess[];
  AChannelData: IChannel[];
}
//声明model属性
interface homeModel extends Model {
  namespace: 'home';
  state: homeState;
  reducers: {
    setState: Reducer<homeState>;
  };
  effects: {
    effectsCarousel: Effect;
    effectsGuess: Effect;
    effectsChannel: Effect;
  };
}
//声明默认值
const initailState: homeState = {
  ACarouselData: [],
  AGuessData: [],
  AChannelData: [],
};

const homeModel: homeModel = {
  namespace: 'home',
  state: initailState,
  //同步操作
  reducers: {
    setState(state = initailState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  //异步操作
  effects: {
    *effectsCarousel(__, {call, put}) {
      const {data} = yield call(axios.get, CarouselUrl);
      yield put({
        type: 'setState',
        payload: {
          ACarouselData: data ? data : '',
        },
      });
    },
    *effectsGuess(__, {call, put}) {
      const {data} = yield call(axios.get, GuessUrl);
      yield put({
        type: 'setState',
        payload: {
          AGuessData: data ? data : '',
        },
      });
    },
    *effectsChannel(__, {call, put}) {
      const {data} = yield call(axios.get, ChannelUrl);
      yield put({type: 'setState', payload: {AChannelData: data ? data : ''}});
    },
  },
};
export default homeModel;
