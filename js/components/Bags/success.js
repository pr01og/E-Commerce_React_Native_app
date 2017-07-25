
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container, 
  Header, Title, 
  Content, Button,
  Card, 
  Icon, Left, 
  View,
  Right, 
  Body, 
  Text, 
  Input,
  Item,
  Thumbnail,
  Subtitle } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';
import {Select, Option} from "react-native-chooser";

const {
    popRoute,
} = actions;

class Success extends Component {  // eslint-disable-line

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
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#63254d"}} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: "#fff"}}  name="arrow-back" />
            </Button>
          </Left>
          <Body>  
              <Title style={{color: "#fff", fontSize: 12, fontWeight: '900'}} >ORDER SUCESS</Title>
          </Body>
          <Right />

        </Header>

        <Content style={{backgroundColor: '#f5f5f5'}}>
          <Card style={{ paddingTop: height/12, alignSelf:'center', width: width, height: height/2}}>
            <IconFont name='check' size={24} style={{ fontSize: 80,alignSelf:'center', color: 'green'}}/>
            <Text style={{fontSize: 30, textAlign: 'center'}}>Thank You</Text>
            <Text  style={{fontSize:15,  color: 'gray', textAlign: 'center'}}>Your order has been placed successfully</Text>
            <Text  style={{fontSize:15, marginTop: 30,  color: 'gray', textAlign: 'center'}}>Order Number: OD123343</Text>
          </Card>
        </Content>
         <Button style={{ width: width}}  full dark onPress={ () => Actions['header3']() } >
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff'}}>GO TO MYACCOUNT</Text>
          </Button>
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

export default connect(mapStateToProps, bindAction)(Success);
