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
  AChannelData: state.home.AChannelData,
  loading: state.loading.effects['home/effectsChannel'],
});
const connector = connect(mapStateToProps);

export type ModelState = ConnectedProps<typeof connector>;

interface IProp extends ModelState {
  navigation: RootStackNavigation; //定义要使用this.props里面navigation的类型
}
//定义state属性类型
interface IState {
  refreshing: boolean;
}

//定义this.props属性的类型，一般没什么特别用处，就用接口interface类型定义，没必要使用类型别名
class Index extends React.Component<IProp, IState> {
  state = {refreshing: false};
  componentDidMount() {
    this.getAChannelData();
  }
  //点击跳转详情页
  _onPress = (data: any) => {
    console.log(data);
  };

  //获取列表数据
  getAChannelData = () => {
    const {dispatch} = this.props;
    dispatch({type: 'home/effectsChannel'});
  };
  //相当于给Channel组件绑定id，如果id不一样才渲染不一样的列表，相同的不渲染，减少内存消耗
  _keyExtractor = (item: IChannel) => {
    return item.id;
  };
  //下拉刷新
  _onRefresh = () => {
    //1.改变refreshing状态为true
    this.setState({refreshing: true});
    //2.改变数据
    const {dispatch} = this.props;
    dispatch({
      type: 'home/effectsChannel',
      callback: () => {
        //1.改变refreshing状态为false
        this.setState({refreshing: false});
      },
    });
  };
  //上拉加载更多
  _onEndReached = () => {
    const {dispatch} = this.props;
    dispatch({type: 'home/effectsChannel'});
    console.log('--加载更多--');
  };
  //遍历列表数据
  _renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <Channel data={item} _onPress={this._onPress} />;
  };
  //将轮播图和猜你喜欢作为头部放进FlatList，
  _ListHeaderComponent = () => {
    return (
      <View>
        <Carousel _onPress={this._onPress} />
        <Guess _onPress={this._onPress} />
      </View>
    );
  };
  render() {
    const {AChannelData} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this._ListHeaderComponent}
        data={AChannelData}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onRefresh={this._onRefresh} //下拉刷新
        refreshing={refreshing} //刷新状态
        onEndReached={this._onEndReached} //上拉加载
        onEndReachedThreshold={0.2} //距离底部多少开始加载
      />
    );
  }
}
export default connector(Index);
