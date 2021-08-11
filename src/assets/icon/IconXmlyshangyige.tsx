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

let IconXmlyshangyige: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1095 1024" width={size} height={size} {...rest}>
      <Path
        d="M207.646384 472.314833c-25.764686 15.024682-25.764686 55.823487 0 72.990507 30.058801 19.318796 506.667748 322.039704 541.020664 343.500839 25.764686 15.034119 57.965826-2.142338 57.965825-36.495254V165.29981c0-30.058801-30.058801-55.81405-60.108164-36.495253-23.622348 15.024682-498.088957 317.736152-538.878325 343.510276zM914.400988 122.311478c28.831911 0 52.199443 23.367532 52.199443 52.199443v667.758383c0 28.831911-23.367532 52.199443-52.199443 52.199443s-52.199443-23.367532-52.199443-52.199443V174.510921c0-28.831911 23.367532-52.199443 52.199443-52.199443z"
        fill={getIconColor(color, 0, '#666666')}
      />
    </Svg>
  );
};

IconXmlyshangyige.defaultProps = {
  size: 12,
};

IconXmlyshangyige = React.memo ? React.memo(IconXmlyshangyige) : IconXmlyshangyige;

export default IconXmlyshangyige;
