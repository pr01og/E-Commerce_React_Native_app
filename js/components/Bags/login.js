
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Title, Spinner, Content, Form, Item, Input,Label, View, Button, Icon, Left, Right, Body, Text, Subtitle } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { Card } from 'native-base';
import { Dimensions, Alert, AsyncStorage} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import SideBar from '../sidebar';
import DeviceInfo from 'react-native-device-info';
const { width, height } = Dimensions.get('window');

const {
    popRoute,
} = actions;

class Header8 extends Component {  // eslint-disable-line
  static propTypes = {
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      form: 'Login',
      load: false,
    };
  }

  loginFacebook() {
    Alert.alert("Kindly this function work in progress")
  }

  loginUser() {
    if (this.state.email && this.state.password) {
    let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/login/?customer_email=${this.state.email}&customer_logintype=0&customer_password=${this.state.password}&device_id=${DeviceInfo.getUniqueID()}&device_type=${DeviceInfo.getDeviceName()}&username=pcadmin&authkey=pcadmin123`
    return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if(response.code === 200){
        this.setUser(response.data);
         Alert.alert(response.message);
      } else {
        Alert.alert(response.message);
      }
      this.setState({load: false})
    })
    } else {
      Alert.alert("Please enter registered email and password")
      this.setState({load: false})
    }
  }

  register(){
    if (this.state.email && this.state.password && this.state.fname && this.state.lname) {
      let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/register/?customer_fname=${this.state.fname}&customer_lname=${this.state.lname}&customer_email=${this.state.email}&customer_password=${this.state.password}&customer_dob=03/11/1980&device_id=${DeviceInfo.getUniqueID()}&device_type=${DeviceInfo.getDeviceName()}&username=pcadmin&authkey=pcadmin123`
      return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if(response.code === 200){
          this.setUser(response.data);
          Alert.alert(response.message);
        } else {
          Alert.alert(response.message);
        }
        this.setState({load: false})
      }) 
    } else {
       Alert.alert("Please fill the form");
       this.setState({load: false})
    }
  }

  forgetPassword(){
     this.setState({load: true})
    if (this.state.forgetemail) {
      let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/forgotpassword/?username=pcadmin&authkey=pcadmin123&email=${this.state.forgetemail}`;
      return fetch(url)
        .then((response) => response.json())
        .then((response) => {
          if(response.code === 200){
            Actions['watches']();
            Alert.alert(response.message);
          } else {
            Alert.alert(response.message);
          }
          this.setState({load: false})
        })
      } else {
        Alert.alert("Please enter registerd email address")
        this.setState({load: false})
      }
  }

  setUser(data){
    let user = {
      user: data
    }
    AsyncStorage.setItem('user', JSON.stringify(user));
    Actions['watches'](user);
  }

  submitForm(text) {
    this.setState({load: true})
    setTimeout(
      function(){ this.loginUser() 
      }.bind(this), 5000);
  }

  render() {
    return (
      <Container>
        <Header  style={{ backgroundColor: "#63254d"}} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon style={{color: "#fff"}} name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#fff", fontSize: 12, fontWeight: '600'}}>{this.state.form}</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          {
            this.state.form === 'Login' &&
          <Card style={{  paddingLeft: 0, padding: 20}}>
              <Form>
                <Item style={{marginBottom: 10 }}>
                  <Input onChangeText={(text)=>this.setState({forgetemail: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Email Address" />
                </Item>
                <Item>
                  <Input onEndEditing={(text)=>this.submitForm(text)} onChangeText={(text)=>this.setState({password: text})} style={{borderWidth: 1, borderColor: "lightgray", fontSize: 15}} placeholder="Password" />
                </Item>
                { this.state.load && <Spinner /> }
               <Text style={{textAlign: 'center', fontSize: 15, marginTop: 10}}>OR</Text>
               
               <Button full  style={{alignSelf: 'center',marginTop: 20, width: width/2}} onPress={ () => this.loginFacebook() } >
                  <IconFont name="facebook"  style={{color: '#fff', fontSize: 15, marginRight: 10}}/>
                  <Text>Login with facebook</Text>
                </Button>
            </Form>
            <Button transparent style={{alignSelf: 'center'}} onPress={ () => this.setState({form: "ForgetPassword"})} >
              <Text style={{fontSize: 15}} >Forget Your Password?</Text>
            </Button>
             <Text onPress={ () => this.setState({form: "SignUp"})}  style={{alignSelf: 'center', fontSize: 15}}>Don't have account ? Please Sign Up</Text>
          </Card>
          }

          {
            this.state.form === 'SignUp' &&
            <Card style={{  paddingLeft: 0, padding: 20}}>
                <Form>
                  <Item style={{marginBottom: 10 }}>
                    <Input onChangeText={(text)=>this.setState({fname: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="First Name" />
                  </Item>
                <Item style={{marginBottom: 10 }}>
                    <Input onChangeText={(text)=>this.setState({lname: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Last Name" />
                  </Item>
                <Item style={{marginBottom: 10 }}>
                    <Input onChangeText={(text)=>this.setState({email: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Email Address" />
                  </Item>
                  <Item style={{marginBottom: 10 }}>
                    <Input onChangeText={(text)=>this.setState({password: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="password" />
                  </Item>
                   
                <Button full  style={{alignSelf: 'center',marginTop: 20, width: width/2}} onPress={ () => this.register() } >
                    <Text>SIGNUP</Text>
                  </Button>
              </Form>
                   { this.state.load && <Spinner /> }
              
              <Button transparent style={{alignSelf: 'center'}} onPress={ () => this.setState({form: "Login"}) } >
                <Text style={{fontSize: 15}} >Already user Login here</Text>
              </Button>
            </Card>
          }


          {
            this.state.form === 'ForgetPassword' &&
          <Card style={{ height: height/2.1, paddingLeft: 0, padding: 20}}>
              <Form>
                <Item style={{marginBottom: 10 }}>
                  <Input onChangeText={(text)=>this.setState({email: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Email Address" />
                </Item>
               
               <Button full  style={{alignSelf: 'center',marginTop: 20, width: width/2}} onPress={ () => this.forgetPassword() } >
                  <Text>RESET</Text>
                </Button>
                   { this.state.load && <Spinner /> }
            </Form>
            <Button transparent style={{alignSelf: 'center'}} onPress={ () => this.setState({form: "Login"}) } >
              <Text style={{fontSize: 15}} >Login</Text>
            </Button>
            
          </Card>
          }
          
          
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

export default connect(mapStateToProps, bindAction)(Header8);
