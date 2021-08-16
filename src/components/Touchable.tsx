import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

//React.FC代表声明Touchable函数类型
const Touchable: React.FC<TouchableOpacityProps> = (props) => (
  <TouchableOpacity activeOpacity={0.8} {...props} />
);
export default Touchable;
