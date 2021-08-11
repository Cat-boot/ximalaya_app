import home ,{homeState}from './home';
import {DvaLoadingState} from "dva-loading-ts";

const models=[home];

//使用别名导出home.state的类型
export type RootState = {
    home: homeState;
    loading:DvaLoadingState
}

export default models;