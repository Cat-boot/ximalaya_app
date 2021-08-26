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
  return {BGradientVisible: state.home.BGradientVisible};
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {}
const Tab = createMaterialTopTabNavigator(),
  Navigator = Tab.Navigator,
  Screen = Tab.Screen;
class HomeTopTabs extends React.Component<IProps> {
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };

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
            width: 60,
            padding: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIndicatorStyle: {
            width: 10,
            marginLeft: 25,
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
        <Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '推荐',
          }}
        />
      </Navigator>
    );
  }
}
export default connector(HomeTopTabs);
