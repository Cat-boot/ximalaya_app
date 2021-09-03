import React from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/icon';
import {RootState} from '@/models/index';

const MapStateToProps = (state: RootState, props: {namespace: string}) => {
  const namespace = props.namespace,
    modelState = state[namespace];
  return {
    AGuessData: modelState.AGuessData,
    loading: state.loading.effects[namespace + '/effectsGuess'],
  };
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  _onPress: (data: number) => void;
  namespace: string;
}
class Guess extends React.PureComponent<IProps> {
  componentDidMount() {
    this.getAGuessData();
  }
  //获取猜你喜欢数据
  getAGuessData = () => {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/effectsGuess',
      payload: {
        namespace,
      },
    });
  };
  //点击跳转
  _onPress = (data: number) => {
    const {_onPress} = this.props;
    if (typeof _onPress === 'function') {
      _onPress(data);
    }
  };

  _renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable
        activeOpacity={1}
        onPress={() => this._onPress(item.id)}
        style={styles.items}>
        <Image source={{uri: item.img}} style={styles.images} />
        <Text numberOfLines={2}>
          {item.title}
          {item.title}
          {item.title}
        </Text>
      </Touchable>
    );
  };
  _topHearderComponent = () => {
    return (
      <View style={styles.guessTitleBOx}>
        <View style={styles.guessTitleItem}>
          <IconFont
            name={'icon-xmlyxihuan'}
            size={18}
            style={styles.iconRight}
          />
          <Text>猜你喜欢</Text>
        </View>
        <View style={styles.guessTitleItem}>
          <Touchable onPress={() => this._onPress(111)}>
            <Text style={styles.guessTitleItemText}>更多</Text>
          </Touchable>
          <IconFont name={'icon-xmlygengduo'} size={18} />
        </View>
      </View>
    );
  };
  _bottomFootComponent = () => {
    return (
      <Touchable style={styles.guessMoreItem} onPress={this.getAGuessData}>
        <IconFont
          style={styles.iconRight}
          name={'icon-xmlygengxin1'}
          size={18}
        />
        <Text>换一批</Text>
      </Touchable>
    );
  };
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const {AGuessData} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={this._topHearderComponent}
          data={AGuessData}
          renderItem={this._renderItem}
          numColumns={3}
          style={styles.guessList}
          ListFooterComponent={this._bottomFootComponent}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  guessTitleBOx: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#efefef',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  guessTitleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRight: {marginRight: 5},
  guessTitleItemText: {color: '#6f6f6f'},
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    paddingBottom: 10,
  },
  guessList: {paddingBottom: 2},
  items: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 12,
  },
  images: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  guessMoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default connector(Guess);
