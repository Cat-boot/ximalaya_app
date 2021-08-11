import React from 'react';
import {View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from '@/pages/home/Carousel';
import Guess from '@/pages/home/Guess';

const mapStateToProps = (state: RootState) => ({
  ACarouselData: state.home.ACarouselData,
  loading: state.loading.effects['home/effectsCarousel'],
});
const connector = connect(mapStateToProps);

export type ModelState = ConnectedProps<typeof connector>;

interface IProp extends ModelState {
  navigation: RootStackNavigation; //定义要使用this.props里面navigation的类型
}

//定义this.props属性的类型，一般没什么特别用处，就用接口interface类型定义，没必要使用类型别名
class Index extends React.Component<IProp> {
  componentDidMount() {
    this.getACarouselData();
  }

  //点击跳转详情页
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };
  getACarouselData = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/effectsCarousel',
    });
  };
  render() {
    const {ACarouselData} = this.props;
    return (
      <View>
        <Carousel data={ACarouselData} />
        <Guess />
      </View>
    );
  }
}
export default connector(Index);
