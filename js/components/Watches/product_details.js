
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  Dimensions,
  Alert,
  AsyncStorage,
} from 'react-native';

import { 
  Container, 
  Badge, 
  Header, 
  Toast,  
  Title, 
  Content, 
  Button, 
  Icon, 
  Card, 
  Textarea, 
  Left, 
  Form, 
  Item, 
  Right, 
  Body, 
  Text, 
  View, 
  Input,
  Spinner
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import product_styles from './product_style';
import Swiper from 'react-native-swiper';

import SpinnerNB from "../loaders/Spinner";
import Break from './break';

const { width, height } = Dimensions.get('window');
const { popRoute } = actions;
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import HTMLView from 'react-native-htmlview';

const HOST = "http://www.devsteam.mobi/pcapp/index.php"

class ProductDetails extends Component {  // eslint-disable-line
  static propTypes = {
    openDrawer: React.PropTypes.func,
    qty: React.PropTypes.string,
    maxqty: React.PropTypes.number,
  }
  constructor(props) {
    super(props)
    this.state = {
      qty: "1",
      cartids: '',
      user_id: '',
      cart_count: 0,
      review_name: '',
      review_summary: '',
      review_message: '',
      loading: true,
      device: "12345"
    }
  }

  componentDidMount() {
    setTimeout(()=>{ this.getLogin(); this.getProductDetails();  }, 3000);
  }

 getLogin(){
    AsyncStorage.getItem('user', (err, result) => {
      const data = JSON.parse(result);
      if(data && data.user) {
        this.setState({
          user_id: data.user.customer_info.customer_id,
          device: data.user.device_id,
        }); 
      } else {
        this.setState({
          user_id: "",
          device: "",
        }); 
      }
    });
  }
  
  
  getProductDetails() {
    this.getCartCount();
    let productId = this.props.product_id;
    if (productId) {
      let url = `${HOST}/mobileapi/product/index/product_id/${productId}?username=pcadmin&authkey=pcadmin123`
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.data,
          maxqty: responseJson.data && responseJson.data.max_qty,
          loading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  addWish(item) {
    if  (this.state.user_id && item && item.id) {
      let addwish_url = `${HOST}/mobileapi/wishlist/addtowishlist/?device_id=${this.state.device}&customer_id=${this.state.user_id}&product_type=${item.product_type || ''}&qty=1&product_id=${item.id}&username=pcadmin&authkey=pcadmin123`
      return fetch(addwish_url)
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson.message)
        })
        .catch((error) => {
          console.error(error);
        });

    } else {
      Actions["header8"]()
    }      
  }

  addToCart(c) {
    if(this.state.user_id) {
      this.setState({ 
        showAlert: true,
      })
      this.setCartCount();
      this.getCartCount();
      this.addItemCartItemToServer(c);
    } else {
      Actions["header8"]()
    }  
  }

  setCartCount(){
    let count = {
      cart_count: Number(this.state.cart_count) + Number(this.state.qty),
    };
     this.setState({
        cart_count: count.cart_count,
      }); 
    AsyncStorage.setItem('bagCartCount', JSON.stringify(count));
  }

  componentWillMount() {
    this.getCartCount();
  }

  getCartCount(){
    AsyncStorage.getItem('bagCartCount', (err, result) => {
      const data = JSON.parse(result);
      if(data && data.cart_count) {
        this.setState({
          cart_count: data.cart_count,
        }); 
      }
    });
  }

  getCartDetails(){
    if (this.state.user_id) {
      let url = `${HOST}/mobileapi/cart/?customer_id=${this.state.user_id}&device_id=${this.state.device}&username=pcadmin&authkey=pcadmin123`
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code === 200) {
            this.setState({
              cart_count: responseJson.data && responseJson.data.cart_count || 0
            })
          } else {
             this.setState({
              cart_count: 0
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  
  addItemCartItemToServer(c){
    if (c && c.id) {
      let url = `${HOST}/mobileapi/cart/add/?product_id=${c.id}&qty=${this.state.qty}&customer_id=${this.state.user_id}&device_id=${this.state.device}&super_attribute%5B138%5D=7&username=pcadmin&authkey=pcadmin123`
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          if (responseJson.code === 200) {
            this.setState({
              showAlert: false,
            })
            this.getCartDetails();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
  }

  submitReview(){
    if (this.state.review_name.length > 0 || this.state.review_message.length > 0 || this.state.review_summary.length > 0) {
      Alert.alert('Review submitted');
    } else {
      Alert.alert('Please fill the form details');
    }
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

  render() {
    const product_image = this.props.product_image || "";
    const productName = this.props.product_name || "";
    const BrandName = this.props.brand_name || "";
    const categoryName = this.props.category_name || ""
    const p_details = this.state.data || []
    return (
      <Container>
        <Header style={{backgroundColor: '#f5f5f5'}} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: '#000', fontWeight: '100'}} name="arrow-back" />
            </Button>
          </Left>
          <Right>
            <Button  transparent><Icon style={{color: '#000'}} name="share" /></Button>
            <Button  transparent onPress={ () => Actions['header7']()}><Icon style={{color: '#000'}}  name="cart" />
            {
              this.state.cart_count > 0 && 
                <Badge success>
                  <Text>{this.state.cart_count}</Text>
              </Badge>
            }
            </Button>

          </Right>
        </Header>
        {
          this.state.showAlert && <View style={{backgroundColor: '#3CB371'}}><Text style={{fontSize: 14, color: '#fff', padding: 10, textAlign: 'center'}}> Nice..Product has been added to the cart :) </Text></View>  
        }
        { this.state.loading ? <Spinner /> : 
        
        <Content>
          <Swiper paginationStyle={{bottom: -30}}  height={responsiveHeight(46)}  horizontal={true} autoplay>
            <Image source={{ uri: product_image }} style={styles.container} />
            <Image source={{ uri: product_image }} style={styles.container} />
          </Swiper>
          <View style={{flexDirection:"row", marginTop: 50}}>
            <View style={{width: width/2, marginLeft: 10, marginRight: 20}}>
              <Text style={{fontWeight: '600', fontSize: responsiveFontSize(1.8)}}>{productName}</Text>
              <Text style={{fontWeight: '200'}}>{BrandName || categoryName}</Text>
            </View>
            <View style={{flex: 1, flexDirection: "row", left: responsiveWidth(10)}}>
              <Text style={{textDecorationLine: 'line-through', right: responsiveWidth(1.8), fontWeight: '600', color: "gray", fontSize: responsiveFontSize(1.3)}}>{p_details && p_details.price}</Text>
              <Text style={{fontWeight: '700', fontSize: responsiveFontSize(2)}}>{p_details && p_details.price}</Text>
            </View>
          </View>
          <Body style={product_styles.qty_section}>
            <Text style={product_styles.qty_section_item} onPress={()=>this.decrease()}>-</Text>
            <Item  style={{ top: responsiveHeight(0.5)}}>
              <Input onChangeText={(qty) => this.setState({qty: qty})}  style={{ borderWidth: 1, fontSize: responsiveFontSize(2), height: 40,  width: width/2, textAlign: 'center', borderColor: 'lightgray' }} value={`${this.state.qty}`} />
            </Item>
            <Text style={{marginLeft: 20, fontSize: 25}} onPress={()=>this.increase()}>+</Text>
          </Body>

          <View style={{flex: 1, flexDirection:"row", marginTop: 0}}>
            <Button style={{backgroundColor: '#4d4d4d', width: responsiveWidth(40)}} full dark onPress={ () => this.addWish(p_details) } >
              <Icon name='heart' />
              <Text style={{ fontWeight: '600'}}>WISH LIST</Text>
            </Button>
            <Button style={{ backgroundColor: '#00cc66', width: responsiveWidth(60)}} full success onPress={ () => this.addToCart(p_details) }>
              <Icon name='cart' />
              <Text style={{ fontWeight: '600'}}>ADD TO CART</Text>
            </Button>
          </View>
          <View style={{margin: 20}}>
            <Text style={product_styles.title}>Product Description</Text>
            <Break />
              <HTMLView
              value={p_details && p_details.description}
            />
            <Break />
              <Text style={product_styles.title}>Product Specification</Text>
              <Break />
              <Text style={product_styles.title}>Product Video</Text>
              <Break />
              <Text style={product_styles.title}>QC Pics Examples</Text>
              <Break />
              <View>
              <View style={{flexDirection: 'row'}}>
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7}}  />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7, marginRight: 10}}  />
                <Image source={{ uri: product_image }} style={{width: width/5, height: height/7}}  />
              </View>
              </View>
              <Break />
            <Text style={product_styles.title}>Review</Text>
            <Break />
            <View style={{margin: 10}}>
              <Text style={{textAlign: "center", color: 'gray'}}>You're Reviewing: {productName}</Text>
              <Form>
                <Input  onChangeText={(review_name) => this.setState({review_name: review_name})} value={this.state.review_name} style={product_styles.inputBrdr} placeholder="Nickname" />
                <Input  onChangeText={(review_summary) => this.setState({review_summary: review_summary})} value={this.state.review_summary}  style={product_styles.inputBrdr} placeholder="Summary of Your Review" />
                <Textarea  onChangeText={(review_message) => this.setState({review_message: review_message})} value={this.state.review_message}  style={product_styles.inputTextArea} placeholder="Review" rowSpan={6} />
              </Form>
            </View>
          </View>
          <Button style={product_styles.submitBtn} half dark onPress={()=>this.submitReview()}>
            <Text style={product_styles.submitBtnText}>Submit</Text>
          </Button>
        </Content>
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

export default connect(mapStateToProps, bindAction)(ProductDetails);


