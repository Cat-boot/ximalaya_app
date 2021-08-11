import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {StyleSheet, View} from 'react-native';
import {hp, viewportWidth, wp} from '@/utils/index';
import {ICarouselData} from '@/models/home';

const sliderWidth = viewportWidth;
const slideWidth = wp(90);
const slidHeight = hp(26);
const itemWidth = slideWidth + wp(2) * 2;
interface IProps {
  data: ICarouselData[];
}
class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };
  //获取当前图片下标
  _onSnapToItem = (index: number) => {
    this.setState({activeSlide: index});
  };
  //遍历图片
  renderItem = (
    {item, index}: {item: ICarouselData; index: number},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    return (
      <ParallaxImage
        source={{uri: item.img}} //设置图片路径
        style={styles.images} //设置图片样式
        containerStyle={styles.containerStyle} //设置图片外框尺寸
        parallaxFactor={0.8} //设置视差的大小
        showSpinner={true} //设置显示动画的效果
        spinnerColor={'#f00'} //设置动画的颜色
        {...parallaxProps}
      />
    );
  };
  //get 代表这个函数是一个参数，属性，没法给其传值
  //设置轮播状态栏
  get pagination() {
    const {data} = this.props;
    return (
      <View style={styles.paginationViewStyle}>
        <Pagination
          containerStyle={styles.paginationContainerStyle}
          dotStyle={styles.paginationDotStyle}
          inactiveDotOpacity={0.5}
          inactiveDotScale={0.7}
          dotsLength={data.length}
          activeDotIndex={this.state.activeSlide}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
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
    borderRadius:8,
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
export default Carousel;
