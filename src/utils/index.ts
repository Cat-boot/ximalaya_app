import {Dimensions} from 'react-native';

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
export {viewportWidth, viewportHeight, wp, hp};
