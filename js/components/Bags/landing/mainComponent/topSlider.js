import React, { Component } from 'react';
import styles from "./styles"
import {
  Image,
  View,
  Dimensions,
} from 'react-native';

import {Spinner} from 'native-base';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';

class topSlider extends Component {
  render() {
    const ban = this.props.banners || [];
    const lists = ban.bannerslist || [];
    let loading = this.props.loading;
    return (
      <View>
        {!loading ? <Spinner /> : null}
        <Swiper  height={200} horizontal={true} autoplay>
          {
            lists.map(( y ) => {
              return (
                <Image  source={{ uri: y.mobile_image }} style={styles.container} key={y.id} />
              );
            })
          }
        </Swiper>
      </View>
    );
  }
}

export default topSlider;
