import React from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel from '@/pages/home/Carousel';
import Guess from '@/pages/home/Guess';
import Channel from '@/pages/home/Channel';
import {IChannel} from '@/models/home';

const mapStateToProps = (state: RootState) => ({
  ACarouselData: state.home.ACarouselData,
  AChannelData: state.home.AChannelData,
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
    this.getAChannelData();
  }

  //点击跳转详情页
  onPress = () => {
    const {navigation} = this.props;
    navigation.navigate('Detail', {
      id: 100,
    });
  };
  //获取猜你喜欢数据
  getACarouselData = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/effectsCarousel',
    });
  };
  //获取列表数据
  getAChannelData = () => {
    const {dispatch} = this.props;
    dispatch({type: 'home/effectsChannel'});
  };
  //遍历列表数据
  _renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <Channel data={item} />;
  };
  //将轮播图和猜你喜欢作为头部放进FlatList，
  _ListHeaderComponent = () => {
    const {ACarouselData} = this.props;
    return (
      <View>
        <Carousel data={ACarouselData} />
        <Guess />
      </View>
    );
  };
  render() {
    const {AChannelData} = this.props;
    return (
      <FlatList
        ListHeaderComponent={this._ListHeaderComponent}
        data={AChannelData}
        renderItem={this._renderItem}
      />
    );
  }
}
export default connector(Index);
