import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

//React.FC代表声明Touchable函数类型
//React.memo（只试用于函数组件）相当于React.PureComponent,当父组件的props传递值和上一次不一样时才渲染render，
const Touchable: React.FC<TouchableOpacityProps> = React.memo((props) => (
  <TouchableOpacity activeOpacity={0.8} {...props} />
));
export default Touchable;
