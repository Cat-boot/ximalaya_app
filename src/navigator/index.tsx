import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {Platform, StatusBar, StyleSheet, Animated} from 'react-native';
import BottomTabs from './bottomTabs';
import Category from '@/pages/category';
import Album from '@/pages/album';
import {RouteProp} from '@react-navigation/native';
export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  Category: undefined;
  Album: {
    data: {
      id: string;
      title: string;
      img: string;
    };
  };
};
//因为有传参，要定义入参的类型，StackNavigationProp的泛性值就是我们传过来的参数类型，也就是RootStackParamList的类型
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

//type 是给一个类型的取别名，例如：type 李狗蛋=李四，那么李狗蛋就是李四的别名,
//RootStackParamList 是谁便定义的，
//这里为什么不使用接口类型，因为createStackNavigator的类型是Record，Record只接收两个参数

let stack = createStackNavigator<RootStackParamList>(),
  Navigator = stack.Navigator,
  Screen = stack.Screen;

class Navigation extends React.Component {
  getAlbumOptions = ({
    route,
  }: {
    route: RouteProp<RootStackParamList, 'Album'>;
  }) => {
    return {
      headerTitle: route.params.data.title,
      headerTransparent: true, //设置标题栏目透明
      headerTitleStyle: {
        //设置头部标题的样式
        opacity: 0,
      },
      headerBackground: () => {
        //设置标题栏目背景
        return <Animated.View style={styles.headerBackground} />;
      },
    };
  };
  render() {
    return (
      <NavigationContainer>
        <Navigator
          headerMode="float" //有三个属性 float所有页面共用一个标题栏样式ios默认效果，none没有标题栏，screen是每个页面都有一个标题栏android默认的效果
          screenOptions={{
            headerTitleAlign: 'center',
            headerTintColor: '#333', //设置标题栏栏目和返回按钮颜色
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit, //定义导航动画
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //定义主题动画
            gestureEnabled: true, //定义主题可以手势拖动关闭当前页面
            gestureDirection: 'horizontal', //改变手势拖动方向
            ...Platform.select({
              android: {
                headerStatusBarHeight: StatusBar.currentHeight, //获取当前状态栏的高度
              },
            }),
            headerBackTitleVisible: false, //隐藏标题栏返回按钮的文字
            headerStyle: {
              ...Platform.select({
                //平台选择
                android: {
                  elevation: 0,
                  borderBottomWidth: StyleSheet.hairlineWidth, //格式化边框
                },
              }),
            }, //设置头部标题栏样式
          }}>
          {/*在Screen配置options比在Navigator里面配置优先级要高*/}
          <Screen
            name="BottomTabs" //相当于导航的链接
            component={BottomTabs} //导航对应的组件
          />
          <Screen
            options={{
              headerTitle: '分类',
            }}
            name="Category" //相当于导航的链接
            component={Category} //导航对应的组件
          />
          <Screen
            options={this.getAlbumOptions}
            name="Album"
            component={Album}
          />
        </Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
});
export default Navigation;
