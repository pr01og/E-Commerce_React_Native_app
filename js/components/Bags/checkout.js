
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
  Form,
  Label,
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
import Break from "./break";

const {
    popRoute,
} = actions;

class Checkout extends Component {  // eslint-disable-line

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
        <Header style={{ backgroundColor: "#63254d"}}  androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>  
              <Title style={{color: "#000", fontSize: 12}} >CHECKOUT</Title>
          </Body>
          <Right />

        </Header>

        <Content style={{backgroundColor: '#f5f5f5'}}>
          <View style={{ flexDirection: 'row',  width: width, height: height/20}}>
            <Text style={{left: 20,fontSize: 12, paddingTop: 10}}>CART SUMMARY</Text>
          </View>
                     
  
          <View style={{backgroundColor: "#fff", padding: 20, marginBottom: 20, flexDirection: 'row'}}>

            <View style={{width: width/1.4}}>
              <Text style={{fontSize:12, marginBottom: 15}}>Product Name   2x</Text>
              <Text style={{fontSize:12, marginBottom: 15}}>Product Name   2x</Text>
              <Break />
              <Text style={{fontSize:12, marginBottom: 15}}>Cart Total</Text>
              <Text style={{fontSize:12, marginBottom: 15}}>Coupon Discount</Text>
              <Text style={{fontSize:12, marginBottom: 15}}>Sub Total</Text>
              <Text style={{fontSize:12, marginBottom: 15}}>Delivery Charges</Text>
               <Break />
              <Text style={{fontSize:12, marginBottom: 15, fontWeight: '700'}}>Total</Text>
            </View>
            <View>
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 593</Text>
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 893</Text>
              <Break />
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 1,893</Text>
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>(S$ 100)</Text>
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 1,793</Text>
              <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 120</Text>
               <Break />
              <Text style={{fontWeight: '700', textAlign: 'right',fontSize:12, marginBottom: 15}}>S$ 2,130</Text>
            </View>
          </View>
        <View style={{ flexDirection: 'row',  width: width, height: height/20}}>
          <Text style={{left: 20,fontSize: 12, paddingTop: 0}}>SHIPPING INFORMATIONS</Text>
        </View>
        <View style={{backgroundColor: "#fff", padding: 20, marginBottom: 20, flexDirection: 'row'}}>
          <Form>
            <Input style={product_styles.inputBrdr} placeholder="Postal Code" />
            <Input style={product_styles.inputBrdr} placeholder="Address" />
            <View style={{flexDirection: 'row'}}>
              <Input style={product_styles.inputSmalBrdr} placeholder="Unit Number 1" />
              <Input style={product_styles.inputSmal2Brdr} placeholder="Unit Number 2" />
            </View>
            <Input style={product_styles.inputBrdr} placeholder="State / Province" />
            <Input style={product_styles.inputBrdr} placeholder="Country" />
          </Form>
        </View>
        <View style={{ flexDirection: 'row',  width: width, height: height/20}}>
          <Text style={{left: 20,fontSize: 12, paddingTop: 0}}>PAYMENT OPTIONS</Text>
        </View>
        <View style={{backgroundColor: "#fff", padding: 20, marginBottom: 20}}>
          <Text style={{textAlign: 'center',fontSize:12, color: 'gray'}}>PAY BY</Text>
          <View style={{ borderWidth: 1, padding: 10, marginTop: 30, width: width/1.4, alignSelf: 'center', borderColor: 'lightgray', marginBottom: 10}}>
            <Thumbnail square style={{ alignSelf: 'center', width: width/3, height: height/30}}source={require('./image/visa.jpg')} />
          </View>
          <View style={{ borderWidth: 1,padding: 10, width: width/1.4, alignSelf: 'center', borderColor: 'lightgray', marginBottom: 10}}>
          <Thumbnail square style={{alignSelf: 'center', width: width/2, height: height/20}}source={require('./image/moneygram.jpg')} />
          </View>
          <View style={{ borderWidth: 1,padding: 10, width: width/1.4, alignSelf: 'center', borderColor: 'lightgray', marginBottom: 10}}>
          <Thumbnail square style={{alignSelf: 'center', width: width/4, height: height/30}}source={require('./image/western.jpg')} />
          </View>
          <View style={{ borderWidth: 1,padding: 10, width: width/1.4, alignSelf: 'center', borderColor: 'lightgray', marginBottom: 10}}>
          <Thumbnail square style={{alignSelf: 'center', width: width/4, height: height/20}}source={require('./image/bank.jpg')} />
          </View>
        </View>
        </Content>
        <Button style={{ width: width}}  full success onPress={ () => Actions["success"]() }>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff'}}>CONTINUE</Text>
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

export default connect(mapStateToProps, bindAction)(Checkout);

const product_styles= {
  inputBrdr: {
    borderWidth: 1,
    width: width/1.1,
    height: height/18,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },

  inputSmalBrdr: {
    borderWidth: 1,
    width: width/4,
    height: height/18,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },
   inputSmal2Brdr: {
    borderWidth: 1,
    width: width/4,
    height: height/18,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
    marginLeft: 30,
  },
}