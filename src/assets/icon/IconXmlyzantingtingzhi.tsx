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

let IconXmlyzantingtingzhi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M688.64 168.96c-40.96 0-74.24 35.84-74.24 74.24v552.96c0 40.96 35.84 74.24 74.24 74.24s74.24-35.84 74.24-74.24V243.2c0-40.96-35.84-74.24-74.24-74.24z m-353.28 0c-40.96 0-74.24 35.84-74.24 74.24v552.96c0 40.96 35.84 74.24 74.24 74.24s74.24-35.84 74.24-74.24V243.2c2.56-40.96-33.28-74.24-74.24-74.24z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlyzantingtingzhi.defaultProps = {
  size: 12,
};

IconXmlyzantingtingzhi = React.memo ? React.memo(IconXmlyzantingtingzhi) : IconXmlyzantingtingzhi;

export default IconXmlyzantingtingzhi;
