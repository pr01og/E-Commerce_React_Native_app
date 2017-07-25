import React, { Component } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image, Text, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { Actions } from 'react-native-router-flux';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width, height } = Dimensions.get('window');

class Featured extends Component {
  spliter(bigarray, size) {
    let array = []
    for (let i = 0; i < bigarray.length; i += size) {
      let smallarray = bigarray.slice(i, i + size);
      array.push(smallarray)
    }
    return array;
  }

  renderGridView() {
    const featured = this.props.featured || [];
    let gridArray = this.spliter(featured.slice(0,12), 3);

    let grid = [];
    for (let i = 0; i < gridArray.length; i++) {
      grid.push(
        <Grid  key={i + 10}>
          {this.renderRow(gridArray[i])}
        </Grid>
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
    let rowArray = this.spliter(arry, 3);
    for (let i = 0; i < rowArray.length; i++) {
      row.push(
        <Row key={i + 200} style={styles.thumbStyle}>
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
        <Col onPress={() => this.navigate(c)}
             style={{ alignItems: "center", marginLeft: 5, width: width/3.19, borderWidth: 1, borderColor: "#C0C0C0" }}
             key={i + 100}>
          <Image style={{height: height/5, width: width/3.2, resizeMode: 'center' }} source={{uri: c.product_image}} />
          <Text style={{fontSize: 10, marginBottom: 10}}> {(c.product_name).substring(0, 10)}</Text>
        </Col>
      );
    }
    return col;
  }

  render() {
    return (
      <Swiper paginationStyle={{bottom: responsiveHeight(0)}} style={{marginTop: -10}} height={200} horizontal={true} >
        {this.renderGridView()}
      </Swiper>
    );
  }
}

export default Featured
