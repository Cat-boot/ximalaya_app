import React from 'react';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import Navigator from '@/navigator/index';
import {StatusBar} from 'react-native';
import '@/config/http';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
      </Provider>
    );
  }
}
