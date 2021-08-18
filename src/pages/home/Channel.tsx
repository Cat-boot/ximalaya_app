import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IChannel} from '@/models/home';
import IconFont from '@/assets/icon';
import Touchable from '@/components/Touchable';
interface IProps {
  data: IChannel;
  _onPress: (data: string) => void;
}
//PureComponent判断父组件传递过来的props和上一次传递过来的是否一样，一样的话就不渲染render，否则渲染
class Channel extends React.PureComponent<IProps> {
  _onPress = () => {
    const {_onPress, data} = this.props;
    if (typeof _onPress === 'function') {
      _onPress(data.id);
    }
  };
  render() {
    const {data} = this.props;
    return (
      <Touchable onPress={this._onPress}>
        <View style={styles.container}>
          <Image source={{uri: data.img}} style={styles.channelImg} />
          <View style={styles.rightContainer}>
            <Text numberOfLines={1}>{data.title}</Text>
            <Text style={styles.channelRemarkBg} numberOfLines={2}>
              {data.remark}
            </Text>
            <View style={styles.channelPlay}>
              <View style={[styles.channelPlay, styles.mr10, styles.center]}>
                <IconFont name={'icon-xmlyshenqingshitingke'} size={16} />
                <Text>{data.played}</Text>
              </View>
              <View style={[styles.channelPlay, styles.center]}>
                <IconFont name={'icon-xmlybofang1'} size={16} />
                <Text>{data.playing}</Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    margin: 15,
    marginBottom: 10,
    marginTop: 0,
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 5, //设置android投影，不支持阴影
  },
  channelImg: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#dedede',
  },
  channelRemarkBg: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 5,
    width: '100%',
  },
  rightContainer: {
    flex: 1,

    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  channelPlay: {
    flexDirection: 'row',
  },
  mr10: {
    marginRight: 10,
  },
  center: {
    alignItems: 'center',
  },
});
export default Channel;
