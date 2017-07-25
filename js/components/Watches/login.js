
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header,  Toast, Title, Spinner, Content, Form, Item, Input,Label, View, Button, Icon, Left, Right, Body, Text, Subtitle } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { Card } from 'native-base';
import { Dimensions, Alert, AsyncStorage} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import SideBar from '../sidebar';
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
      email: '', 
      password: '',
      fname: '', 
      lname: '', 
      device: '',
      deviceName: '',
    };
  }

  componentDidMount(){
    this.setState({
      email: '', 
      fname: '', 
      lname: '', 
      password: '', 
      device: Math.random().toString(36).substring(7),
      deviceName: "android",
      load: false
    })
  }

  loginFacebook() {
    Alert.alert("Kindly this function work in progress")
  }
  
  showAlert(message){
    Toast.show({
      supportedOrientations: ['portrait','landscape'],
      text: message,
      position: 'top',
      duration: 2000,
    })
  }

  loginUser() {
    if (this.state.email && this.state.password) {
      let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/login/?customer_email=${this.state.email}&customer_logintype=0&customer_password=${this.state.password}&username=pcadmin&authkey=pcadmin123&device_id=${this.state.device}&device_type=${this.state.deviceName}`;
      return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if(response.code === 200){
          this.setUser(response.data);
          this.showAlert(response.message);
        } else {
          this.showAlert(response.message);
        }
        this.setState({email: '', password: '', load: false})
      })
    } else {
      this.setState({load: false})
      this.showAlert("Please enter registered email and password")
    }
  }

  register(){
    this.setState({load: true})
    let device = this.state.device;
    let dtype = "android"
    if (this.state.email && this.state.password && this.state.fname && this.state.lname) {
      let url = `http://www.devsteam.mobi/pcapp/index.php/mobileapi/customer/register/?customer_fname=${this.state.fname}&customer_lname=${this.state.lname}&customer_email=${this.state.email}&customer_password=${this.state.password}&customer_dob=03/11/1980&device_id=${device}&device_type=${dtype}&username=pcadmin&authkey=pcadmin123`
      return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if(response.code === 200){
          this.setUser(response.data);
          this.showAlert(response.message);
        } else {
          this.showAlert(response.message);
        }
        this.setState({emai:'', load: false})
      }) 
    } else {
       this.showAlert("Please fill the form");
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
            this.showAlert(response.message);
          } else {
            this.showAlert(response.message);
          }
          this.setState({load: false, forgetemail: ''})
        })
      } else {
        this.showAlert("Please enter registerd email address")
        this.setState({load: false})
      }
  }

  setUser(data){
    if (data) {
      let user = {
        user: data || ""
      }
      AsyncStorage.setItem('user', JSON.stringify(user));
      Actions['watches'](user);
    }
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title style={{color: "#000", fontSize: 12, fontWeight: '600'}}>{this.state.form}</Title>
          </Body>
          <Right />

        </Header>

        <Content>
          {
            this.state.form === 'Login' &&
          <Card style={{  paddingLeft: 0, padding: 20}}>
              <Form>
                <Item style={{marginBottom: 10 }}>
                  <Input onChangeText={(text)=>this.setState({email: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Email Address" />
                </Item>
                <Item>
                  <Input onChangeText={(text)=>this.setState({password: text})} style={{borderWidth: 1, borderColor: "lightgray", fontSize: 15}} placeholder="Password"  secureTextEntry={true}/>
                </Item>
                { this.state.load && <Spinner /> }
                <Button full  style={{alignSelf: 'center',marginTop: 20, width: width/2}} onPress={ () => this.loginUser() } >
                  <Text style={{fontSize: 15}}>Login</Text>
                </Button>

               <Text style={{textAlign: 'center', fontSize: 15, marginTop: 20}}>OR</Text>
               
               <Button full  style={{alignSelf: 'center',marginTop: 20, width: width/1.3}} onPress={ () => this.loginFacebook() } >
                  <IconFont name="facebook"  style={{color: '#fff', fontSize: 15, marginRight: 10}}/>
                  <Text style={{fontSize: 15}}>Login with facebook</Text>
                </Button>
            </Form>
            <Button transparent style={{alignSelf: 'center'}} onPress={ () => this.setState({form: "ForgetPassword"})} >
              <Text style={{fontSize: 15}} >Forget Your Password?</Text>
            </Button>
            <View style={{flex:1, flexDirection: 'row', alignSelf: 'center'}}>
             <Text style={{alignSelf: 'center', fontSize: 15}}>Don't have account ? Please</Text>
             <Button transparent onPress={ () => this.setState({form: "SignUp"})}>
              <Text style={{ marginLeft: -10, fontSize: 14, alignSelf: 'center'}}>Sign Up</Text>
              </Button>
             </View>
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
                    <Input onChangeText={(text)=>this.setState({password: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Password"  secureTextEntry={true}/>
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
                  <Input onChangeText={(text)=>this.setState({forgetemail: text})} style={{borderWidth: 1, fontSize: 15, borderColor: "lightgray" }} placeholder="Email Address" />
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
