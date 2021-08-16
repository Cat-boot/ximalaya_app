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

let IconXmlygengduo: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1056 1024" width={size} height={size} {...rest}>
      <Path
        d="M398.308 780.291l254.655-254.656-254.655-254.751c-5.186-7.778-10.371-15.556-10.371-23.43 0-7.778 2.593-18.149 10.37-23.43a32.977 32.977 0 0 1 46.764 0l278.086 278.182c7.778 7.777 10.37 15.555 10.37 23.43 0 7.777-2.592 18.148-10.37 23.43L447.664 827.054c-7.778 7.778-15.556 10.37-26.023 10.37-7.778 0-18.148-2.592-23.43-10.37-7.777-7.778-10.37-15.556-10.37-23.43 0.096-7.778 5.281-18.149 10.467-23.334z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlygengduo.defaultProps = {
  size: 12,
};

IconXmlygengduo = React.memo ? React.memo(IconXmlygengduo) : IconXmlygengduo;

export default IconXmlygengduo;
