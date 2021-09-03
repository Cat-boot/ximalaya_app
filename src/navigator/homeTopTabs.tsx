import React from 'react';
import Home from '@/pages/home';
import TopTabBarWrapper from '@/pages/views/topTabBarWrapper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {ICategory} from '@/models/category';
import {createModel} from '@/config/dva';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
const MapStateToProps = (
  state: RootState,
  props: {route: RouteProp<HomeParamList, string>},
) => {
  const route = props.route;
  const routeName = getFocusedRouteNameFromRoute(route)
    ? getFocusedRouteNameFromRoute(route)
    : '0';
  let modelState;
  if (routeName !== undefined) {
    modelState = state[routeName];
  }
  return {
    BGradientVisible:
      modelState !== undefined ? modelState.BGradientVisible : true,
    myCategory: state.category.myCategory,
  };
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {}
export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};
const Tab = createMaterialTopTabNavigator<HomeParamList>(),
  Navigator = Tab.Navigator,
  Screen = Tab.Screen;
class HomeTopTabs extends React.PureComponent<IProps> {
  //顶部分类
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };
  //遍历顶部标签栏目
  _eachScreen = (item: ICategory) => {
    createModel(item.id);
    return (
      <Screen
        key={item.id}
        name={item.id}
        component={Home}
        options={{
          tabBarLabel: item.name,
        }}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };
  componentWillUnmount() {
    this.setState((state, callback) => {
      return;
    });
  }
  render() {
    const {BGradientVisible, myCategory} = this.props;
    return (
      <Navigator
        tabBar={this.renderTabBar}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={{
          lazy: true,
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIndicatorStyle: {
            width: 0.5,
            backgroundColor: BGradientVisible ? '#fff' : '#f86442',
            borderRadius: 10,
            height: 4,
          },
          tabBarActiveTintColor: BGradientVisible ? '#fff' : '#f86442',
          tabBarInactiveTintColor: '#454545',
          tabBarStyle: {
            elevation: 0,
            flex: 1,
            overflow: 'hidden',
            backgroundColor: 'transparent',
          },
        }}>
        {myCategory.map(this._eachScreen)}
      </Navigator>
    );
  }
}
export default connector(HomeTopTabs);
