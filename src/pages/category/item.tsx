import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {ICategory} from '@/models/category';

const viewScreen = viewportWidth - 20;
const viewItem = viewScreen / 4;
interface IProps {
  data: ICategory;
}
class Item extends React.Component<IProps> {
  render() {
    const {data} = this.props;
    return (
      <View style={styles.itemListBox}>
        <View style={styles.itemListFont}>
          <Text>{data.name}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemListBox: {
    width: viewItem,
    height: 40,
    padding: 5,
  },
  itemListFont: {
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
export default Item;
