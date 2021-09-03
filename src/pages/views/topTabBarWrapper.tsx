import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition';
import Touchable from '@/components/Touchable';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {getActiveRouteName} from '@/utils/index';
const MapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
  const routeName = getActiveRouteName(props.state),
    modelState = state[routeName];

  return {
    BGradientVisible: modelState.BGradientVisible,
    linearColors:
      modelState.ACarouselData !== undefined &&
      modelState.ACarouselData.length > 0
        ? modelState.ACarouselData[modelState.ActiveCarouselIndex]
          ? modelState.ACarouselData[modelState.ActiveCarouselIndex].color
          : undefined
        : ['#ccc', '#e2e2e2'],
  };
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
type IProps = MaterialTopTabBarProps & ModelState;
class topTabBarWrapper extends React.PureComponent<IProps> {
  //分类点击跳转页面
  _onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Category');
  };
  get linearGradient() {
    const {linearColors, BGradientVisible} = this.props;
    if (BGradientVisible) {
      return (
        <LinearAnimatedGradientTransition
          colors={linearColors}
          style={styles.linearGradient}
        />
      );
    }
    return null;
  }
  render() {
    const {BGradientVisible, ...resProps} = this.props;
    let textStyle = styles.textStyle;
    if (BGradientVisible) {
      textStyle = styles.textStyleWhile;
    }
    return (
      <View style={styles.container}>
        {this.linearGradient}
        <View style={styles.topViewTabBar}>
          <MaterialTopTabBar {...resProps} />
          <Touchable style={styles.categoryBtn} onPress={this._onPress}>
            <Text style={textStyle}>分类</Text>
          </Touchable>
        </View>
        <View style={styles.bottomViewTabBar}>
          <Touchable style={styles.searchBtn}>
            <Text style={textStyle}>搜索</Text>
          </Touchable>
          <Touchable style={styles.historyBtn}>
            <Text style={textStyle}>历史记录</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
    height: 260,
  },
  container: {
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#fff',
  },
  topViewTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBtn: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#000',
  },
  bottomViewTabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchBtn: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    color: '#fff',
    paddingLeft: 15,
  },
  historyBtn: {
    marginLeft: 15,
  },
  textStyleWhile: {
    color: '#fff',
  },
  textStyle: {
    color: '#333',
  },
});
export default connector(topTabBarWrapper);
