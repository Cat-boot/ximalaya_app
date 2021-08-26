import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackNavigation, RootStackParamList} from '@/navigator/index';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import Listen from '@/pages/listen';
import Found from '@/pages/found';
import Account from '@/pages/account';
import IconFont from '@/assets/icon';
import HomeTopTabs from '@/navigator/homeTopTabs.tsx';

export type BottomTabsParamList = {
  HomeTopTabs: undefined;
  Listen: undefined;
  Found: undefined;
  Account: undefined;
};

type Route = RouteProp<RootStackParamList, 'BottomTabs'>;
interface IProps {
  navigation: RootStackNavigation;
  route: Route;
}
//将声明的BottomTabsParamList类型作为泛型传递给createBottomTabNavigator作为其类型
const tab = createBottomTabNavigator<BottomTabsParamList>(),
  Navigator = tab.Navigator,
  Screen = tab.Screen;
class BottomTabs extends React.Component<IProps> {
  componentDidMount() {
    this.setOptions();
  }
  componentDidUpdate() {
    this.setOptions();
  }
  //改变焦点导航HeaderTitle
  setOptions = () => {
    const {navigation, route} = this.props;
    const routeName = getFocusedRouteNameFromRoute(route)
      ? getFocusedRouteNameFromRoute(route)
      : route.params?.screen || 'HomeTopTabs';
    if (routeName !== undefined) {
      if (routeName === 'HomeTopTabs') {
        navigation.setOptions({
          headerTransparent: true,
          headerTitle: '',
        });
      } else {
        navigation.setOptions({
          headerTransparent: false,
          headerTitle: this.getHeaderTitle(routeName),
        });
      }
    }
  };
  //获取焦点导航headerTitle的名称
  getHeaderTitle = (routeName: string) => {
    switch (routeName) {
      case 'HomeTopTabs':
        return '首页';
      case 'Listen':
        return '我听';
      case 'Found':
        return '发现';
      case 'Account':
        return '账户';
      default:
        return '首页';
    }
  };
  render() {
    return (
      <Navigator
        tabBarOptions={{
          activeBackgroundColor: '#f86442',
          activeTintColor: '#ffffff',
        }}>
        <Screen
          name="HomeTopTabs"
          component={HomeTopTabs}
          options={{
            tabBarLabel: '首页',
            tabBarIcon: ({color, size}) => (
              <IconFont name={'icon-xmlyhome'} color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Listen"
          component={Listen}
          options={{
            tabBarLabel: '我听',
            tabBarIcon: ({color, size}) => (
              <IconFont name={'icon-xmlywoting'} color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Found"
          component={Found}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({color, size}) => (
              <IconFont name={'icon-xmlylook'} color={color} size={size} />
            ),
          }}
        />
        <Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color, size}) => (
              <IconFont name={'icon-xmlyren'} color={color} size={size} />
            ),
          }}
        />
      </Navigator>
    );
  }
}
export default BottomTabs;
