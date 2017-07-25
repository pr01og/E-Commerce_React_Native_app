
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Input,Label} from 'native-base';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


const {
    popRoute,
} = actions;

import { Dimensions, AsyncStorage, Alert} from 'react-native';
import SpinnerNB from "../loaders/Spinner";


const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';

class Header3 extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props){
    super(props)
    this.state = {
      logged: false,
      userinfo: {},
      fname: '',
      lname: '',
      email: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      street: '',
      postcode: '',
      user_id: '',
      device: '',
    };
  }

  componentDidMount(){
    this.getLogin()
  }

  // setLogin() {
  //   // AsyncStorage.getItem('user', (err, result) => {
  //   //   const data = JSON.parse(result);
  //   //   console.log(data)
  //   //   if(data && data.user) {
  //   //     this.setState({
  //   //       logged: true,
  //   //       userinfo: data.user,
  //   //       user_id: data.user.customer_info.customer_id,
  //   //       device: data.user.device_id,
  //   //     }); 
  //   //   }
  //   // });
  // }
  

  getLogin(){
    AsyncStorage.getItem('user', (err, result) => {
      const data = JSON.parse(result);
      if(data && data.user) {
        this.setState({
          logged: true, 
          userinfo: data.user,
          user_id: data.user.customer_info.customer_id,
          device: data.user.device_id,
        }); 
        this.getCustomerDetails()
      } else {
        this.setState({
          user_id: "",
          device: "",
        }); 
      }
    });
  }

  getCustomerDetails() {
    console.log(this.state)
    if (this.state.user_id) {
     let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/myaccount/?userid=${this.state.user_id}&username=pcadmin&authkey=pcadmin123`
     console.log(url)
      return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if(response.code === 200){
          let c = response.data.customer_details[0]
          this.setState({
            fname: c.firstname,
            lname: c.lastname,
            email: c.email,
          }); 
        } else {
          Alert.alert(response.message);
        }
      })
    }
  }

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  saveAccount(){
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/updatecustomer/?username=pcadmin&authkey=pcadmin123&userid=${this.state.user_id}&firstname=${this.state.fname}&&lastname=${this.state.lname}&&email=${this.state.email}`;
    return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if(response.code === 200){
        this.setUser(response.data);
         Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
      }
    })

  }

  saveAddress(){
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/checkout/updateaddres/?device_id=${this.state.device}&customer_id=${this.state.user_id}&address_id=${this.state.address_id}&firstname=${this.state.fname}&lastname=${this.state.fname}&street=${this.state.street}&city=${this.state.city}&country_id=${this.state.country}&region=${this.state.region}&postcode=${this.state.postcode}&telephone=${this.state.phone}&is_default_billing=1&is_default_shipping=1&username=pcadmin&authkey=pcadmin123`;
    return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      if(response.code === 200){
        this.setUser(response.data);
         Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
      }
    })
  }
  
  logout() {
    Alert.alert("Log out successfully.")
    AsyncStorage.removeItem('user');
    this.setState({
      logged: false,
      user_id: '',
    });
    this.componentDidMount()
  }

  render() {
    let customer = this.state.userinfo && this.state.userinfo.customer_info
    let fname = this.state.fname 
    let lname = this.state.fname 
    let email = this.state.email 
    return (
      <Container>
        <Header androidStatusBarColor="#5bc0de" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: "#000"}} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#000", fontSize:12, fontWeight: '800'}}>MY ACCOUNT</Title>
          </Body>
          <Right />
        </Header>
        { !this.state.logged && 
          <Content style={{padding: 50}}>
            <IconFont style={{fontSize: 30, alignSelf: 'center', color: 'gray'}}name="warning" />
            <Text style={{fontSize: 12, marginTop: 20, textAlign: 'center', color: 'gray'}}>
              Your not logged in yet. 
            </Text>
            <Text onPress={()=>Actions['header8']()} style={{color: 'blue', fontSize: 15, marginTop: 20, textAlign: 'center'}}> Login Here</Text>
          </Content>
        }
        { this.state.logged && 
        <Content style={{backgroundColor: '#f5f5f5'}}>
          <View style={{backgroundColor: "#428bca", width: width, height: height/ 3.6}}>
            <View style={{alignSelf: 'center', paddingTop: height/15, flexDirection: 'column'}}>
              <IconFont name="user-circle-o" style={{color: '#fff', fontSize: 55 , textAlign:'center'}}/>
              <Text style={{color: "#FFF", textAlign:'center' }}>{customer.customer_name}</Text>
              <Text note  style={{color: "#FFF", textAlign:'center', fontSize: 12}}>{customer.customer_email}</Text>
            </View>
          </View>

          <View style={{backgroundColor: "#fff", width: width, height: height/9}}>
            <View style={{alignSelf: 'center', paddingTop: height/40, flexDirection: 'row'}}>
              <View>
                <IconFont onPress={()=>Actions["my_orders"]()} name="newspaper-o" style={{color: 'gray', fontSize: 24, textAlign:'center'}}/>
                <Text onPress={()=>Actions["my_orders"]()}  style={{fontSize: 10}}>View Orders</Text>
              </View>
              <View style={{marginLeft: 30}}>
                <IconFont onPress={()=>Actions["header5"]()} name="heart-o" style={{color: 'gray',fontSize: 24 , textAlign:'center'}}/>
                <Text onPress={()=>Actions["header5"]()} style={{fontSize: 10}}>My Wishlist</Text>
              </View>
              <View  style={{marginLeft: 30}}>
                <IconFont onPress={()=>this.logout()} name="share-square-o" style={{color: 'gray', fontSize: 24, textAlign:'center'}}/>
                <Text onPress={()=>this.logout()} style={{fontSize: 10}}>Logout</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', width: width, height: height/20}}>
            <Text style={{left: 20,fontSize: 12, paddingTop: 10}}>ACCOUNT INFORMATIONS</Text>
          </View>
          <View style={{backgroundColor: "#fff",flexDirection:"column", paddingLeft: 10, margin: 4, width: width}}>
            <Form style={{width: width/1.1}}>
             <Input style={product_styles.inputBrdr} onChangeText={(username) => this.setState({fname: username})} value={this.state.fname} placeholder="First Name" />
             <Input style={product_styles.inputBrdr} onChangeText={(username) => this.setState({lname: username})}  value={this.state.lname} placeholder="Last Name" />
             <Input style={product_styles.inputBrdr} onChangeText={(username) => this.setState({email: username})} value={this.state.email} placeholder="Email" />

              <View style={{flexDirection:"row", marginTop: 10, marginBottom: 30}}>
                <Button style={{ width: width/2.5, height: height/25}}  block dark onPress={ () => this.saveAccount() } >
                  <Text style={{ fontSize: 10}}>Change Password</Text>
                </Button>
                <Button style={{ width: width/2.5, height: height/25, marginLeft: width/12}} disabled block onPress={ () => this.saveAccount() }>
                  <Text style={{ fontSize:10}}>Save</Text>
                </Button>
              </View>
            </Form>
          </View>
          <View style={{ flexDirection: 'row', width: width, height: height/20}}>
            <Text style={{left: 20,fontSize: 12, paddingTop: 10}}>DEFAULT ADDRESS</Text>
          </View>

          <View style={{backgroundColor: "#fff", flexDirection:"column", paddingLeft: 10, margin: 4, width: width, marginBottom: 50}}>
            <Form style={{width: width/1.1}}>
              <Input style={product_styles.inputBrdr} onChangeText={(username) => this.setState({fname: username})} value={this.state.fname} placeholder="First Name" />
              <Input style={product_styles.inputBrdr} onChangeText={(street) => this.setState({street: street})} value={this.state.street} placeholder="Address Line" />
              <Input style={product_styles.inputBrdr} onChangeText={(state) => this.setState({state: state})} value={this.state.state} placeholder="State" />
              <Input style={product_styles.inputBrdr} onChangeText={(city) => this.setState({city: city})} value={this.state.city} placeholder="City" />
              <Input style={product_styles.inputBrdr} onChangeText={(region) => this.setState({region: region})} value={this.state.region} placeholder="Region" />
              <Input style={product_styles.inputBrdr} onChangeText={(postcode) => this.setState({postcode: postcode})} value={this.state.postcode} placeholder="PostCode" />
              <Input style={product_styles.inputBrdr} onChangeText={(country) => this.setState({country: country})} value={this.state.country} placeholder="Country" />
              <Input style={product_styles.inputBrdr} onChangeText={(phone) => this.setState({phone: phone})} value={this.state.phone} placeholder="Telephone" />
              <View style={{flexDirection:"row", marginTop: 10}}>
                <Button style={{ width: width/2.5, height: height/25}} block  dark onPress={ () => this.saveAddress() } >
                  <Text style={{ fontSize: 10}}>Add New Address</Text>
                </Button>
                <Button style={{ width: width/2.5, height: height/25, marginLeft: width/12}} block onPress={ () => this.saveAddress() }>
                  <Text style={{ fontSize: 10}}>Save</Text>
                </Button>
              </View>
            </Form>
          </View>
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

export default connect(mapStateToProps, bindAction)(Header3);
const product_styles= {
  title: {
    fontWeight: 'bold',
    width,
  },
  qty_icon: {
    fontWeight: 'bold',
  },
  qty_section: {
    flexDirection: "row",
    width: 40,
    marginBottom: 30,
    marginTop: 3,
    alignSelf: 'center',
    marginLeft: -50,
  },
  qty_section_item: {
    width: 30,
  },
  inputBrdr: {
    borderWidth: 1,
    width: width/1.1,
    height: height/18,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },
  inputTextArea: {
    borderWidth: 1,
    width: width/1.2,
    marginTop: 10,
    borderColor: 'lightgray',
    fontSize: 12,
  },
  submitBtn: {
    marginBottom : 20,
    alignSelf: 'center',
    width: width/2.4,
    height: height/24
  },
  submitBtnText: {
    fontSize: 13,
    textAlign: 'center',
    marginLeft: 40,
  }
}