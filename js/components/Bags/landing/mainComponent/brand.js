import React, {Component} from 'react';
import styles from "./styles"
import { Actions } from 'react-native-router-flux';

import {
  Image,
  View,
  Text,
  Dimensions,
  Card,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class Brand extends Component {
  constructor(props) {
    super(props);
  }

  spliter(bigarray, size) {
    let array = []
    for (let i = 0; i < bigarray.length; i += size) {
      let smallarray = bigarray.slice(i, i + size);
      array.push(smallarray)
    }
    return array;
  }

  renderGridView() {
    const brands = this.props.brands || [];
    let gridArray = this.spliter(brands, 6);
    let grid = []
    for (let i = 0; i < gridArray.length; i++) {
      grid.push(
        <Grid  key={i + 10}>
          {this.renderRow(gridArray[i])}
        </Grid>
      )
    }

    return grid;
  }

  renderRow(arry) {
    let row = [];
    let rowArray = this.spliter(arry, 3);

    for (let i = 0; i < rowArray.length; i++) {
      row.push(
        <Row key={i + 200}>
          {this.renderCol(rowArray[i])}
        </Row>
      );
    }
    return row;
  }

  navigate(c){
    console.log(this.props)
    if (this.props.name === "bags") {
      Actions["bags_category"](c, {name: 'bags'});
    }  else {
      Actions["category"](c);
    }
  }
  renderCol(arry) {
    let col = [];
    for (let i = 0; i < arry.length; i++) {
      let c = arry[i];
      col.push(
        <Col style={{ flexDirection: 'column', alignItems: "center",   width:  width/3.13, height: responsiveHeight(20), margin: 2, borderWidth: 0.5, borderColor: "#C0C0C0" }} key={i + 100}
             onPress={() => this.navigate(c)}>
          <Image style={{ height: height/6, width: width/3.13, resizeMode: 'center' }} source={{ uri: c.image }} />
          <Text style={{fontSize: 10}}>{c.title}</Text>
        </Col>
      );
    }
    return col;
  }

  render() {
    return (
      <Swiper  height={300} horizontal={true}>
        { this.renderGridView()}
      </Swiper>
    );
  }
}

export default Brand;
