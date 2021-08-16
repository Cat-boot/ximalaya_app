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

let IconXmlyshenqingshitingke: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512.219429 182.052571a333.385143 333.385143 0 0 0-333.312 333.312v1.462858a166.765714 166.765714 0 0 1 51.785142-8.265143l4.534858 0.219428v333.165715h56.32a18.285714 18.285714 0 0 0 18.139428-18.212572V518.290286a18.139429 18.139429 0 0 0-18.139428-18.212572h-54.418286a275.236571 275.236571 0 0 1 550.107428 0h-50.322285a18.285714 18.285714 0 0 0-18.285715 18.212572v305.444571c0 10.020571 8.265143 18.285714 18.285715 18.285714h56.32v-333.531428c18.285714 0 35.84 3.145143 52.297143 8.557714v-1.682286a333.165714 333.165714 0 0 0-333.312-333.385142zM64 675.254857c0 73.874286 48.274286 136.557714 114.834286 158.427429V516.900571a166.765714 166.765714 0 0 0-114.834286 158.427429z m781.604571-158.281143v316.342857a166.546286 166.546286 0 0 0 0-316.342857z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlyshenqingshitingke.defaultProps = {
  size: 12,
};

IconXmlyshenqingshitingke = React.memo ? React.memo(IconXmlyshenqingshitingke) : IconXmlyshenqingshitingke;

export default IconXmlyshenqingshitingke;
