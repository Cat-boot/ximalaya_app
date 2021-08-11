/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconXmlyxiayige: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1095 1024" width={size} height={size} {...rest}>
      <Path
        d="M946.479438 472.314833c-40.789368-25.764686-515.255977-328.476157-538.868887-343.510276-30.058801-19.318796-60.108164 6.44589-60.108164 36.495253V852.310925c0 34.352915 32.201139 51.529373 57.965826 36.495254 34.343478-21.470572 510.961862-324.182043 541.020663-343.500839 25.745811-17.176458 25.745811-57.965826-0.009438-72.990507zM239.724835 894.468747c-28.831911 0-52.199443-23.367532-52.199444-52.199443V174.510921c0-28.831911 23.367532-52.199443 52.199444-52.199443s52.199443 23.367532 52.199443 52.199443v667.758383c0 28.831911-23.37697 52.199443-52.199443 52.199443z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </Svg>
  );
};

IconXmlyxiayige.defaultProps = {
  size: 12,
};

IconXmlyxiayige = React.memo ? React.memo(IconXmlyxiayige) : IconXmlyxiayige;

export default IconXmlyxiayige;
