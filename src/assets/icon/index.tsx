/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconXmlybofang1 from './IconXmlybofang1';
import IconXmlyshenqingshitingke from './IconXmlyshenqingshitingke';
import IconXmlygengxin1 from './IconXmlygengxin1';
import IconXmlygengduo from './IconXmlygengduo';
import IconXmlyxihuan from './IconXmlyxihuan';
import IconXmlyhome from './IconXmlyhome';
import IconXmlykaishi from './IconXmlykaishi';
import IconXmlylook from './IconXmlylook';
import IconXmlyren from './IconXmlyren';
import IconXmlywoting from './IconXmlywoting';
import IconXmlyshangyige from './IconXmlyshangyige';
import IconXmlyxiayige from './IconXmlyxiayige';
import IconXmlyzantingtingzhi from './IconXmlyzantingtingzhi';

export type IconNames = 'icon-xmlybofang1' | 'icon-xmlyshenqingshitingke' | 'icon-xmlygengxin1' | 'icon-xmlygengduo' | 'icon-xmlyxihuan' | 'icon-xmlyhome' | 'icon-xmlykaishi' | 'icon-xmlylook' | 'icon-xmlyren' | 'icon-xmlywoting' | 'icon-xmlyshangyige' | 'icon-xmlyxiayige' | 'icon-xmlyzantingtingzhi';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-xmlybofang1':
      return <IconXmlybofang1 key="1" {...rest} />;
    case 'icon-xmlyshenqingshitingke':
      return <IconXmlyshenqingshitingke key="2" {...rest} />;
    case 'icon-xmlygengxin1':
      return <IconXmlygengxin1 key="3" {...rest} />;
    case 'icon-xmlygengduo':
      return <IconXmlygengduo key="4" {...rest} />;
    case 'icon-xmlyxihuan':
      return <IconXmlyxihuan key="5" {...rest} />;
    case 'icon-xmlyhome':
      return <IconXmlyhome key="6" {...rest} />;
    case 'icon-xmlykaishi':
      return <IconXmlykaishi key="7" {...rest} />;
    case 'icon-xmlylook':
      return <IconXmlylook key="8" {...rest} />;
    case 'icon-xmlyren':
      return <IconXmlyren key="9" {...rest} />;
    case 'icon-xmlywoting':
      return <IconXmlywoting key="10" {...rest} />;
    case 'icon-xmlyshangyige':
      return <IconXmlyshangyige key="11" {...rest} />;
    case 'icon-xmlyxiayige':
      return <IconXmlyxiayige key="12" {...rest} />;
    case 'icon-xmlyzantingtingzhi':
      return <IconXmlyzantingtingzhi key="13" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
