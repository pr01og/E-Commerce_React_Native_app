import React, { Component } from 'react';

import {Container} from 'native-base';
import MainComponent from './mainComponent';

import { actions } from 'react-native-navigation-redux-helpers';

class Main extends Component {
  render() {
    return (
      <MainComponent name={this.props.name} data={this.props.data} loading={this.props.loading} />
    );
  }
}

export default Main;