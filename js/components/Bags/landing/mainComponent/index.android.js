import React, {Component} from 'react';
import TopSlider from './topSlider'
import Brand from './brand'
import New from './new'
import Featured from "./featured";
import Endors from "./endorsement";
import {Text, Image, View, Alert, AsyncStorage, Dimensions} from 'react-native';
import styles from "./styles"
import {Content, Body} from 'native-base';
const { width, height } = Dimensions.get('window');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
class topSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <Content>
        <TopSlider banners={this.props.data} loading={this.props.loading}/>
        <Image style={{resizeMode: "center", width: responsiveWidth(100), height: responsiveHeight(10)}}
               source={require("./images/bar1.jpg")}/>
        <Brand name={this.props.name} brands={this.props.data.brandslider}
               loading={this.props.loading}/>
        <Image style={{resizeMode: "center", width: responsiveWidth(100), height: responsiveHeight(10)}}
               source={require("./images/bar2.jpg")}/>
        <New name={this.props.name} newproducts={this.props.data.newproducts}
             loading={this.props.loading}/>
        <Image style={{resizeMode: "center", width: responsiveWidth(100), height: responsiveHeight(10)}}
               source={require("./images/bar3.jpg")}/>
        <Featured name={this.props.name} featured={this.props.data.featureproducts}
                  loading={this.props.loading}/>
        <Image name={this.props.name} style={{resizeMode: "center", width: responsiveWidth(100), height: responsiveHeight(10)}}
               source={require("./images/bar4.jpg")}/>
        <Endors endors={this.props.data.endorsement}
                loading={this.props.loading}/>
      </Content>
    );
  }
}

export default topSlider;