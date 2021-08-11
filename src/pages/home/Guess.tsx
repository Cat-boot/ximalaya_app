import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {IGuess} from '@/models/home';

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
      <TouchableOpacity
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
      </TouchableOpacity>
    );
  };

  render() {
    const {AGuessData} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          data={AGuessData}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
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
});
export default connector(Guess);
