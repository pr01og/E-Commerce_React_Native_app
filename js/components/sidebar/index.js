import React, {Component} from 'react';
import {Image, Platform, Alert, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Body,
  Right,
  Badge,
  Button,
  View,
  StyleProvider,
  getTheme,
  variables,
  Thumbnail,
} from 'native-base';
import {Actions} from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import {
  changePlatform,
  changeMaterial,
  closeDrawer
} from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';

import Break from './breaks';

const drawerCover = require('../../../img/drawer-cover.png');

const drawerImage = require('../../../img/logo-kitchen-sink.png');
import IconFont from 'react-native-vector-icons/MaterialIcons';
let myVar = "";
let profiles = [
  {
    name: 'My Account',
    route: 'header3',
    icon: 'phone-portrait',
    bg: '#C5F442',
  },
  {
    name: 'Cart',
    route: 'header7',
    icon: 'phone-portrait',
    bg: '#477EEA',
    types: '8',
  },
  {
    name: 'Wishlists',
    route: 'header5',
    icon: 'phone-portrait',
    bg: '#DA4437',
    types: '4',
  },
  {
    name: 'Notifications',
    route: 'header6',
    icon: 'phone-portrait',
    bg: '#DA4437',
    types: '4',
  }
];

let loginProfile = [
  {
    name: 'Login',
    route: 'header8',
  }
]

const pages = [
  {
    name: 'About US',
    route: 'static_page',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/aboutus/?username=pcadmin&authkey=pcadmin123' },
    icon: 'phone-portrait',
    bg: '#C5F442',
  },

  {
    name: 'Privacy Policy',
    route: 'static_page',
    icon: 'phone-portrait',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/privacypolicy/?username=pcadmin&authkey=pcadmin123' },
    bg: '#C5F442',
  },
  {
    name: 'Shipping & Exchange',
    route: 'static_page',
    icon: 'phone-portrait',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/shippingexchange/?username=pcadmin&authkey=pcadmin123' },
    bg: '#477EEA',
    types: '8',
  },
  {
    name: 'Delivery Via UK',
    route: 'static_page',
    icon: 'phone-portrait',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/delivery/?username=pcadmin&authkey=pcadmin123' },
    bg: '#DA4437',
    types: '4',
  },
  {
    name: 'Help & FAQ',
    route: 'static_page',
    icon: 'phone-portrait',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/help/?username=pcadmin&authkey=pcadmin123' },
    bg: '#DA4437',
    types: '4',
  },
  {
    name: 'Contact Us',
    route: 'static_page',
    icon: 'phone-portrait',
    url: { url: 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/cms/contactus/?username=pcadmin&authkey=pcadmin123' },
    bg: '#DA4437',
    types: '4',
  },
];

class SideBar extends Component {
  static propTypes = {
    navigateTo: React.PropTypes.func,
    themeState: React.PropTypes.string,
    changePlatform: React.PropTypes.func,
    changeMaterial: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      categories: [],
      logged: false,
      email: '',
      site: 'watches',
      timeout: 30000,
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  logout() {
    Alert.alert("Log out successfully.")
    AsyncStorage.removeItem('user');
    this.setState({
      logged: false,
    });
    this.componentDidMount()
  }

  componentDidMount(){
    this.myStopFunction()
    this.checkLoggedIn()
    this.getCategories()
    this.setState({
      subcategory: false,
      parentCategory: '',
    })
  }

  loadTimeCategory(){
    setTimeout(()=>{ this.getCategories(); }, 10000);
  }
  checkLoggedIn(){
    myVar = setInterval(()=>{ this.setSite(); this.setLogin() }, this.state.timeout);
  }

  myStopFunction() {
    clearInterval(myVar);
  }

  getCategories() {
    AsyncStorage.getItem('categories', (err, result) => {
      const data = JSON.parse(result);
      this.setState({
        categories: data,
      });
    });

    if (!this.state.categories){
      this.loadTimeCategory();
    }
  }

  setSite(){
     AsyncStorage.getItem('site', (err, result) => {
      const data = JSON.parse(result);
      console.log(data)
      this.setState({
        site: data.site,
      });
    });

  }

  setLogin() {
    // console.log("interval interval+ : "+ this.state.logged)
    AsyncStorage.getItem('user', (err, result) => {
      const data = JSON.parse(result);
      if(data && data.user) {
        this.setState({
          logged: true,
          email: data.user.customer_info.customer_email
        }); 
      }
    });
  }

  subCategory(category){
    if (category.subcategory_list && category.subcategory_list.length > 0) {
      this.setState({
        subcategory: true,
        categories: category.subcategory_list,
        parentCategory: category
      })
    } else {
      if (this.state.site == "bags"){
        Actions["bags_category"](category)
      } else {
        Actions["category"](category)
      }
      this.getCategories(); 
      this.props.closeDrawer();
    }
  }

  render() {
    let myprofiles = this.state.logged ? profiles : profiles.concat(loginProfile);
    let categories = this.state.categories || []
    let subcategory = this.state.subcategory
    return (
      <Container>
        <Content
          bounces={false}
          style={{flex: 1, backgroundColor: '#fff', paddingTop: 30}}
        >
          <Thumbnail  onPress={() =>{
            Actions["landing"]();
            this.props.closeDrawer()}} square style={{width: 20, marginLeft: 20, marginBottom: 10, height: 20}}source={require('./images/sidebarmenu.png')} />
          
          {subcategory && <ListItem style={{marginLeft: -3, borderBottomWidth: 0}} onPress={()=>this.componentDidMount()}><Left><IconFont name="keyboard-arrow-left" style={{fontSize: 20, left: 10,  color: 'gray'}}/><Text style={{fontSize: 13, fontWeight: '600'}}>{this.state.parentCategory && this.state.parentCategory.category_name}</Text></Left></ListItem>}
          
          <List
            dataArray={categories} renderRow={data =>
            <ListItem style={{marginBottom: -5, marginTop: -5}}  button noBorder onPress={() => {
              this.subCategory(data);
            }}>
              <Text style={styles.text}>{data.category_name}</Text>
              { data.subcategory_list && <Right><IconFont name="keyboard-arrow-right" style={{fontSize: 20,  color: 'gray'}} /></Right>}
            </ListItem> }
          />
          <Break />
          <List
            dataArray={myprofiles} renderRow={data =>
            <ListItem  style={{marginBottom: -5, marginTop: -5}}  button noBorder onPress={() => {
              Actions[data.route]();
              this.props.closeDrawer()
            }}>
              <Left>
                <Text style={styles.text}>{data.name}</Text>
              </Left>
            </ListItem>}
          />

          <Break />
          <List
            dataArray={pages} renderRow={data =>
            <ListItem  style={{marginBottom: -5, marginTop: -5}}  button noBorder onPress={() => {
              Actions[data.route](data.url);
              this.props.closeDrawer()
            }}>
              <Left>
                <Text style={styles.text}>{data.name}</Text>
              </Left>
            </ListItem>}
          />
          <Break/>
          {this.state.logged && 
            <View style={{marginLeft: 20, marginBottom: 30}}>
                <Text style={{fontSize: 13}} onPress={()=>{this.logout()}}>Logout</Text>
              <Text style={{fontSize: 12, color: 'gray'}}>Signed in as {this.state.email}</Text>
            </View>
          }
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    closeDrawer: () => dispatch(closeDrawer()),
    changePlatform: () => dispatch(changePlatform()),
    changeMaterial: () => dispatch(changeMaterial()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(SideBar);