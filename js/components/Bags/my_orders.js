
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
import { Dimensions, Alert, AsyncStorage } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';
import {Select, Option} from "react-native-chooser";
import FooterBottomTab from '../shared/footer';

const {
    popRoute,
} = actions;

class Header7 extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props)
    this.state = {
      carts:[],
      qty: 1,
    }
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  removeItem() {
    let cart = {
      carts: []
    }
    AsyncStorage.setItem('lineItem', JSON.stringify(cart));
    this.getItem()
  }

  componentDidMount(){
    this.getItem()
  }

  getItem(){
     AsyncStorage.getItem('lineItem', (err, result) => {
      const data = JSON.parse(result);
      console.log(data)
      if (data && data.carts) {
        this.setState({
          carts: data.carts,
        });
      }
    });
  }

  addWish() {
    Alert.alert("add wish")
  }

  increase(){
    if (this.state.qty <= this.state.maxqty) {
      this.setState({
        qty: Number.parseInt(this.state.qty) + 1,
      });
    }
  }
  decrease() {
    let n = Number.parseInt(this.state.qty);
    n = n <= 1 ? 2 : n;
    this.setState({
      qty: n - 1,
    });
  }

  renderView(carts) {
    return(<View>
      <View style={{ padding: 40, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
          <IconFont style={{fontSize: 15, alignSelf: 'center', color: 'gray'}}name="warning" />
        <Text style={{fontSize: 15, color: 'gray', textAlign: 'center'}}> Order is Empty</Text>
      </View>
      <View style={{backgroundColor: '#f5f5f5', height: 20}}></View>
    </View>)
  }
  render() {
    let carts = this.state.carts || []
    return (
      <Container>
        <Header  style={{ backgroundColor: "#63254d"}} iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: "#fff"}} name="arrow-back" />
            </Button>
          </Left>
          <Body>  
              <Title style={{color: "#fff", fontSize: 12}} >MY ORDERS</Title>
          </Body>
          <Right />

        </Header>
        <Content style={{backgroundColor: '#f5f5f5'}}>
          {
            this.renderView(carts)
          }
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

export default connect(mapStateToProps, bindAction)(Header7);
