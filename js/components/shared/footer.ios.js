import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import { Actions } from 'react-native-router-flux';
import {openDrawer, closeDrawer} from '../../actions/drawer';
import {Button, Spinner} from 'native-base';
const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const {
    popRoute,
} = actions;

class FooterBottomTab extends Component {  // eslint-disable-line

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
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      landing: false
    };
  }

  componentDidMount(){
    console.log(this.props)

    // this.setState({
    // })
  }
  render() {
    return (
        <Footer>
            <FooterTab>
              <Button active={this.state.tab1}
                      onPress={() => Actions['landing']()}>
                <Icon style={{fontSize: responsiveFontSize(3)}} active={this.state.tab1}
                      name="home"/>
                <Text style={{fontSize: responsiveFontSize(1)}}>Home</Text>
              </Button>
              <Button active={this.state.tab2}
                      onPress={() => Actions['header6']()}>
                <Icon style={{fontSize: responsiveFontSize(3)}} active={this.state.tab2}
                      name="ios-notifications-outline"/>
                <Text style={{fontSize: responsiveFontSize(1)}}>Notifications</Text>
              </Button>
              <Button active={this.state.tab3}
                      onPress={() => Actions['header3']()}>
                <Icon style={{fontSize: responsiveFontSize(3)}} active={this.state.tab3}
                      name="ios-person-outline"/>
                <Text style={{fontSize: responsiveFontSize(1)}}>Profile</Text>
              </Button>
              <Button active={this.state.tab4}
                      onPress={() => Actions['header7']()}>
                <Icon style={{fontSize: responsiveFontSize(3)}} active={this.state.tab4}
                      name="cart"/>
                <Text style={{fontSize: responsiveFontSize(1)}}>Cart</Text>
              </Button>
            </FooterTab>
          </Footer>
        )
    }
}

export default FooterBottomTab