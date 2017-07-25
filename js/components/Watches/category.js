
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner, Container, Header, List,
  ListItem,Thumbnail, ActionSheet, Input, Title, Content, Button, Icon, Left, Right, Body, Text } from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import {Dimensions, View, Image} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Modal from 'react-native-modalbox';
const screen = Dimensions.get('window');

const {
    popRoute,
} = actions;


const BUTTONS = [
  'Name',
  'Price : High - Low',
  'Price : Low - High',
  'Cancel',
];

const FILTER = [
  'Name',
  'Price : High - Low',
  'Price : Low - High',
  'Cancel',
];  

const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 3;

const customStyle = {
  listView: {
    flex: 1,
    // flexWrap: 'wrap'
    width
  },
  card: {
    alignItems: 'center',
    width: (width / 2) - 40,
  },
  modal: {
    alignItems: 'center'
  },
   modal4: {
    height: 200
  },
  modal5: {
    height: 300,
  },
  text: {
    color: "black",
    fontWeight: '300',
    fontSize: responsiveFontSize(2.3),
    paddingTop: 20
  },
  textBorder: {
    paddingTop: -20,
    borderBottomWidth:2
  }
};

class Header2 extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    from:  React.PropTypes.number,
    to:  React.PropTypes.number,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
       isOpen: false,
      isDisabled: false,
      error: false,
      from: "100",
      to: "2000",
    };
  }

 sort(){
   this.refs.modal4.open();
  }

  filter(){
   this.refs.modal5.open();
  }

  sortProduct(value){
    this.setState({
      loading: true,
      data: []
    })
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/category/?username=pcadmin&authkey=pcadmin123&category_id=${this.props.category_id}&sortby=${value}`
    this.getCategoryList(url)
  }

  filterProductPrice(value){
    this.setState({
      loading: true,
      data: []
    })
    console.log(this.props)
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/filterCategory/?username=pcadmin&authkey=pcadmin123&from=${this.state.from}&to=${this.state.to}&category_id=${this.props.category_id}`
    this.getCategoryList(url)
  }

  componentDidMount(){
    let url = this.props.category_url + "?username=pcadmin&authkey=pcadmin123";
    this.getCategoryList(url);
  }

  async getCategoryList(url) {
    return await fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson.data.productlist,
        loading: false,
      });
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        loading: false,     
        error: true,
      });
    });
  }

  spliter(bigarray, size) {
    let array = []
    for (let i = 0; i < bigarray.length; i += size) {
      let smallarray = bigarray.slice(i, i + size);
      array.push(smallarray)
    }
    return array;
  }

  renderListItem(){
    let row = [];
    let arry  = this.state.data || []
    let rowArray = this.spliter(arry, 2);

    for (let i = 0; i < rowArray.length; i++) {
      row.push(
        <Row style={{ width: width, alignItems: "center"}} key={i + 200}>
          {this.renderColItem(rowArray[i])}
        </Row>
      );
    }
    return row;

  }
  renderColItem(items) {
    // style={{ alignItems: "center", borderWidth: 0.5, borderColor: "#C0C0C0" }}
    let col = [];
    let arry = items || [];
    for (let i = 0; i < arry.length; i++) {
      let c = arry[i];
      let mod =  i % 2;
      col.push(
        <Col style={{ alignItems: "center", borderWidth: 0.5, borderLeftWidth: 0, borderColor: "#C0C0C0" }} key={i + 100}
             onPress={() => { Actions["header4"](c);}} >
          <View>
            <Image square style={{ height: height/4, width: width/2, resizeMode: 'center' }} source={{uri: c.product_image}} />
            <View style={{left: 20, bottom: 10, flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize:10, fontWeight: '500'}}>{(c.product_name).substring(0, 10)}</Text>
                <Text style={{fontSize:8}}>{(c.product_name).substring(0, 10)}</Text>
              </View>
              <View style={{ marginLeft: 3, flexDirection: 'row'}}>
                <Text style={{textDecorationLine: 'line-through', fontSize:8, marginRight: 3, color: 'gray'}}>{c.product_price.specialprice === 'null' ? '' : c.product_price.specialprice }</Text>
                <Text style={{fontSize:10, fontWeight: '700', textAlign: 'right'}}>{c.product_price.normalprice}</Text>
              </View>
            </View>
          </View>
        </Col>
      );
    }
    return col;
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    let loading = this.state.loading;
    let error = this.state.error;
    return (
      <Container>

        <Header style={{ flexDirection: 'row', backgroundColor: '#fff' }} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon style={{color: "#000"}}  name="menu"/>
              </Button>
            </Left>
            <Body>
            <Title style={{color: "#000", fontSize: responsiveFontSize(2)}}>{this.props.title}</Title>
          </Body>
            <Right style={{right: -10}}>
              <Button full style={{backgroundColor: "#f5f5f5", marginRight: 5}} ransparent>
                <Thumbnail  onPress={() =>{this.sort()}} square style={{width: responsiveWidth(5),  marginLeft: 10, marginRight: 10, height: responsiveHeight(3)}} source={require('./image/flight.jpg')} />
              </Button>
              <Button full style={{backgroundColor: "#f5f5f5"}}  ransparent>
                <Icon style={{color: "#000", textAlign: 'center', fontSize: 19, width: responsiveWidth(7)}} name="search" />
              </Button>
            </Right>
        </Header>
        <Header style={{height: height/15, backgroundColor: "#fff"}}>
          <Left style={{bottom: 5, flexDirection: 'row'}}>
            <Button transparent onPress={()=> this.sort()}>
              <Thumbnail  onPress={() =>{this.sort()}} square style={{width: 15,  marginLeft: 10, marginRight: 5, height: 15}} source={require('./image/sorting.jpg')} />
              <Text style={{fontSize: responsiveFontSize(1.4), color: '#000'}}>SORT</Text>
            </Button>

          </Left>
          <Right style={{ top: 10, flexDirection: 'row'}}>
            <Button transparent onPress={()=> {this.filter()}}>
              <Thumbnail  onPress={() =>{this.filter()}} square style={{width: 15, marginRight: 5, height: 15}} source={require('./image/filter.jpg')} />
              <Text style={{fontSize: responsiveFontSize(1.4), color: '#000'}}>FILTER</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          {loading ? <Spinner /> : null}
          {error && <View>
            <Text style={{margin: 100}}>No Products available</Text>
            </View>
          }
          {this.renderListItem()}
        </Content>

         <Modal style={[customStyle.modal, customStyle.modal4]} position={"bottom"} ref={"modal4"}>
           <Content contentContainerStyle={{ alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgray', width: responsiveWidth(100)}}><Text style={{textAlign: 'center', margin: 10}}>SORT BY</Text></View>
            <Text onPress={() =>{this.sortProduct("1")}} style={customStyle.text}>Name</Text>
            <Text onPress={() =>{this.sortProduct("2")}} style={customStyle.text}>Price: High - Low</Text>
            <Text onPress={() =>{this.sortProduct("3")}}  style={customStyle.text}>Price: Low - High</Text>
          </Content>
        </Modal>

        <Modal style={[customStyle.modal, customStyle.modal5]} position={"bottom"} ref={"modal5"}>
           <Content contentContainerStyle={{ alignItems: 'center'}}>
            <View style={{borderBottomWidth: 1, borderBottomColor: 'lightgray', width: responsiveWidth(100)}}><Text style={{textAlign: 'center', margin: 10}}>FILTER BY PRICE</Text></View>
            <Text>FROM</Text>
            <Input  onChangeText={(text)=>this.setState({from: text})} value={this.state.from} style={{borderWidth: 1, borderColor: "lightgray", fontSize: 15}} placeholder="From" />
             <Text>TO</Text>
            <Input onChangeText={(text)=>this.setState({to: text})} value={this.state.to}  style={{borderWidth: 1, borderColor: "lightgray", fontSize: 15}} placeholder="To"/>
            {/*<Text onPress={() =>{this.sortProduct("1")}} style={customStyle.text}>Male Products</Text>
            <Text onPress={() =>{this.sortProduct("2")}} style={customStyle.text}>Female Products</Text>
            <Text onPress={() =>{this.sortProduct("3")}}  style={customStyle.text}>Brand Based</Text>
            <Text onPress={() =>{this.sortProduct("5")}}  style={customStyle.text}>Offer Products</Text>*/}
            <Button style={{marginTop: 20, alignSelf: 'center'}}  info onPress={() =>{this.filterProductPrice()}}> 
               <Text style={{fontSize: 12, color: '#000'}}>FILTER</Text>
            </Button>
          </Content>
        </Modal>
        
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default connect(mapStateToProps, bindAction)(Header2);