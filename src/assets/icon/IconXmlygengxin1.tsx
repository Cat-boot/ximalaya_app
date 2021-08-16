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

let IconXmlygengxin1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 798.72c163.84 0 294.912-131.072 294.912-294.912L839.68 503.808c0 180.224-147.456 327.68-327.68 327.68-180.224 0-327.68-147.456-327.68-327.68 0-180.224 147.456-327.68 327.68-327.68 98.304 0 186.368 43.008 245.76 110.592L757.76 176.128l32.768 0 0 163.84-163.84 0L626.688 307.2l104.448 0c-53.248-59.392-133.12-98.304-219.136-98.304-163.84 0-294.912 131.072-294.912 294.912C217.088 667.648 348.16 798.72 512 798.72L512 798.72zM512 798.72"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlygengxin1.defaultProps = {
  size: 12,
};

IconXmlygengxin1 = React.memo ? React.memo(IconXmlygengxin1) : IconXmlygengxin1;

export default IconXmlygengxin1;
