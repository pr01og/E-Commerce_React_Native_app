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
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(5), marginBottom:responsiveHeight(8)}}>  
          <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2.5)}}>Brands</Text>
          <View style={{ width: responsiveWidth(40), backgroundColor: '#fff', position: 'relative', zIndex: 100, alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', paddingLeft: 2, marginTop: responsiveHeight(1), height:responsiveHeight(4), width: responsiveWidth(44), position: 'absolute', fontSize: responsiveFontSize(3)}}>COLLECTIONS</Text></View>
          <View style={{borderWidth: 1, top: responsiveHeight(3),  position: 'relative', width: width}}></View>
        </View>
        <Brand name={this.props.name} brands={this.props.data.brandslider}
               loading={this.props.loading}/>
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(5), marginBottom:responsiveHeight(8)}}>  
          <View style={{ width: responsiveWidth(40), backgroundColor: '#fff', position: 'relative', zIndex: 100, alignSelf: 'center'}}>
            <Text style={{fontWeight: '900', paddingLeft: 2, marginTop: responsiveHeight(1), height:responsiveHeight(4), width: responsiveWidth(44), position: 'absolute', fontSize: responsiveFontSize(3)}}>WHATS NEW</Text></View>
          <View style={{borderWidth: 1, top: responsiveHeight(3),  position: 'relative', width: width}}></View>
        </View>
        <New name={this.props.name} newproducts={this.props.data.newproducts}
             loading={this.props.loading}/>
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(2), marginBottom:responsiveHeight(10)}}>  
          <View style={{ width: responsiveWidth(40), backgroundColor: '#fff', position: 'relative', zIndex: 100, alignSelf: 'center'}}>
            <Text style={{fontWeight: '900', paddingLeft: 12, marginTop: responsiveHeight(1), height:responsiveHeight(4), width: responsiveWidth(38), position: 'absolute', fontSize: responsiveFontSize(3)}}>FEATURED</Text></View>
          <View style={{borderWidth: 1, top: responsiveHeight(3),  position: 'relative', width: width}}></View>
        </View>
        <Featured name={this.props.name} featured={this.props.data.featureproducts}
                  loading={this.props.loading}/>
        <View style={{alignSelf: 'center', marginTop: responsiveHeight(-1), marginBottom:responsiveHeight(2)}}>  
          <View style={{ width: responsiveWidth(40), backgroundColor: '#fff', position: 'relative', zIndex: 100, alignSelf: 'center'}}>
            <Text style={{fontWeight: '800', paddingLeft: 13, marginLeft: -responsiveWidth(3), marginTop: responsiveHeight(1), height:responsiveHeight(4), width: responsiveWidth(52), position: 'absolute', fontSize: responsiveFontSize(3)}}>ENDORSEMENT</Text></View>
          <View style={{borderWidth: 1, top: responsiveHeight(3),  position: 'relative', width: width}}></View>
        </View>
        
        <Endors endors={this.props.data.endorsement}
                loading={this.props.loading}/>
      </Content>
    );
  }
}

export default topSlider;