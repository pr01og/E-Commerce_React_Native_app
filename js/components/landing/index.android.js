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

let DATA_URL = 'http://www.devsteam.mobi/pcapp/index.php/mobileapi/?username=pcadmin&authkey=pcadmin123';
import IconFont from 'react-native-vector-icons/FontAwesome';

import Main from './main';
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
    left: 15
  },
};

class HeaderNB extends Component {  // eslint-disable-line
  static propTypes = {
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    landing: React.PropTypes.bool,
    data: React.PropTypes.array,
    categories: React.PropTypes.array,
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
      landing: false,
      categories: [],
    };
  }

  setLandingPage() {
    let UID123_object = {
      landing: 'installed',
    };
    AsyncStorage.setItem('UID123', JSON.stringify(UID123_object));
    this.setState({
      landingSlider: true,
    });
  }

  setHome(){
    Actions['watches']();
  }

  getItem() {
    AsyncStorage.getItem('UID123', (err, result) => {
      const data = JSON.parse(result);
      if (data && data.landing === "installed") {
        this.setState({
          landingSlider: true,
        });
      }
    });
  }

  componentDidMount() {
    this.getItem();
  }

  render() {
    if (this.state.landingSlider) {
      if(this.state.landing){
        return (
          <Container style={styles.container}>
            <Header style={{ flexDirection: 'row', backgroundColor: "#fff" }}>
              <Left>
                <Button transparent onPress={this.props.openDrawer}>
                <Icon style={{fontSize: 20, color: '#000'}}
                      name="menu"/>
                </Button>
                
              </Left>
              <Body>
                <Image style={{resizeMode: 'center', width: 160}}
                     source={require("./mainComponent/images/head.jpg")}/>
              </Body>
              <Right>
                <Button transparent>
                  <IconFont name='plane' size={24} style={{opacity:0.5, color: '#444'}}/>
                </Button>
                <Button transparent>
                  <Icon  style={{fontSize: 20, color: '#000'}} name='search'/>
                </Button>
              </Right>
          </Header>

          <Content>
            {this._renderView(this.state.menu)}
          </Content>
          <FooterBottomTab />
        </Container>
        );
      } else {
        return (
          <View>
        <Row size={2} style={{backgroundColor: "#f5f5f5"}}>
          <Col>
            <Image
              style={ {width: width/2, height: height/2}}
              source={require("../../images/slider/slider2.jpg")}
            />
          </Col>
          <Col style={{flex: 1, alignItems: 'center', alignSelf: 'center', flexDirection: 'column'}}>
            <Image
              style={{width: responsiveWidth(30), height: responsiveHeight(10)}}
              source={require("./mainComponent/images/forwatches.jpg")}
            />
            <Button transparent onPress={()=>Actions['watches']()} style={{width: responsiveWidth(50), marginTop: 15}} >
              <Image  source={require('../../images/slider/3_button.png')} style={{ marginLeft: responsiveWidth(6), width: responsiveWidth(28),  height: responsiveHeight(7)}}>
              </Image>
            </Button>
          </Col>
        </Row>

        <Row size={2} style={{ backgroundColor: "#f5f5f5", borderTopWidth: 2, borderTopColor: "#fff"}}>
          <Col>
            <Image
              style={{top: -responsiveHeight(0.4),width: width/2, height: height/2}}
              source={require("./mainComponent/images/slider1.png")}
            />
          </Col>
          <Col style={{flex: 1, alignItems: 'center', alignSelf: 'center', flexDirection: 'column'}}>
            <Image
              style={{width: responsiveWidth(35), height: responsiveHeight(9), marginTop: -30}}
              source={require("./mainComponent/images/forbags.jpg")}
            />
            <Button transparent onPress={()=>Actions['bags']({site: 'bags'})} style={{width: responsiveWidth(50), marginTop: 15}} >
              <Image  source={require('../../images/slider/3_button.png')} style={{marginLeft: responsiveWidth(6), width: responsiveWidth(28),  height: responsiveHeight(7)}}>
              </Image>
            </Button>
          </Col>
        </Row>
      </View>
        );
      }
    } else {
      return (
        <Swiper  activeDotColor={"#fff"} paginationStyle={{bottom: responsiveHeight(10)}} style={home_styles.wrapper} horizontal={true} loop={false}>
          <Image source={require('../../images/slider/1_image.jpg')} style={home_styles.slider}>
            <View style={{position: 'absolute', bottom: responsiveHeight(30), right: responsiveHeight(4)}}>
              <Image source={require('../../images/slider/1_text.png')} style={{width: responsiveWidth(80), height: responsiveWidth(68)}}>
              </Image>
            </View>
          </Image>
          <Image source={require('../../images/slider/2_image.jpg')} style={home_styles.slider}>
            <View style={{position: 'absolute', height: height, top: responsiveHeight(20), bottom: responsiveHeight(30), left: responsiveHeight(4)}}>
              <Image source={require('../../images/slider/2_text.png')} style={{alignSelf: 'center'}}>
              </Image>
            </View>
          </Image>

          <Image source={require('../../images/slider/3_image.jpg')} style={home_styles.slider}>
            <View style={{position: 'absolute', bottom: responsiveHeight(35), alignSelf: 'center'}}>
              <Image source={require('../../images/slider/3_text.png')} style={{alignSelf: 'center'}}>
              </Image>
              <Button transparent onPress={this.setLandingPage.bind(this)} style={{alignSelf: 'center', top: responsiveHeight(5)}} >
                <Image  source={require('../../images/slider/3_button.png')} style={{alignSelf: 'center'}}>
                </Image>
              </Button>
            </View>
          </Image>
          

          {/*<Image source={require('../../images/slider/slider2.jpg')} style={home_styles.slider}>
            <View style={home_styles.bannerText2}>
              <Text style={{fontSize: 44, color: "#fff", fontWeight: '300', textAlign:'right'}}>Huge</Text>
              <Text style={{fontSize: 44, color: "#fff", fontWeight: '300', textAlign:'right'}}>Collection</Text>
              <Text style={{fontSize: 30, color: "#fff", fontWeight: '700', textAlign:'right'}}>Great Quality</Text>
              <Text style={{fontSize: 30, color: "#fff", fontWeight: '300', textAlign:'right'}}>And</Text>
              <Text style={{fontSize: 30, color: "#fff", fontWeight: '300', textAlign:'right'}}>at
                <Text style={{fontSize: 30, marginLeft: 3, color: "#fff", fontWeight: '600', textAlign:'right'}}>Prices</Text>
              </Text>
              <Text style={{fontSize: 44, color: "#fff", fontWeight: '300', textAlign:'right'}}>You Cant</Text>
              <Text style={{fontSize: 44, color: "#fff", fontWeight: '300', textAlign:'right'}}>Refuse</Text>
            </View>
          </Image>
          <Image source={require('../../images/slider/slider3.jpg')} style={home_styles.slider}>
            <View style={home_styles.bannerText3}>
              <Text style={{fontSize: responsiveFontSize(4), color: "#fff", fontWeight: '700', textAlign:'center'}}>Popular Brands</Text>
              <Text style={{fontSize: responsiveFontSize(4), color: "#fff", fontWeight: '300', textAlign:'center'}}>Latest Designs at</Text>
              <Text style={{fontSize: responsiveFontSize(2), color: "#fff", fontWeight: '700', textAlign:'center'}}>Jaw Dropping Prices</Text>
              <Button
                full
                style={{width: width/2, alignSelf: 'center', top: 10}}
                onPress={this.setLandingPage.bind(this)}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Get Started</Text>
              </Button>
            </View>
          </Image>*/}
        </Swiper>
      );
    }
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

export default connect(mapStateToProps, bindAction)(HeaderNB);