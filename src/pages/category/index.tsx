import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import _ from 'lodash';
import {RootState} from '@/models/index';
import {ICategory} from '@/models/category';
import Item from '@/pages/category/item';
import HeaderRightBtn from '@/pages/category/headerRightBtn';
import {RootStackNavigation} from '@/navigator/index';
const MapStateToProps = (state: RootState) => {
  return {
    myCategory: state.category.myCategory,
    category: state.category.category,
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
    const {dispatch} = this.props;
    dispatch({
      type: 'category/effectsIsEdit',
    });
  };
  //遍历分类
  _renderItem = (item: ICategory, index: number) => {
    return <Item key={index} data={item} />;
  };
  //分类遍历
  render() {
    const {category} = this.props;
    const {myCategory} = this.props;
    const classifyGroups = _.groupBy(category, (item) => item.classify); //使用第三方插件lodash将数组category分割然后，按分类重组对象

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.itemTitle}>我的分类</Text>
          <View style={styles.itemBox}>{myCategory.map(this._renderItem)}</View>
        </View>
        <View>
          {Object.keys(classifyGroups).map((item, index) => {
            return (
              <View key={index}>
                <Text style={styles.itemTitle}>{item}</Text>
                <View style={styles.itemBox}>
                  {classifyGroups[item].map(this._renderItem)}
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
