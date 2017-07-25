
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
import IconSimpleFont from 'react-native-vector-icons/Ionicons';
import {Select, Option} from "react-native-chooser";
import FooterBottomTab from '../shared/footer';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const {
    popRoute,
} = actions;

class ShoppingCart extends Component {  // eslint-disable-line

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
      user_id: '',
      carts:[],
      qty: 1,
      totalAmout: 0,
      grand_total: 0,
      itemTotal: 0,
      sub_total: 0,
      cart_count: 0,
      ccode: '',
      shipping_charge: 0,
      device: "fon",
    }
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

   addItemCartItemToServer(c){
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/cart/add/?product_id=${c.id}&qty=${this.state.qty}&customer_id=${this.state.user_id}&device_id=${this.state.device}&super_attribute%5B138%5D=7&username=pcadmin&authkey=pcadmin123`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          showAlert: false,
        })
        this.getCartDetails();
        Alert.alert(responseJson.message)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setCartCount(item){
    let cartcount = 0
    if (this.state.cart_count !== 0) {
      cartcount = Number(this.state.cart_count) - Number(item.qty)
    } else {
      cartcount = 0
    }
    let count = {
      cart_count: cartcount,
    };
     this.setState({
        cart_count: count.cart_count,
      }); 
    AsyncStorage.setItem('bagCartCount', JSON.stringify(count));
  }

  removeItem(item) {
    this.resetItem()
    this.setCartCount(item);

    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/cart/delete/?item_id=${item.item_id}&customer_id=${this.state.user_id}&device_id=${this.state.device}&username=pcadmin&authkey=pcadmin123`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.getCartDetails();
        Alert.alert(responseJson.message)
      })
      .catch((error) => {
        Alert.alert("Please login")
      });
  }

  componentDidMount(){
    this.getLogin();
  }

  getLogin(){
    AsyncStorage.getItem('user', (err, result) => {
      const data = JSON.parse(result);
      console.log(data)
      if(data && data.user) {
        this.setState({
          user_id: data.user.customer_info.customer_id,
          device: data.user.device_id,
        }); 
        this.getCartDetails();
      } else{
        this.setState({
          user_id: "",
        }); 
      }
    });
  }

  resetItem(){
    this.setState({
      carts: [],
      cart_count: 0,
      grand_total: 0,
      sub_total: 0,
      ccode: '',
      shipping_charge: 0,
    })
  }
  getCartDetails(){
    if (this.state.user_id) {
      let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/cart/?customer_id=${this.state.user_id}&device_id=${this.state.device}&username=pcadmin&authkey=pcadmin123`
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          let data = responseJson.data
          if (responseJson.code ===200) {
            this.setState({
              carts: responseJson.data,
              cart_count: data.cart_count,
              grand_total: data.grand_total,
              sub_total: data.sub_total,
              shipping_charge: data.shipping_charge,
            })
          }
        })
        .catch((error) => {
        });
      }
  }

  addWish(item) {
    let addwish_url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/wishlist/addtowishlist/?device_id=${this.state.device}&customer_id=${this.state.user_id}&product_type=${item.product_type}&qty=1&product_id=${item.product_id}&username=pcadmin&authkey=pcadmin123`
    return fetch(addwish_url)
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson.message)
      })
      .catch((error) => {
      });
  }

  addCoupon(){
    if(this.state.ccode) {
      let url = `http://devsteam.mobi/pcapp/pcbags/mobileapi/cart/addcouponcode?username=pcadmin&authkey=pcadmin123&device_id=${this.state.device_id}&coupon_code=${this.state.ccode}`;
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson.message)
        })
        .catch((error) => {
          this.setState({
            ccode: "",
          });
        });
    }
  } 
  increase(item){
    if (this.state.qty <= this.state.maxqty) {
      this.setState({
        qty: Number.parseInt(this.state.qty) + 1,
      });
    }
  }
  decrease(item) {
    let n = Number.parseInt(this.state.qty);
    n = n <= 1 ? 2 : n;
    this.setState({
      qty: n - 1,
    });
  }

  renderView(cartItems) {
    items = []
    if (!cartItems){
      items.push(
        <View key={11}>
          <View style={{ padding: 40, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
             <IconFont style={{fontSize: 15, alignSelf: 'center', color: 'gray'}}name="warning" />
            <Text style={{fontSize: 15, color: 'gray', textAlign: 'center'}}> Cart is Empty</Text>
          </View>
          <View style={{backgroundColor: '#f5f5f5', height: 20}}></View>
        </View>
      )
    } else {
     for (let i = 0; i < cartItems.length; i++) {
       let item = cartItems[i]
       items.push(<View key={ i+100}>
          <View style={{ flexDirection: 'row',backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
            <View style={{ alignItems: 'center', width: width/2.4, marginTop: 10, marginBottom: 10}}>
              <Thumbnail square style={{resizeMode: 'contain', width: width/4, height: height/5}} source={{uri: item.product_image}} />
            </View>
            <View style={{marginTop: 10, marginBottom: 10, flexDirection: 'column', backgroundColor: "#fff"}} >
              <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10}}>{item.name.substring(0, 20)}</Text>
              {item.product_type!=='simple' && 
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 10}}>Color</Text>
                    <Item style={{ width: width/2.5, marginLeft: 20 }}  >
                      <Input style={{ borderWidth: 1, fontSize: 18, height: 40,  textAlign: 'left', borderColor: 'lightgray', color:'lightgray' }} value='Brown'  />
                    </Item>
                </View>
                }
                  {item.product_type=='simple' && 
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10}}>Product Type: </Text>
                      <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 10}}>{item.product_type}</Text>    
                </View>
                }
                
              <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", marginBottom: 20}}>
                  <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 20, marginRight: 10}}>Qty</Text>
                  <IconSimpleFont onPress={()=>this.increase(item)} style={{color: "gray", fontSize: responsiveFontSize(3)}} name="ios-arrow-back" />
                  <Item style={{ borderBottomWidth: 0, width: 40, marginRight: 5, marginLeft: 5 }}  >
                    <Input style={{ borderWidth: 0.6, fontSize: 17,  height: 40,  textAlign: 'center', borderColor: 'lightgray' }} value={`${item.qty}`} />
                  </Item>
                  <IconSimpleFont onPress={()=>this.decrease(item)} style={{color: "gray", fontSize: responsiveFontSize(3)}} name="ios-arrow-forward" />
                  <Text style={{ textDecorationLine: 'line-through', fontSize: 10, color: 'gray', marginTop: 10, marginLeft: 10 }}>${item.normalprice}</Text>
                  <Text style={{ fontSize: 13, marginTop: 10,marginLeft: 0}}>${item.normalprice}</Text>
              </View>
            </View>
          </View>
          <View style={{backgroundColor: "#fff",flexDirection:"row", paddingBottom: 5, paddingTop: 5, borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
            <Button style={{ width: width/2, borderRightWidth: 1, borderRightColor: "lightgray"}}  full transparent onPress={ () => this.addWish(item) } >
              <Icon name="heart" style={{fontSize: 18,color: '#000'}} />
              <Text style={{ fontSize: 12, color: '#000'}}>ADD WISHLIST</Text>
            </Button>
            <Button style={{ width: width/2.5, marginLeft: width/12}} transparent  onPress={ () => this.removeItem(item) }>
              <Text style={{ fontSize: 12, fontWeight: "700", color: '#000'}}>REMOVE</Text>
            </Button>
          </View>
          <View style={{backgroundColor: '#f5f5f5', height: 20}}></View>
      </View>)
      }
    }
    return items
  }
  render() {
    let carts = this.state.carts || ''
    return (
      <Container>
        <Header iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <IconSimpleFont style={{color: "gray", fontSize: responsiveFontSize(4)}} name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>  
              <Title style={{color: "#000", fontSize: responsiveFontSize(1.5),  fontWeight: '800'}} >SHOPPING CART</Title>
          </Body>
          <Right>
            <Button style={{borderColor: 'darkgray'}} small  bordered onPress={ () => Actions["header5"]() } >
              <Text style={{fontSize: responsiveFontSize(1.5), fontWeight: '600', color: '#000', alignItems: 'center'}}>My Wishlist</Text>
            </Button>
          </Right>

        </Header>
        <Content style={{backgroundColor: '#f5f5f5'}}>
          { carts &&
            <View style={{ flexDirection: 'row',  width: width, height: height/20}}>
              <Text style={{left: 20,fontSize: 12, paddingTop: 10}}>ITEMS ({this.state.cart_count})</Text>
              <Text style={{fontSize: 12, paddingTop: 10, position: 'absolute', right: 20}}>TOTAL: ${this.state.grand_total}</Text>
            </View>
          }

          {
            carts && this.renderView(carts.cart_items)
          }
          
          {
            carts &&
          <View>
            <View style={{ flexDirection: 'row', width: width, height: height/20}}>
              <Text style={{left: 20,fontSize: 12, }}>COUPONS</Text>
            </View>
            <View style={{backgroundColor: "#fff",  padding: 10, paddingLeft: 15}}>
              <Input onEndEditing={()=>{this.addCoupon()}} onChange={(text)=>{this.setState({ccode: text})}} style={{ borderWidth: 1, height: 40, fontSize: 14, color: 'gray', borderColor: 'lightgray', width: width/1.1}} placeholder="Enter your coupon code"/>
            </View>
            <View style={{ flexDirection: 'row',  width: width, height: height/20}}>
              <Text style={{left: 20,fontSize: 12, paddingTop: 10}}>PRICE DETAILS</Text>
            </View>
            <View style={{backgroundColor: "#fff", padding: 20, marginBottom: 20, flexDirection: 'row'}}>
              <View style={{width: width/1.4}}>
                <Text style={{fontSize:12, marginBottom: 15}}>Cart Total</Text>
                <Text style={{fontSize:12, marginBottom: 15}}>Coupon Discount</Text>
                <Text style={{fontSize:12, marginBottom: 15}}>Sub Total</Text>
                <Text style={{fontSize:12, marginBottom: 15}}>Delivery Charges</Text>
                <Text style={{fontSize:12, marginBottom: 15, fontWeight: '700'}}>Total</Text>
              </View>
              <View>
                <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>${this.state.grand_total}</Text>
                <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>($0)</Text>
                <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>${this.state.sub_total|| 0.00 }</Text>
                <Text style={{textAlign: 'right',fontSize:12, marginBottom: 15}}>${this.state.shipping_charge|| 0.00}</Text>
                <Text style={{fontWeight: '700', textAlign: 'right',fontSize:12, marginBottom: 15}}>${this.state.grand_total}</Text>
              </View>
            </View>
            </View>
          }
          
        </Content>
        {
          this.state.cart_count !==0 &&
          <Button style={{ width: width}}  full success onPress={ () => Actions['checkout'](carts) } >
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#fff'}}>PLACE ORDER</Text>
          </Button>
          }
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

export default connect(mapStateToProps, bindAction)(ShoppingCart);
