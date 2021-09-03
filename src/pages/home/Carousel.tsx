import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {StyleSheet, View} from 'react-native';
import {hp, viewportWidth, wp} from '@/utils/index';
import {ICarouselData} from '@/models/home';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import Touchable from '@/components/Touchable';
const MapStateToProps = (state: RootState, props: {namespace: string}) => {
  const namespace = props.namespace,
    modelState = state[namespace];
  return {
    ACarouselData: modelState.ACarouselData,
    ActiveCarouselIndex: modelState.ActiveCarouselIndex,
    loading: state.loading.effects[namespace + '/effectsCarousel'],
  };
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;

const sliderWidth = viewportWidth;
const slideWidth = wp(90);
export const slidHeight = hp(26);
const itemWidth = slideWidth + wp(2) * 2;
interface IProps extends ModelState {
  _onPress: (data: string) => void;
  namespace: string;
}

class Carousel extends React.PureComponent<IProps> {
  componentDidMount() {
    this.getACarouselData();
  }
  _onPress = (data: string) => {
    const {_onPress} = this.props;
    if (typeof _onPress === 'function') {
      _onPress(data);
    }
  };
  //获取轮播图欢数据
  getACarouselData = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/effectsCarousel',
      payload: {
        namespace,
      },
    });
  };
  //获取当前图片下标
  _onSnapToItem = (index: number) => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/setState',
      payload: {
        ActiveCarouselIndex: index,
        namespace,
      },
    });
  };
  //遍历图片
  renderItem = (
    {item, index}: {item: ICarouselData; index: number},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <Touchable
        activeOpacity={1}
        onPress={() => {
          this._onPress(item.id);
        }}>
        <ParallaxImage
          {...parallaxProps}
          source={{uri: item.img}} //设置图片路径
          style={styles.images} //设置图片样式
          containerStyle={styles.containerStyle} //设置图片外框尺寸
          parallaxFactor={0.8} //设置视差的大小
          showSpinner={true} //设置显示动画的效果
          spinnerColor={'#f00'} //设置动画的颜色
        />
      </Touchable>
    );
  };
  //get 代表这个函数是一个参数，属性，没法给其传值
  //设置轮播状态栏
  get pagination() {
    const {ACarouselData, ActiveCarouselIndex} = this.props;
    return (
      <View style={styles.paginationViewStyle}>
        <Pagination
          containerStyle={styles.paginationContainerStyle}
          dotStyle={styles.paginationDotStyle}
          inactiveDotOpacity={0.5}
          inactiveDotScale={0.7}
          dotsLength={ACarouselData.length}
          activeDotIndex={ActiveCarouselIndex}
        />
      </View>
    );
  }
  componentWillUnmount() {
    this.setState((state, callback) => {
      return;
    });
  }
  render() {
    const {ACarouselData} = this.props;
    return (
      <View>
        <SnapCarousel
          data={ACarouselData}
          renderItem={this.renderItem}
          itemWidth={itemWidth}
          sliderWidth={sliderWidth}
          hasParallaxImages={true} //开启图片滚动视差
          loop={true}
          autoplay={true}
          onSnapToItem={this._onSnapToItem}
        />
        {this.pagination}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    width: itemWidth,
    height: slidHeight,
    borderRadius: 8,
  },
  images: {
    ...StyleSheet.absoluteFillObject, //设置图片绝对定位
    resizeMode: 'cover', //设置图片伸缩模式
  },
  paginationViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainerStyle: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
    borderRadius: 8,
  },
  paginationDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
export default connector(Carousel);
