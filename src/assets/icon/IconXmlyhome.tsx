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

let IconXmlyhome: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M922.378 446.683l-332.489-341.708c-20.623-21.226-48.254-32.907-77.858-32.907-29.574 0-57.248 11.691-77.863 32.907l-332.489 341.708c-34.304 35.317-29.866 65.782-24.207 78.483 4.031 9.051 17.697 33.868 56.993 33.868h48.729v262.877c0 59.707 43.388 115.915 105.099 115.915h141.507v-278.23c0-29.827-4.587-46.459 26.254-46.459h111.874c30.871 0 26.254 16.635 26.254 46.459v278.23h141.507c61.68 0 105.099-56.167 105.099-115.915v-262.877h48.729c39.269 0 52.944-24.843 56.956-33.868 5.727-12.71 10.141-43.194-24.143-78.483zM889.553 504.974h-103.536v316.975c0 29.827-19.472 61.782-50.316 61.782h-86.698v-224.117c0-59.645-19.407-100.525-81.052-100.525h-111.874c-61.689 0-81.052 40.859-81.052 100.525v224.117h-86.721c-30.839 0-50.307-31.954-50.307-61.782v-316.975h-103.521c-0.934 0-1.857-3.771-2.639-3.779 1.86-3.314 5.17-11.556 10.601-17.127l332.508-341.515c9.937-10.211 23.926-16.48 37.519-16.339 13.579-0.007 26.781 6.114 36.647 16.339l332.511 341.515c5.414 5.559 8.716 13.898 10.599 17.127-0.821 0.002-1.74 3.779-2.643 3.779z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconXmlyhome.defaultProps = {
  size: 12,
};

IconXmlyhome = React.memo ? React.memo(IconXmlyhome) : IconXmlyhome;

export default IconXmlyhome;
