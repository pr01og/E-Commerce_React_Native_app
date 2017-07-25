import React, {Component} from 'react';
import styles from "./styles"
import {
  Text,
  Image,
  View,
  Dimensions,
} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class New extends Component {

  spliter(bigarray, size) {
    let array = []
    for (let i = 0; i < bigarray.length; i += size) {
      let smallarray = bigarray.slice(i, i + size);
      array.push(smallarray)
    }
    return array;
  }

  renderGridView() {
    const brands =this.props.newproducts || [];
    let gridArray = this.spliter(brands, 4);
    let grid = []
    for (let i = 0; i < gridArray.length; i++) {
      grid.push(
        <View style={{height: height/2 }} key={i + 10}>
          {this.renderRow(gridArray[i])}
        </View>
      )
    }

    return grid;
  }

  navigate(c){
    if (this.props.name === "bags") {
      Actions["bags_product_details"](c);
    }  else {
      Actions["header4"](c);
    }
  }

  renderRow(arry) {
    let row = [];
    let rowArray = this.spliter(arry, 2);

    for (let i = 0; i < rowArray.length; i++) {
      row.push(
        <Row style={{}} key={i + 200}>
          {this.renderCol(rowArray[i])}
        </Row>
      );
    }
    return row;
  }

  renderCol(arry) {
    let col = [];
    for (let i = 0; i < arry.length; i++) {
      let c = arry[i];
      col.push(
        <Col onPress={() => this.navigate(c)}  style={{width: width/2, alignItems: "center", borderWidth: 0.5, borderColor: "#C0C0C0" }} key={i + 100}>
          <Image style={{width: width, height: height/5, resizeMode: 'center' }} source={{uri: c.product_image}} />
          <Text style={{fontSize: 10}}>{(c.product_name).substring(0, 10)}</Text>
        </Col>
      );
    }
    return col;
  }

  render() {
    return (
      <Swiper height={responsiveHeight(60)} horizontal={true} >
        {this.renderGridView()}
      </Swiper>
    );
  }
}

export default New;
