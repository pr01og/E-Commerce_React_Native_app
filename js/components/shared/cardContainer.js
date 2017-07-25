import React, { Component } from 'react';

import { Image, View, Text, Dimensions, Card } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class Brand extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const cardHeight = 300
    return (
      <Swiper paginationStyle={{bottom: -20}}  height={cardHeight} horizontal={true}>
        <View>
            <Card>
            </Card>
        </View>
      </Swiper>
    );
  }
}

export default Brand;
