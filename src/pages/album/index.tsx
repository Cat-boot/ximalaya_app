import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useHeaderHeight} from '@react-navigation/stack';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import {RootStackParamList} from '@/navigator/index';
import {RouteProp} from '@react-navigation/native';
import coverRight from '@/assets/images/album/cover-right.png';
import loading from '@/assets/images/public/loading.gif';
const mapStateToProps = (state: RootState) => {
  return {
    summary: state.album.summary,
    author: state.album.author,
  };
};
const connector = connect(mapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  headerHeight: number;
  route: RouteProp<RootStackParamList, 'Album'>;
}
class Album extends React.Component<IProps> {
  componentDidMount() {
    this.getAlbumData();
  }
  //获取频道信息
  getAlbumData = () => {
    const {dispatch, route} = this.props;
    const {id} = route.params.data;
    dispatch({
      type: 'album/fetchAlbum',
      payload: {
        id,
      },
    });
  };
  //频道头部模块
  renderHeader = () => {
    const {headerHeight, summary, author, route} = this.props;
    const {title, img} = route.params.data;
    const {avatar, name} = author;
    console.log(avatar);
    return (
      <View style={[{paddingTop: headerHeight}, styles.viewBox]}>
        <Image
          source={img ? {uri: img} : loading}
          style={styles.viewHeaderBg}
        />
        <BlurView
          blurType={'light'}
          blurAmount={10}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.viewLeft}>
          <Image
            source={img ? {uri: img} : loading}
            style={styles.viewLeftImg}
          />
          <Image source={coverRight} style={styles.vieLeftBgImg} />
        </View>
        <View style={styles.viewRight}>
          <Text style={styles.viewRightTitle}>{title}</Text>
          <View style={styles.viewRightSummaryBg}>
            <Text numberOfLines={1} style={styles.viewRightSummary}>
              {summary}
            </Text>
          </View>
          <View style={styles.viewAuthorBox}>
            <Image
              source={avatar ? {uri: avatar} : loading}
              style={styles.viewRightAuthorImg}
            />
            <Text style={styles.viewRightAuthorName}>{name}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return <View>{this.renderHeader()}</View>;
  }
}
const styles = StyleSheet.create({
  viewBox: {
    flexDirection: 'row',
    padding: 20,
    alignContent: 'center',
  },
  viewHeaderBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#333',
  },
  viewLeft: {
    width: 98,
    height: 98,
    marginRight: 15,
  },
  viewLeftImg: {
    width: 98,
    height: 98,
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: StyleSheet.hairlineWidth,
  },
  vieLeftBgImg: {
    height: 98,
    resizeMode: 'contain',
    position: 'absolute',
    right: -22,
  },
  viewRight: {
    flex: 1,
  },
  viewRightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewRightSummaryBg: {
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 5,
    marginVertical: 10,
  },
  viewRightSummary: {
    color: '#fff',
    fontSize: 14,
  },
  viewAuthorBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRightAuthorImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 13,
  },
  viewRightAuthorName: {
    color: '#fff',
  },
});
//因为useHeaderHeight是hook函数，不能在这里直接使用，所以要用高阶函数
function Wrapper(props: IProps) {
  const headerHeight = useHeaderHeight();
  return <Album {...props} headerHeight={headerHeight} />;
}
export default connector(Wrapper);
