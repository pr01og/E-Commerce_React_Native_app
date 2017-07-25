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
    AsyncStorage.getItem('bag', (err, result) => {
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
    AsyncStorage.setItem('site', JSON.stringify({site: "bags"}));
  }

  setCategories(){
    let categories = this.state.categories || []
    AsyncStorage.setItem('categories', JSON.stringify(categories));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
      return (
        <Container>
          <Header style={{ backgroundColor: "#63254d", flexDirection: 'row' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon style={{ color: "#fff"}} name="menu"/>
              </Button>
            </Left>
            <Body>
              <Image style={{resizeMode: 'center', width: 160}}
                    source={require("../landing/mainComponent/images/bags_logo.jpg")}/>
            </Body>
            <Right>
              <Button transparent>
                <IconFont name='plane' size={24} style={{opacity:0.8, color: '#fff'}}/>
              </Button>
              <Button transparent>
                <Icon style={{ color: "#fff"}} name='search'/>
              </Button>
            </Right>
        </Header>
        <Content>
          {!this.state.loading && <Spinner /> }
          { this.state.loading &&
            <Main name={this.props.name} data={this.state.data} loading={this.state.loading} />
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