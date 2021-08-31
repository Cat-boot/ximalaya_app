import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {viewportWidth} from '@/utils/index';
import {ICategory} from '@/models/category';

export const viewScreen = viewportWidth - 20;
export const viewItem = viewScreen / 4;
export const ViewItemHeight = 40;
export const margin = 5;
interface IProps {
  data: ICategory;
  isEdit: boolean;
  selected: boolean;
  disabled?: boolean;
}
class Item extends React.Component<IProps> {
  render() {
    const {data, isEdit, selected, disabled} = this.props;
    return (
      <View style={styles.itemListBox}>
        <View style={[styles.itemListFont, disabled && styles.disabled]}>
          <Text>{data.name}</Text>
          {isEdit && !disabled && (
            <View style={styles.editIcn}>
              <Text style={styles.editIcnText}>{selected ? '+' : '-'}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemListBox: {
    width: viewItem,
    height: ViewItemHeight,
    padding: margin,
  },
  itemListFont: {
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  disabled: {backgroundColor: '#999'},
  editIcn: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f00',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
  },
  editIcnText: {
    flex: 1,
    color: '#fff',
    lineHeight: 16,
  },
});
export default Item;
