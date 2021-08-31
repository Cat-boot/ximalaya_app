import {Dimensions} from 'react-native';
import {NavigationState} from '@react-navigation/native';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
//根据屏幕的宽度获取对象百分比宽
function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
//根据屏幕的高度获取对象百分比高
function hp(percentage: number) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}
//获取当前页面焦点的route.name
function getActiveRouteName(state: NavigationState) {
  let route;
  route = state.routes[state.index];
  while (route.state && route.state.index) {
    route = route.state.routes[route.state.index];
  }
  return route.name;
}
export {viewportWidth, viewportHeight, wp, hp, getActiveRouteName};
