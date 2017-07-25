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
  },
};

class HeaderNB extends Component {  // eslint-disable-line

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