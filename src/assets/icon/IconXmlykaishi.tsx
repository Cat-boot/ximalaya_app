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

let IconXmlykaishi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M763.770279 445.584559c24.702058 14.946029 38.401368 38.818563 38.401368 67.050356 0 28.230576-13.700526 52.103111-38.401368 67.049139L345.696241 832.107491c-25.947561 15.56878-56.255596 16.397088-83.033898 2.07381C235.884042 819.858024 220.523251 794.741204 220.523251 765.057136L220.523251 260.419466c0-29.477295 15.360791-54.802105 42.139092-69.125382 26.778301-14.323277 57.086337-13.493753 83.033898 2.075026L763.770279 445.584559 763.770279 445.584559z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlykaishi.defaultProps = {
  size: 12,
};

IconXmlykaishi = React.memo ? React.memo(IconXmlykaishi) : IconXmlykaishi;

export default IconXmlykaishi;
