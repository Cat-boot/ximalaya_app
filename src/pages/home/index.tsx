import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel, {slidHeight} from '@/pages/home/Carousel';
import Guess from '@/pages/home/Guess';
import Channel from '@/pages/home/Channel';
import {IChannel} from '@/models/home';

const mapStateToProps = (state: RootState) => ({
  AChannelData: state.home.AChannelData,
  BGradientVisible: state.home.BGradientVisible,
  hasMore: state.home.APaginationData.hasMore,
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
class Index extends React.PureComponent<IProp, IState> {
  state = {refreshing: false};
  componentDidMount() {
    this.getAChannelData();
  }
  //点击跳转详情页1
  _onPress = (data: string | number) => {
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
    const {dispatch, loading, hasMore} = this.props;
    if (loading || !hasMore) return;
    dispatch({
      type: 'home/effectsChannel',
      payload: {
        loadMore: true,
      },
    });
  };
  //遍历列表数据
  _renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <Channel data={item} _onPress={this._onPress} />;
  };
  //将轮播图和猜你喜欢作为头部放进FlatList，
  get _ListHeaderComponent() {
    return (
      <View>
        <Carousel _onPress={this._onPress} />
        <Guess _onPress={this._onPress} />
      </View>
    );
  }
  //列表底部
  get _ListFooterComponent() {
    const {loading, hasMore, AChannelData} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--我是有底线的--</Text>
        </View>
      );
    }
    if (loading && hasMore && AChannelData.length > 0) {
      return (
        <View style={styles.end}>
          <Text>--加载中...--</Text>
        </View>
      );
    }
  }
  //列表数据为空状态
  get _ListEmptyComponent() {
    const {loading} = this.props;
    if (loading) {
      return;
    }
    return (
      <View style={styles.empt}>
        <Text>暂无数据...</Text>
      </View>
    );
  }
  //监听falstlist滚动事件
  // {nativeEvent}: NativeSyntheticEvent<NativeScrollEvent> 获取原生滚动监听事件
  _onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {dispatch, BGradientVisible} = this.props;
    const offsetY = nativeEvent.contentOffset.y; //获取滚动y的值
    let newBGradientVisible = offsetY < slidHeight;
    if (BGradientVisible !== newBGradientVisible) {
      dispatch({
        type: 'home/setState',
        payload: {
          BGradientVisible: newBGradientVisible,
        },
      });
    }
  };
  render() {
    const {AChannelData} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this._ListHeaderComponent}
        ListFooterComponent={this._ListFooterComponent}
        ListEmptyComponent={this._ListEmptyComponent}
        data={AChannelData}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onRefresh={this._onRefresh} //下拉刷新
        refreshing={refreshing} //刷新状态
        onEndReached={this._onEndReached} //上拉加载
        onEndReachedThreshold={0.2} //距离底部多少开始加载
        onScroll={this._onScroll} //监听FlastList滚动
      />
    );
  }
}
const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  empt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
});
export default connector(Index);
