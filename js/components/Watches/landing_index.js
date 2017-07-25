import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
} from 'native-base';
import {Image, View, Text, Alert, AsyncStorage, Dimensions} from "react-native";
import {actions} from 'react-native-navigation-redux-helpers';
import {openDrawer, closeDrawer} from '../../actions/drawer';
import styles from './styles';
import * as axios from 'axios';
import {Button, Spinner} from 'native-base';
import Swiper from 'react-native-swiper';
import {Column as Col, Row} from 'react-native-flexbox-grid';
const { width, height } = Dimensions.get('window');

import IconFont from 'react-native-vector-icons/FontAwesome';

import Main from '../landing/main';
import FooterBottomTab from '../shared/footer';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';


const {
  pushRoute,
} = actions;

let SLIDER = {
  slider: 'true',
};


const home_styles = {
  wrapper: {
  },
  slider: {
    flex: 1,
    width,
    alignSelf: 'center',
    height,
  },

  bannerText: {
    position: 'absolute',
  },

  bannerText2: {
    position: 'absolute',
    top: height/2.6,
    right: 20,
    width,
  },
  bannerText3: {
    position: 'absolute',
    top: height/1.9,
    width,
  },
  landright: {
    flex: 1,
    alignSelf: 'center',
    height: responsiveHeight(40),
    width: responsiveHeight(20),
    left: 15,
  },
};

class LandingIndex extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    landing: React.PropTypes.bool,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      menu: "1",
      data: [],
      landingSlider: false,
      categories: [],
    };
  }

  getData() {
    AsyncStorage.getItem('app', (err, result) => {
      const data = JSON.parse(result);
      if(data) {
        this.setState({
        data: data,
        loading: true,
        categories: data.categorylist,
      });
      this.setCategories();
      }
    });
    AsyncStorage.setItem('site', JSON.stringify({site: "watches"}));
  }

  setCategories(){
    let categories = this.state.categories || []
    AsyncStorage.setItem('categories', JSON.stringify(categories));
  }

  componentDidMount() {
    this.getData();
  }

  searchItem(){
    Alert.alert("search products")
  }

  render() {
      return (
        <Container>
          <Header style={{ flexDirection: 'row', backgroundColor: '#fff' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon style={{color: "#000"}}  name="menu"/>
              </Button>
            </Left>
            <Body style={{flex: 1, alignItems: 'center'}}>
              <Image style={{ alignSelf: 'center', width: responsiveWidth(26), height: responsiveHeight(6)}}
                    source={require("../landing/mainComponent/images/head.jpg")}/>
            </Body>
            <Right style={{right: -10}}>
              <Button full style={{backgroundColor: "#f5f5f5", marginRight: 5, height: 48}} ransparent>
                <Thumbnail  onPress={() =>{this.sort()}} square style={{width: responsiveWidth(5),  marginLeft: 10, marginRight: 10, height: responsiveHeight(3)}} source={require('./image/flight.jpg')} />
              </Button>
              <Button full style={{backgroundColor: "#f5f5f5", height: 48}}  ransparent onPress={()=>{this.searchItem()}}>
                <Icon style={{color: "#000", textAlign: 'center', fontSize: 19, width: responsiveWidth(7)}} name="search" />
              </Button>
            </Right>
        </Header>
        <Content>
          {!this.state.loading && <Spinner /> }
          { this.state.loading &&
            <Main data={this.state.data} loading={this.state.loading} />
          }
        </Content>
        <FooterBottomTab />
      </Container>
      );
    }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(LandingIndex);