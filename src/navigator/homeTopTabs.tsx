import React from 'react';
import Home from '@/pages/home';
import TopTabBarWrapper from '@/pages/views/topTabBarWrapper';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
const MapStateToProps = (state: RootState) => {
  return {
    BGradientVisible: state.home.BGradientVisible,
    myCategory: state.category.myCategory,
  };
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {}

const Tab = createMaterialTopTabNavigator(),
  Navigator = Tab.Navigator,
  Screen = Tab.Screen;
class HomeTopTabs extends React.Component<IProps> {
  //顶部分类
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };
  //遍历顶部标签栏目
  // _eachScreen = (item: ICategory) => {
  //   return (
  //     <Screen
  //       key={item.id}
  //       name={item.id}
  //       component={Home}
  //       options={{
  //         tabBarLabel: item.name,
  //       }}
  //       initialParams={{
  //         namespace: item.id,
  //       }}
  //     />
  //   );
  // };
  componentWillUnmount() {
    this.setState((state, callback) => {
      return;
    });
  }
  render() {
    const {BGradientVisible} = this.props;
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
        {/*{myCategory.map(this._eachScreen)}*/}
        <Screen
          name="推荐"
          component={Home}
          options={{
            tabBarLabel: '推荐',
          }}
          initialParams={{
            namespace: '推荐',
          }}
        />
      </Navigator>
    );
  }
}
export default connector(HomeTopTabs);
