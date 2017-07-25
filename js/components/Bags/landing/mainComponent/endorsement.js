import React, { Component } from 'react';
import styles from "./styles"
import {
  Image,
  Dimensions
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class Endorsement extends Component {
  render() {
    const endors = this.props.endors || []
    return (
      <Swiper 
            style={styles.wrapper} height={100} horizontal={true} showsButtons={true} showsPagination={false} >
        {
          endors.map((y)=>{
            return (
              <Grid key={y}>
                <Row>
                  <Col>
                    <Image style={{ marginLeft: responsiveWidth(10), marginTop: 30, height: responsiveHeight(7), width: responsiveWidth(80), resizeMode: 'stretch' }} source={{uri: y.image}} />
                  </Col>
                </Row>
              </Grid>
            )
          })
        }
      </Swiper>
    );
  }
}

export default Endorsement
