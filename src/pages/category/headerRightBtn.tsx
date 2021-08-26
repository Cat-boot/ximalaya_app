import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
const MapStateToProps = (state: RootState) => {
  return {isEdit: state.category.isEdit};
};
const connector = connect(MapStateToProps);
type ModelState = ConnectedProps<typeof connector>;
interface IProps extends ModelState {
  onPressEdit: () => void;
}
class headerRightBtn extends React.Component<IProps> {
  render() {
    const {onPressEdit, isEdit} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '保存' : '编辑'} onPress={onPressEdit}></Item>
      </HeaderButtons>
    );
  }
}
export default connector(headerRightBtn);
