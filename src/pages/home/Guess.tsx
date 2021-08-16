import React from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/icon';

const MapStateToProps = ({home}: RootState) => {
  return {
    AGuessData: home.AGuessData,
  };
};
const connector = connect(MapStateToProps);
type ModelStat = ConnectedProps<typeof connector>;

class Guess extends React.Component<ModelStat> {
  componentDidMount() {
    this.getGuessData();
  }
  getGuessData = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'home/effectsGuess',
    });
  };
  _renderItem = ({item}: {item: IGuess}) => {
    return (
      <Touchable
        activeOpacity={1}
        onPress={() => {
          console.log(item.id);
        }}
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
          <Text style={styles.guessTitleItemText}>更多</Text>
          <IconFont name={'icon-xmlygengduo'} size={18} />
        </View>
      </View>
    );
  };
  _bottomFootComponent = () => {
    return (
      <Touchable style={styles.guessMoreItem} onPress={this.getGuessData}>
        <IconFont
          style={styles.iconRight}
          name={'icon-xmlygengxin1'}
          size={18}
        />
        <Text>换一批</Text>
      </Touchable>
    );
  };
  render() {
    const {AGuessData} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={AGuessData}
          renderItem={this._renderItem}
          numColumns={3}
          style={styles.guessList}
          ListFooterComponent={this._bottomFootComponent}
          ListHeaderComponent={this._topHearderComponent}
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
