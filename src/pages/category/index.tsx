import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {DragSortableView} from 'react-native-drag-sort';
import {RootState} from '@/models/index';
import {ICategory} from '@/models/category';
import Item, {
  viewItem,
  ViewItemHeight,
  viewScreen,
} from '@/pages/category/item';
import HeaderRightBtn from '@/pages/category/headerRightBtn';
import {RootStackNavigation} from '@/navigator/index';
import Touchable from '@/components/Touchable';
const MapStateToProps = (state: RootState) => {
  return {
    myCategory: state.category.myCategory,
    category: state.category.category,
    isEdit: state.category.isEdit,
  };
};

const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  navigation: RootStackNavigation;
}
//因为点击保存完成后我的分类需要保存本地，不需要远程保存，所以需要在声明state中的myCategory
interface IState {
  myCategory: ICategory[];
}
const flexItem = [0, 1];
class category extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn onPressEdit={this._onPressEdit} />,
    });
  }
  state = {
    myCategory: this.props.myCategory,
  };
  //点击编辑改变状态
  _onPressEdit = () => {
    const {dispatch, navigation, isEdit} = this.props;
    const {myCategory} = this.state;
    dispatch({
      type: 'category/effectsIsEdit',
      payload: {
        myCategory: myCategory,
      },
    });
    isEdit && navigation.goBack();
  };

  //遍历我的分类
  _renderItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    const disabled = flexItem.indexOf(index) > -1;
    return (
      <Item
        key={index}
        data={item}
        isEdit={isEdit}
        disabled={disabled}
        selected={false}
      />
    );
  };
  //分类遍历
  _renderUnSelectedItem = (item: ICategory, index: number) => {
    const {isEdit} = this.props;
    return (
      <Touchable
        key={item.id}
        onPress={() => this._onPress(item, index, true)}
        onLongPress={this._onLongPress}>
        <Item data={item} isEdit={isEdit} selected={true} />
      </Touchable>
    );
  };
  //点击添加删除我的分类
  _onPress = (item: ICategory, index: number, selected: boolean) => {
    const {isEdit} = this.props;
    const {myCategory} = this.state;
    const disabled = flexItem.indexOf(index) > -1;
    if (isEdit && disabled && !selected) {
      return;
    }
    if (isEdit) {
      if (selected) {
        this.setState({
          myCategory: myCategory.concat([item]), //push是在数组的基础上进行修改，concat是直接返回一个新的对象
        });
      } else {
        this.setState({
          myCategory: myCategory.filter(
            (selectedItem) => selectedItem.id !== item.id,
          ),
        });
      }
    }
  };
  //在拖拽插件上调取点击添加删除分类
  _onClickItem = (data: ICategory[], item: ICategory) => {
    this._onPress(item, data.indexOf(item), false);
  };
  //长按显示编辑
  _onLongPress = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: true,
      },
    });
  };
  //拖拽之后改变我的分类数据
  _onDataChange = (data: ICategory[]) => {
    this.setState({
      myCategory: data,
    });
  };
  componentWillUnmount() {
    const {dispatch} = this.props;
    const {myCategory} = this.state;
    dispatch({
      type: 'category/setState',
      payload: {
        isEdit: false,
        myCategory: myCategory,
      },
    });
  }
  render() {
    const {category, isEdit} = this.props;
    const {myCategory} = this.state;
    const classifyGroups = _.groupBy(category, (item) => item.classify); //使用第三方插件lodash将数组category分割然后，按分类重组对象
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.itemTitle}>我的分类</Text>
          <View style={styles.itemBox}>
            <DragSortableView
              dataSource={myCategory}
              fixedItems={flexItem}
              renderItem={this._renderItem}
              sortable={isEdit} //在编辑状态下才可以拖拽
              keyExtractor={(item) => item.id} //指定当前key的值
              onDataChange={this._onDataChange} //拖拽之后的回调，
              parentWidth={viewScreen}
              childrenWidth={viewItem}
              childrenHeight={ViewItemHeight}
              onClickItem={this._onClickItem} //点击删除分类
            />
          </View>
        </View>
        <View>
          {Object.keys(classifyGroups).map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.itemTitle}>{item}</Text>
                <View style={styles.itemBox}>
                  {classifyGroups[item].map((item, index) => {
                    if (
                      myCategory.find(
                        (selectedItem) => selectedItem.id === item.id,
                      )
                    ) {
                      return null;
                    }
                    return this._renderUnSelectedItem(item, index);
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f3f6f6',
  },
  itemTitle: {
    fontSize: 16,
    marginVertical: 5,
  },
  itemBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default connector(category);
