
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Container, 
  Header, Title, 
  Content, Button,
  Card, 
  Icon, Left, 
  View,
  Right, 
  Body, 
  Text, 
  Input,
  Item,
  Spinner,
  Thumbnail,
  Subtitle } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
const { width, height } = Dimensions.get('window');
import IconFont from 'react-native-vector-icons/FontAwesome';
import {Select, Option} from "react-native-chooser";
import HTMLView from 'react-native-htmlview';


const {
    popRoute,
} = actions;

class StaticPage extends Component {  // eslint-disable-line

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
      title: '',
      content: '',
      loading: true,
    }
  }

  componentDidMount(){
    let url = this.props.url
    if (url) {
      this.getStaticDetails(url)
    }
  }

  async getStaticDetails(url) {
    return await fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        title: responseJson.message,
        content: responseJson.data.cms[0].content,
        loading: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    console.log(this.state.content)
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: '#fff'}} androidStatusBarColor="#dc2015" iosBarStyle="light-content">
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>  
            <Title style={{color: "#000", fontSize: 12, fontWeight: '900'}} >{this.state.title}</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{backgroundColor: '#f5f5f5'}}>
          <Card style={{ padding: 20, alignSelf:'center'}}>
            {this.state.loading && <Spinner />}
              <HTMLView
                value={this.state.content}
              />
           </Card>
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

export default connect(mapStateToProps, bindAction)(StaticPage);
