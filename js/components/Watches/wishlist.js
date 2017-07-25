
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Thumbnail, Header, Title, Content, View, Button, Icon, Left, Right, Body, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { AsyncStorage, Alert, Dimensions } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';
const {
    popRoute,
} = actions;

class Header5 extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      loading: true,
      data: [],
    }
  }
  

  componentDidMount(){
    this.setLogin();
    this.setState({
      user_id: this.props.user
    })
  }


  setLogin() {
    AsyncStorage.getItem('user', (err, result) => {
      const data = JSON.parse(result);
      if(data && data.user) {
        this.setState({
          user_id: data.user.customer_info.customer_id,
          device: data.user.device_id
        }); 
        this.getWishlist();
      }
    });
  }

  getWishlist(){
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/wishlist/wishlist/?device_id=${this.state.device}&username=pcadmin&authkey=pcadmin123&customer_id=${this.state.user_id}`
     return  fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      this.setState({
        data: responseJson.data,
        loading: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  addToCart(item){
    let url = item
    return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if(response.code === 200){
        Alert.alert(response.message);
        this.componentDidMount()
      } else {
        Alert.alert(response.message);
      }
    })
  }

  renderView(wish) {
    items = []
    if (wish.length === 0){
      items.push(
        <View>
          <View key={'empty'} style={{ padding: 40, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
             <IconFont style={{fontSize: 15, alignSelf: 'center', color: 'gray'}}name="warning" />
            <Text style={{fontSize: 15, color: 'gray', textAlign: 'center'}}> Wishlist is Empty</Text>
          </View>
          <View style={{backgroundColor: '#f5f5f5', height: 20}}></View>
        </View>
      )
    } else {
    if (wish){
      for (let i = 0; i < wish.length; i++) {
        let item = wish[i]
        items.push(<View key={i}>
            <View style={{ flexDirection: 'row',backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
              <View style={{ alignItems: 'center', width: width/2.4, marginTop: 10, marginBottom: 10}}>
                <Thumbnail square style={{width: width/4, height: height/5}} source={{uri: item.image}} />
              </View>
              <View style={{marginTop: 10, marginBottom: 10, flexDirection: 'column', backgroundColor: "#fff"}} >
                <Text style={{ fontSize: 14, marginTop: 25, marginBottom: 10}}>{item.name.substring(0, 20)}</Text>
                <Text style={{ fontSize: 14, marginTop: 25, marginBottom: 10}}>${item.normalprice}</Text>
              </View>
            </View>
            <View style={{backgroundColor: "#fff",flexDirection:"row", paddingBottom: 5, paddingTop: 5, borderBottomWidth: 1, borderBottomColor: "lightgray"}}>
              <Button style={{ width: width/2.5, marginLeft: width/12}} transparent  onPress={ () => this.addToCart(item) }>
                <Text style={{ fontSize: 12, fontWeight: "700", color: '#000'}}>ADD TO CART</Text>
              </Button>
            </View>
            <View style={{backgroundColor: '#f5f5f5', height: 20}}></View>
        </View>)
        }
      } 
    }
    return items
  }
  
  render() {
    let wish = this.state.data && this.state.data.wishlist_details || []
    return (
      <Container>
        <Header  androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#000", fontSize: 12}}>WISHLISTS</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.renderView(wish)}
        </Content>
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

export default connect(mapStateToProps, bindAction)(Header5);
