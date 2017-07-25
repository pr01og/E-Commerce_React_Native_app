
import React, { Component } from 'react';
import { BackAndroid, StatusBar,AsyncStorage,  NavigationExperimental, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StyleProvider, variables, Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { Router, Scene } from 'react-native-router-flux';

import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { closeDrawer } from './actions/drawer';

import Landing from './components/landing/';
import Watches from './components/Watches/landing_index';
import MyOrder from './components/Watches/my_orders';
import Category from './components/Watches/category';
import Header3 from './components/Watches/myaccount';
import Header4 from './components/Watches/product_details';
import Header5 from './components/Watches/wishlist';
import Header6 from './components/Watches/notification';
import Header7 from './components/Watches/cart';
import Header8 from './components/Watches/login';
import Checkout from './components/Watches/checkout';
import Success from './components/Watches/success';
import StaticPage from './components/Watches/static_page';

import BagsLanding from './components/Bags/landing_index';
import BagsOrders from './components/Bags/my_orders';
import BagsCategory from './components/Bags/category';
import BagsMyaccount from './components/Bags/myaccount';
import BagsProductDetails from './components/Bags/product_details';
import BagsWishlist from './components/Bags/wishlist';
import BagsNotification from './components/Bags/notification';
import BagsCart from './components/Bags/cart';
import BagsLogin from './components/Bags/login';
import BagsCheckout from './components/Bags/checkout';
import BagsSuccess from './components/Bags/success';
import BagsStaticPage from './components/Bags/static_page';

import SideBar from './components/sidebar';
import statusBarColor from './themes/variables';

const {
  popRoute,
} = actions;

const RouterWithRedux = connect()(Router);

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    themeState: React.PropTypes.string,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }


  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <StatusBar
            hidden={(this.props.drawerState === 'opened' && Platform.OS === 'ios') ? true : false}
            backgroundColor={statusBarColor.statusBarColor}
          />
          <RouterWithRedux>
            <Scene key="root">
              {/*Watches*/}
              <Scene key="landing" component={Landing} hideNavBar initial={true} />
              <Scene key="watches" component={Watches} />
              <Scene key="category" component={Category} />
              <Scene key="header3" component={Header3} />
              <Scene key="header4" component={Header4} />
              <Scene key="header5" component={Header5} />
              <Scene key="header6" component={Header6} />
              <Scene key="header7" component={Header7} />
              <Scene key="header8" component={Header8} />
              <Scene key="checkout" component={Checkout} />
              <Scene key="success" component={Success} />
              <Scene key="my_orders" component={MyOrder} />
              <Scene key="static_page" component={StaticPage} />
              
              {/*Bags*/}
              <Scene key="bags" component={BagsLanding} />
              <Scene key="bags_category" component={BagsCategory} />
              <Scene key="bags_orders" component={BagsOrders} />
              <Scene key="bags_myaccount" component={BagsMyaccount} />
              <Scene key="bags_product_details" component={BagsProductDetails} />
              <Scene key="bags_wishlist" component={BagsWishlist} />
              <Scene key="bags_notification" component={BagsNotification} />
              <Scene key="bags_cart" component={BagsCart} />
              <Scene key="bags_success" component={BagsLogin} />
              <Scene key="bags_checkout" component={BagsCheckout} />
              <Scene key="bags_success" component={BagsSuccess} />
              <Scene key="bags_static_page" component={BagsStaticPage} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
