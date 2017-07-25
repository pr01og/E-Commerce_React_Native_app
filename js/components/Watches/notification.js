
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import IconFont from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const {
    popRoute,
} = actions;

class Header6 extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#fff' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: "#000" }} name="arrow-back"  />
            </Button>
          </Left>
          <Body>
          <Title  style={{color: "#000", fontWeight: '800',  fontSize: responsiveFontSize(1.4)}}>NOTIFICATIONS</Title>
          </Body>
          <Right />

        </Header>

        <Content style={{padding: 50}}>
          <IconFont style={{fontSize: 30, alignSelf: 'center', color: 'gray'}}name="warning" />
          <Text style={{fontSize: 12, marginTop: 20, textAlign: 'center', color: 'gray'}}>
            Currently you dont have any notification to display
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header6);
