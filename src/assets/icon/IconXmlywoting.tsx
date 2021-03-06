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

let IconXmlywoting: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1365 1024" width={size} height={size} {...rest}>
      <Path
        d="M696.661333 957.713067a374.3744 374.3744 0 1 1 0-748.817067 374.3744 374.3744 0 0 1 0 748.817067z m0-68.266667a306.107733 306.107733 0 1 0 0-612.283733 306.107733 306.107733 0 0 0 0 612.283733zM533.2992 484.283733a41.642667 41.642667 0 0 1 41.642667 41.642667v41.5744a41.642667 41.642667 0 1 1-83.217067 0v-41.642667a41.642667 41.642667 0 0 1 41.642667-41.642666z m291.2256 0a41.642667 41.642667 0 0 1 41.642667 41.642667v41.5744a41.642667 41.642667 0 1 1-83.285334 0v-41.642667a41.642667 41.642667 0 0 1 41.642667-41.642666zM41.642667 546.679467a34.133333 34.133333 0 0 1 68.266666 0v124.791466a34.133333 34.133333 0 0 1-68.266666 0V546.679467z m1248.0512 0a34.133333 34.133333 0 0 1 68.266666 0v124.791466a34.133333 34.133333 0 0 1-68.266666 0V546.679467zM234.7008 785.681067a34.133333 34.133333 0 1 1-68.266667 0V567.5008a533.2992 533.2992 0 0 1 1066.5984-0.4096v208.349867a34.133333 34.133333 0 0 1-68.266666 0V567.0912a465.032533 465.032533 0 1 0-930.133334 0.4096v218.180267z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlywoting.defaultProps = {
  size: 12,
};

IconXmlywoting = React.memo ? React.memo(IconXmlywoting) : IconXmlywoting;

export default IconXmlywoting;
